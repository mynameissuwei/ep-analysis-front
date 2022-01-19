const nodeAnalysisInitData = [
  {
    taskName: "抢单人",
    averagePassTime: 0,
    averagePassTimeChain: 0,
    averageActualCostTime: 0,
    averageActualCostTimeChain: 0,
    averageWaitTime: 0,
    averageWaitTimeChain: 0,
  },
  {
    taskName: "接单人",
    averagePassTime: 0,
    averagePassTimeChain: 0,
    averageActualCostTime: 0,
    averageActualCostTimeChain: 0,
    averageWaitTime: 0,
    averageWaitTimeChain: 0,
  },
];

const nodeTimeInitData = [
  {
    tenantId: "1369559970221985794",
    taskDefKey: "qiangdan",
    taskName: "抢单人",
    normalNum: 0,
    totalNum: 0,
    normalPercent: 0,
    secondNum: 0,
    secondPercent: 0,
    dayNum: 0,
    dayPercent: 0,
  },
  {
    tenantId: "1369559970221985794",
    taskDefKey: "jiedan",
    taskName: "接单人",
    normalNum: 0,
    totalNum: 0,
    normalPercent: 0,
    secondNum: 0,
    secondPercent: 0,
    dayNum: 0,
    dayPercent: 0,
  },
];

const chartInitData = [
  {
    name: "里程碑1",
    taskNumReal: 0,
    taskNumLine: 0,
    timeConsumingReal: 0,
    timeConsumingLine: 0,
  },
  {
    name: "里程碑2",
    taskNumReal: 0,
    taskNumLine: 0,
    timeConsumingReal: 0,
    timeConsumingLine: 0,
  },
  {
    name: "里程碑3",
    taskNumReal: 0,
    taskNumLine: 0,
    timeConsumingReal: 0,
    timeConsumingLine: 0,
  },
];

export { nodeAnalysisInitData, nodeTimeInitData, chartInitData };
