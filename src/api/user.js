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

export function fetchTenantList(params) {
  return request({
    url: "/useroles/tenant",
    method: "get",
    params
  });
}

export function deployRole(data) {
  return request({
    url: "/userole",
    method: "post",
    data
  });
}

export function createList(data) {
  return request({
    url: "/tenant/user/bind",
    method: "post",
    data
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

export function getInfo() {
  return request({
    url: "/user/resource/page",
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
    baseURL: "/dev-api" // 直接通过覆盖的方式
  });
}

export function getTokenId() {
  return request({
    url: "/token/generate",
    method: "get"
  });
}
