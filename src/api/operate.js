import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "operationBoard/list",
    method: "get",
    params
  });
}
