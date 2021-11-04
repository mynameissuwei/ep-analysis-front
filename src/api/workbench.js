import request from "@/utils/request";

export function fetchList(params) {
  return request({
    url: "/workbench/notice/list",
    method: "get",
    params
  });
}

export function fetchTemplate(params) {
  return request({
    url: "/quickView/queryList",
    method: "get",
    params
  });
}
