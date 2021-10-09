import request from "@/utils/request2";
import qs from "qs";

export function fetchList(params) {
  return request({
    url: "/auth",
    method: "get",
    params
  });
}

export function deleteList(body) {
  return request({
    url: "/auth",
    method: "delete",
    data: qs.stringify(body, { indices: false })
  });
}

export function addList(params) {
  return request({
    url: "/auth",
    method: "post",
    params
  });
}

export function fetchSourceList() {
  return request({
    url: "/auth/resource/tree",
    method: "get"
  });
}
