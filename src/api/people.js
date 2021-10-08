import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/api/ck/execSqlToPage",
    method: "get",
    params
  });
}

export function deleteList(params) {
  return request({
    url: `/api/ck/execSqlToPage`,
    method: "delete",
    params
  });
}
