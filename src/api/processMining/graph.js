import cytoscape from 'cytoscape/dist/cytoscape.esm'
import popper from 'cytoscape-popper'
import dagre from 'cytoscape-dagre'
import tippy from 'tippy.js'
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
const NAME_PROP = 'name'
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
const vizBridgeId = '$vizBridge'
let eventRegistered = false
const options = {
  maxZoom: 1E50, // 图的缩放级别的最小界限。视口不能缩放比这个缩放级别小。
  minZoom: 1E-50, // 在图的缩放级别上的最大界限。视口不能缩放比这个缩放级别大。
  panningEnabled: true, // 无论是通过用户事件还是以编程方式来定义是否启用对图表的平移。
  userPanningEnabled: true, // 是否允许用户事件（例如拖动图形背景）来平移图表。程序更改对PAN不受此选项的影响。
  userZoomingEnabled: true, // 是否使用事件（如鼠标轮)
  wheelSensitivity: 0.1, // 滚轮灵敏度
  zoom: 0.75, // 图的初始缩放级别。
  zoomingEnabled: true// 定义是否可缩放
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
      'border-color': 'data(bordercolor)',
      'border-width': 'data(borderwidth)',
      // 'border-width': '5px',
      'border-style': 'solid',
      'color': 'data(textcolor)',
      'content': 'data(name)',
      'font-size': function (ele) { // 'data(textsize)',
        if (ele.data('shape') === 'roundrectangle') {
          const fontSize = calcFontSize(ele.data('oriname'))
          return fontSize + 'px'
        }
        return ele.data('textsize')
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
      'text-max-width': 'data(textwidth)',
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
      'text-background-shape': 'roundrectangle',
      'text-margin-y': -16,
      'text-wrap': 'wrap',
      'width': 'mapData(strength, 0, 100, 1, 6)'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '2px',
      'overlay-color': '#f96100',
      'overlay-padding': '18px',
      'overlay-opacity': 0.2
    }
  },
  {
    selector: ':selected',
    style: {
      'border-color': '#f96100',
      'line-color': '#f96100',
      'line-style': 'solid',
      'target-arrow-color': '#f96100'
    }
  }
]
const elements = {
  nodes: [],
  edges: []
}

// eslint-disable-next-line no-unused-vars
let currentLayout = 0
let isCtrlPressed = false
let isAltPressed = false
let isShiftPressed = false

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

const getViewportCenter = (extent) => {
  const {x1, x2, y1, y2} = extent
  const x = (x1 + x2) / 2
  const y = (y1 + y2) / 2
  return {x, y}
}

PDp.init = function () {
  const pd = this
  container = $('#' + pd._private.processModelContainerId)[0]
  const cy = this._private.cy = cytoscape(Object.assign(options, {
    container,
    style,
    elements
  }))
  // 标准化的右键单击或两指 tap
  cy.on('cxttap', 'edge', function (source) {
    if (!isTraceMode) {
      pd.removeEdge(source)
    }
  })
  // 标准化的右键单击或两指 tap
  cy.on('cxttap', 'node', function (source) {
    if (!isTraceMode) {
      pd.removeNode(source)
    }
  })
  // 当视口被平移时
  cy.on('pan', function (event) {
    if (!isTraceMode) {
      currentPanPosition = cy.pan()
    }
  })
  // 当视口被缩放时
  cy.on('zoom', function (event) {
    if (!isTraceMode) {
      currentZoomLevel = cy.zoom()
    }
  })

  // cy.on('beforeUndo', function() {
  // });

  cy.on('mouseover', 'node', function (event) {
    const node = event.target
    const name = node.data(NAME_PROP)
    const id = node.data('id')
    if (id) {
      if (activityToAttributeMap) { // more detail tooltip for trace mode
        const attributes = activityToAttributeMap[id]
        if (attributes && Object.keys(attributes).length) {
          currentNodeTooltip = pd.makeTippy(node, tablize(attributes, 'ap-pd-case-activity-attrs'))
        } else {
          currentNodeTooltip = pd.makeTippy(node, name)
        }
      } else {
        currentNodeTooltip = pd.makeTippy(node, name)
      }
      currentNodeTooltip.show()
    } else {
      currentNodeTooltip = undefined
    }
  })

  cy.on('mouseout', 'node', function (event) {
    if (currentNodeTooltip) currentNodeTooltip.hide()
  })

  if (!eventRegistered) {
    eventRegistered = true
    $(document).keydown(function (evt) {
      if (evt.shiftKey || evt.keyCode === 16 || evt.which === 16) {
        isShiftPressed = true
      }
      if (evt.ctrlKey || evt.metaKey || evt.keyCode === 17 || evt.which === 17) {
        isCtrlPressed = true
      }
      if (evt.altKey || evt.keyCode === 18 || evt.which === 18) {
        isAltPressed = true
      }
      if (isCtrlPressed && evt.which === 90) { // "Z" key
        evt.preventDefault()
        pd.zkSendEvent('$filterUndo', 'onClick', '')
      } else if (isCtrlPressed && evt.which === 89) { // "Y" key
        evt.preventDefault()
        pd.zkSendEvent('$filterRedo', 'onClick', '')
      }
    })
    $(document).keyup(function () {
      isAltPressed = isCtrlPressed = isShiftPressed = false
    })
  }
}

