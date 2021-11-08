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

export function deleteView(params) {
  return request({
    url: "quickView/delete/"+params,
    method: "delete"
  });
}

export function addQuickView(data) {
  return request({
    url: "/quickView/add",
    method: "put",
    data
  });
}
