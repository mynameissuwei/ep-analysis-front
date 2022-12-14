import cytoscape from 'cytoscape/dist/cytoscape.esm'
import popper from 'cytoscape-popper'
import dagre from 'cytoscape-dagre'
import $ from 'jquery'

const edgeBendEditing = require('cytoscape-edge-bend-editing')
cytoscape.use(popper)
cytoscape.use(dagre)
edgeBendEditing(cytoscape, {
  bendShapeSizeFactor: 6,
  enabled: true,
  initBendPointsAutomatically: false,
  undoable: true
})

const LAYOUT_MANUAL_BEZIER = 0
const LAYOUT_DAGRE_LR = 1
const LAYOUT_DAGRE_TB = 2
const LAYOUT_BREADTH_FIRST = 3
const NAME_PROP = 'label'
const MAX_AUTOFIT_ZOOM = 0.75

const PDp = {}

const layouters = {
  [LAYOUT_MANUAL_BEZIER]: function (cy) {
    cy.style().selector('edge').style({
      'curve-style': function (ele) {
        return ele.data('edge-style')
      },
      'edge-distances': 'intersection',
      'control-point-distances': function (ele) {
        if (ele.data('edge-style') === 'unbundled-bezier') {
          return ele.data('point-distances')
        } else {
          return '0'
        }
      },
      'control-point-weights': function (ele) {
        if (ele.data('edge-style') === 'unbundled-bezier') {
          return ele.data('point-weights')
        } else {
          return '0.5'
        }
      }
    }).update()
    cy.elements().layout({
      name: 'preset'
    }).run()
  },
  [LAYOUT_DAGRE_LR]: function (cy) {
    cy.elements().layout({
      avoidOverlap: !0,
      edgeSep: 50,
      name: 'dagre',
      nodeSep: 110,
      randomize: false,
      rankDir: 'LR',
      ranker: 'network-simplex'
    }).run()
  },
  [LAYOUT_DAGRE_TB]: function (cy, randomize) {
    cy.style().selector('edge').style({
      'text-background-opacity': 1,
      'text-margin-y': 0
    }).update()

    cy.elements().layout({
      avoidOverlap: !0,
      edgeSep: 50,
      name: 'dagre',
      nodeSep: 110,
      randomize,
      rankDir: 'TB',
      ranker: 'tight-tree'
    }).run()
  },
  [LAYOUT_BREADTH_FIRST]: function (cy) {
    cy.style().selector('edge').style({
      'text-background-opacity': 1,
      'text-margin-y': 0
    }).update()
    cy.elements().layout({
      avoidOverlap: true,
      directed: !0,
      name: 'breadthfirst',
      spacingFactor: 1
    }).run()
  }
}

let container
let sourceJSON
const options = {
  maxZoom: 1E50, // ?????????????????????????????????????????????????????????????????????????????????
  minZoom: 1E-50, // ???????????????????????????????????????????????????????????????????????????????????????
  panningEnabled: true, // ??????????????????????????????????????????????????????????????????????????????????????????
  userPanningEnabled: true, // ???????????????????????????????????????????????????????????????????????????????????????PAN???????????????????????????
  userZoomingEnabled: true, // ?????????????????????????????????)
  wheelSensitivity: 0.1, // ???????????????
  zoom: 0.75, // ???????????????????????????
  zoomingEnabled: true, // ?????????????????????
}

const calcFontSize = (text) => {
  const len = text.length
  if (len > 40) {
    return 14
  } else if (len > 20) {
    return 15
  } else {
    return 16
  }
}

