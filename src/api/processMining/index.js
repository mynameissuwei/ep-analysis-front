import graph from './graph'

const PD = function (processModelContainerId) {
  this._private = {
    'cy': undefined,
    'processModelContainerId': processModelContainerId
  }
}
const pdFn = PD.prototype;
[graph].forEach(function (props) {
  Object.assign(pdFn, props)
})
export default PD
