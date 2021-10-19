import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/dict/efficiency",
    method: "get",
    params
  });
}

export function createList(params) {
  return request({
    url: "/dict/efficiency",
    method: "post",
    params
  });
}

export function deleteList(params) {
  return request({
    url: "/dict/efficiency",
    method: "delete",
    params
  });
}