const style = [
  {
    selector: 'node',
    style: {
      'background-color': 'data(color)',
      'border-color': 'data(borderColor)',
      'border-width': 'data(borderWidth)',
      'border-style': 'solid',
      'color': 'data(textColor)',
      'content': 'data(label)',
      'font-size': function (ele) {
        if (ele.data('shape') === 'round-rectangle') {
          const fontSize = calcFontSize(ele.data('label'))
          return fontSize + 'px'
        }
        return ele.data('textSize')
      },
      'height': function (ele) { // 'data(height)',
        const oriHeight = ele.data('height')
        if (oriHeight === '70px') {
          return '80px'
        }
        return oriHeight
      },
      'padding': '5px',
      'shape': 'data(shape)',
      'text-border-width': 0,
      'text-max-width': 'data(textWidth)',
      'text-valign': 'center',
      'text-wrap': 'wrap',
      'width': 'data(width)'
    }
  },
  {
    selector: 'edge',
    style: {
      'color': 'data(color)',
      'control-point-step-size': 60,
      'curve-style': 'bezier',
      'edge-text-rotation': 0,
      'font-size': 16,
      'label': 'data(label)',
      'line-color': 'data(color)',
      'line-style': 'data(style)',
      'loop-direction': -41,
      'loop-sweep': 181,
      'opacity': 1,
      'source-arrow-color': 'data(color)',
      'target-arrow-color': 'data(color)',
      'target-arrow-shape': 'triangle',
      'text-background-color': '#ffffff',
      'text-background-opacity': 0,
      'text-background-padding': 5,
      'text-background-shape': 'round-rectangle',
      'text-margin-y': -16,
      'text-wrap': 'wrap',
      'width': 'mapData(strength, 0, 100, 1, 6)'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '2px',
      'overlay-color': '#0D54FC',
      'overlay-padding': '0px',
      'overlay-opacity': 0.2
    }
  },
  {
    selector: ':selected',
    style: {
      'border-color': '#0D54FC',
      'line-color': '#0D54FC',
      'line-style': 'solid',
      'target-arrow-color': '#0D54FC'
    }
  }
]
const elements = {
  nodes: [],
  edges: []
}

// eslint-disable-next-line no-unused-vars
let currentLayout = 0

let currentNodeTooltip
let currentZoomLevel = 1
let currentPanPosition
let isTraceMode = false // source trace or source full log

const activityToAttributeMap = null

const tablize = function (attributeArray, klass) {
  var html = `<table class="${klass}">`

  for (const {name, value} of attributeArray) {
    html += `<tr><td>${name}</td><td>${value}</td></tr>`
  }
  html += '</table>'
  return html
}

PDp.init = function () {
  const pd = this
  container = $('#' + pd._private.processModelContainerId)[0]
  const cy = this._private.cy = cytoscape(Object.assign(options, {
    container,
    style,
    elements
  }))

  // ????????????????????????????????? tap
  cy.on('cxttap', 'edge', function (source) {
    if (!isTraceMode) {
      pd.removeEdge(source)
    }
  })
  // ????????????????????????????????? tap
  cy.on('cxttap', 'node', function (source) {
    if (!isTraceMode) {
      pd.removeNode(source)
    }
  })
  // ?????????????????????
  cy.on('pan', function (event) {
    if (!isTraceMode) {
      currentPanPosition = cy.pan()
    }
  })
  // ?????????????????????
  cy.on('zoom', function (event) {
    if (!isTraceMode) {
      currentZoomLevel = cy.zoom()
    }
  })

  cy.on('mouseout', 'node', function (event) {
    if (currentNodeTooltip) currentNodeTooltip.hide()
  })

}


PDp.reset = function () {
  const cy = this._private.cy
  if (cy) {
    cy.destroy()
  }
}

PDp.loadLog = function (json, layoutType) {
  currentLayout = layoutType
  isTraceMode = false
  this.reset()
  this.init()

  const cy = this._private.cy
  const source = $.parseJSON(json)
  sourceJSON = source
  cy.add(source)
  this.layout(layoutType)
  this.fit(layoutType)

}

PDp.layout = function (layoutType) {
  const cy = this._private.cy
  const layouter = layouters[layoutType]
  if (layouter) {
    layouter(cy, true)
  }
}

PDp.fit = function (layoutType) {
  const cy = this._private.cy
  cy.fit()
  cy.center()
  if (cy.zoom() > MAX_AUTOFIT_ZOOM) {
    cy.zoom(MAX_AUTOFIT_ZOOM)
    cy.center()
  }
}
let selectedNodeIds = []

PDp.selectNodes = function (ids) {
  const cy = this._private.cy
  selectedNodeIds.forEach(function (id) {
    cy.getElementById(id).unselect()
  })
  selectedNodeIds = ids;
  ids.forEach(function (id) {
    cy.getElementById(id).select()
  })
}

PDp.unSelectNodes = function () {
  const cy = this._private.cy
  selectedNodeIds.forEach(function (id) {
    cy.getElementById(id).unselect()
  })
}

PDp.lock = function () {
  const cy = this._private.cy
  cy.elements('node').lock();
}
PDp.unlock = function () {
  const cy = this._private.cy
  cy.elements('node').unlock();

}

export default PDp
