import request from "@/utils/request";

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

export function fetchItemDetail(params) {
  return request({
    url: "api/ck/execSqlToMap",
    method: "get",
    params
  });
}

export function fetchFlow(params) {
  return request({
    url: "api/procAnalysis/graph",
    method: "get",
    params
  });
}
