import request from "@/utils/request";

export function fetchList(params) {
  return request({
    url: "/auth",
    method: "get",
    params
  });
}

export function deleteList(data) {
  return request({
    url: "/auth",
    method: "delete",
    data
  });
}

export function createList(data) {
  return request({
    url: "/auth",
    method: "post",
    data
  });
}

export function fetchSourceList() {
  return request({
    url: "/auth/resource/tree",
    method: "get"
  });
}

export function fetchEditData(id) {
  return request({
    url: `/auth/${id}`,
    method: "get"
  });
}
