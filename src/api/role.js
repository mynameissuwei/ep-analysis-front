import request from "@/utils/request2";

export function fetchList(params) {
  debugger;
  return request({
    url: "/role",
    method: "get",
    params
  });
}

export function deleteList(data) {
  return request({
    url: "/role",
    method: "delete",
    data
  });
}

export function fetchEditData(id) {
  return request({
    url: `/auth/${id}`,
    method: "get"
  });
}
