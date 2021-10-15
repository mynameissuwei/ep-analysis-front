import request from "@/utils/request2";

export function fetchList(params) {
  return request({
    url: "/users/tenant",
    method: "get",
    params
  });
}

export function fetchCenterList(params) {
  return request({
    url: "/users",
    method: "get",
    params
  });
}

export function createList(params) {
  return request({
    url: "/tenant/user/bind",
    method: "post",
    params
  });
}

export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data,
    baseURL: "/dev-api" // 直接通过覆盖的方式
  });
}

export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
    baseURL: "/dev-api" // 直接通过覆盖的方式
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
    baseURL: "/dev-api" // 直接通过覆盖的方式
  });
}
