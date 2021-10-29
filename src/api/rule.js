import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/api/rule/templates",
    method: "get",
    params
  });
}

export function fetchSelectDepartment() {
  return request({
    url: "/api/rule/orgs",
    method: "get"
  });
}

export function fetchSelectTemplate() {
  return request({
    url: "/api/rule/templateTypes",
    method: "get"
  });
}

export function fetchTimeConfig(params) {
  return request({
    url: `/api/rule/config`,
    method: "get",
    params
  });
}

export function postTimeConfig(data) {
  return request({
    url: `/api/rule/config/save`,
    method: "post",
    data
  });
}

export function batchSave(data) {
  return request({
    url: `/api/rule/config/batchSave`,
    method: "post",
    data
  });
}
