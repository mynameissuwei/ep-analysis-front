import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/api/ck/execSqlToPage",
    method: "get",
    params
  });
}

export function fetchEffTopList(params) {
  return request({
    url: "/api/ck/execSqlToList",
    method: "get",
    params
  });
}

export function fetchWorkerTopList(params) {
  return request({
    url: "/api/ck/execSqlToList",
    method: "get",
    params
  });
}

export function fetchOverTimeList(params) {
  return request({
    url: "/api/ck/execSqlToList",
    method: "get",
    params
  });
}

export function deleteList(params) {
  return request({
    url: "/api/ck/execSqlToPage",
    method: "delete",
    params
  });
}
