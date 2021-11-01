import request from "@/utils/request2";

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
