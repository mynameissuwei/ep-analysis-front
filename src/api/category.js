import request from "@/utils/request";

export function fetchList(params) {
  return request({
    url: "/api/ck/execSqlToPage",
    method: "get",
    params
  });
}

export function fetchExecSqlToPie(params) {
  return request({
    url: "api/ck/execSqlToList",
    method: "get",
    params
  });
}

export function fetchCasCadePie(params) {
  return request({
    url: "api/ck/execSqlToMap",
    method: "get",
    params
  });
}
