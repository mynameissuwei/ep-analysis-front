import request from "@/utils/request";

export function fetchList(params) {
  return request({
    url: "/vue-admin-template/permission/list",
    method: "get",
    params
  });
}

export function deleteList(params) {
  return request({
    url: `/vue-admin-template/permission`,
    method: "delete",
    params
  });
}
