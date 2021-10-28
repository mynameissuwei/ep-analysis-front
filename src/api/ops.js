import request from "@/utils/request2";

export function fetchExecSqlToList(params) {
  return request({
    url: "api/ck/execSqlToList",
    method: "get",
    params
  });
}

export function fetchList(params) {
  return request({
    url: "/api/ck/execSqlToPage",
    method: "get",
    params
  });
}

export function fetchExecSqlToMap(params) {
  return request({
    url: "/api/ck/execSqlToMap",
    method: "get",
    params
  });
}
