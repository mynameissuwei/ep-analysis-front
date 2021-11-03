import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/dict/efficiency",
    method: "get",
    params
  });
}

export function createList(data) {
  return request({
    url: "/dict/efficiency",
    method: "post",
    data
  });
}

export function deleteList(data) {
  return request({
    url: "/dict/efficiency",
    method: "delete",
    data
  });
}
