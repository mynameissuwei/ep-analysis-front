import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/api/ck/execSqlToPage",
    method: "get",
    params
  });
}

export function fetchListMore(params) {
  return request({
    url: "/api/ck/execSqlToList",
    method: "get",
    params
  });
}

export function fetchFlow(params) {
  return request({
    url: "/bpmnmodel/selectFnEntBpmnModelBpmnByProcessDeploymentId",
    method: "get",
    params
  });
}
