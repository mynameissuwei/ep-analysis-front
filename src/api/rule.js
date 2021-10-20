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

export function fetchTimeConfig(id) {
  return request({
    url: `/api/rule/config/${id}`,
    method: "get"
  });
}