PDp.makeTippy = function (node, text) {
  return tippy(node.popperRef(), {
    content: function () {
      const div = document.createElement('div')
      div.innerHTML = text
      return div
    },
    trigger: 'manual',
    arrow: true,
    placement: 'bottom',
    hideOnClick: true,
    multiple: false,
    sticky: true
  })
}

PDp.reset = function () {
  const cy = this._private.cy
  if (cy) {
    cy.destroy()
  }
}

PDp.loadLog = function (json, layoutType, retain) {
  currentLayout = layoutType

  // Need to set the current zoom/pan level again as the reset/zoom/pan actions
  // will generate zoom and pan events and change them.
  const zoom = currentZoomLevel
  const pan = currentPanPosition

  isTraceMode = false
  this.reset()
  this.init()

  const cy = this._private.cy
  const source = $.parseJSON(json)
  sourceJSON = source
  cy.add(source)
  this.layout(layoutType)

  if (retain) {
    cy.zoom(zoom)
    cy.pan(pan)
    currentZoomLevel = zoom
    currentPanPosition = pan
  } else {
    this.fit(layoutType)
  }
}

PDp.loadTrace = function (json) {
  isTraceMode = true
  this.reset()
  this.init()

  const cy = this._private.cy
  json = json.replaceAll('\n', '\\n') // escape
  const source = $.parseJSON(json)
  cy.add(source)
  this.layout(LAYOUT_MANUAL_BEZIER)
  this.fit(1)
}

PDp.zoomIn = function () {
  const cy = this._private.cy
  cy.zoom({level: cy.zoom() + 0.1, position: getViewportCenter(cy.extent())})
}

PDp.zoomOut = function () {
  const cy = this._private.cy
  cy.zoom({level: cy.zoom() - 0.1, position: getViewportCenter(cy.extent())})
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

PDp.center = function (layoutType) {
  const cy = this._private.cy
  cy.center()
}

PDp.resize = function () {
  const cy = this._private.cy
  cy.resize()
  this.fit()
}

PDp.moveTop = function (layoutType) {
  const cy = this._private.cy
  const currentPos = cy.pan()
  const box = cy.elements().boundingBox({includeNodes: true, includeEdges: true})

  switch (layoutType) {
    case 0:
    case 1:
      if (cy.zoom() > 1.0) {
        cy.pan({x: currentPos.x, y: -box.y1 + 10})
      } else {
        cy.pan({x: currentPos.x, y: -box.y1 * cy.zoom() + 10})
      }
      break
    case 2:
      cy.center(cy.nodes().filter(function (ele) {
        return ele.data(NAME_PROP) === '|>'
      }))
      cy.pan({x: currentPos.x, y: 0})
      break
    case 3:
      cy.fit()
      break
    default:
    // code block
  }
}

PDp.layout = function (layoutType) {
  const cy = this._private.cy
  const layouter = layouters[layoutType]
  if (layouter) {
    layouter(cy, true)
  }
}

PDp.pos = function (source, b) {
  let c = 0
  let e = 0
  let d
  for (d in source.incomers().sources().outgoers().targets()) {
    c += d.position()[0]
    e += 1
  }
  return e === 0 ? 0 : c / e
}

export default PDp
