import request from "@/utils/request";

// 获取流程定义
export function fetchProc(params) {
  return request({
    url: "/workflow/procDef/page",
    method: "get",
    params,
  });
}

// 流程类型接口
export function fetchSelectTemplate() {
  return request({
    url: "/api/rule/templateTypes",
    method: "get",
  });
}

// 流程指数因子接口
export function fetchAddProcIndexRule() {
  return request({
    url: "/api/rule/templateTypes",
    method: "get",
  });
}

// 流程指数因子接口
export function fetchProcFactor(params) {
  return request({
    url: "/analysis/procFactor",
    method: "get",
    params,
  });
}

// 获取流效数据
export function fetchProcIndexRule(data) {
  return request({
    url: "/rule/getProcIndexRule",
    method: "post",
    data,
    headers: { "content-type": "application/json;charset=utf-8;" },
  });
}

// 新增流效数据
export function addProcIndexRule(data) {
  return request({
    url: "/rule/addProcIndexRule",
    method: "post",
    data,
  });
}

// 获取节点审批效率分析
export function fetchNodeAnalysis(params) {
  return request({
    url: "/nodeAnalysis/nodeApproveEfficiency",
    method: "get",
    params,
  });
}

// 获取耗时偏好
export function fetchTimeConsuming(params) {
  return request({
    url: "/nodeAnalysis/approveConsumingPreference",
    method: "get",
    params,
  });
}

// 获取节点图表
export function fetchNodeChart(params) {
  return request({
    url: "/nodeAnalysis/analysisProcMilestone",
    method: "get",
    params,
  });
}

// 获取明细查询
export function fetchNodeChartDetail(params) {
  return request({
    url: "/nodeAnalysis/analysisProcMilestoneDetail",
    method: "get",
    params,
  });
}
