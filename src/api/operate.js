import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/operationBoard/list",
    method: "get",
    params
  });
}

export function getBoard(params) {
  return request({
    url: "/operationBoard/board",
    method: "get",
    params
  });
}
