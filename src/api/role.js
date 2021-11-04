import request from "@/utils/request";

export function fetchList(params) {
  return request({
    url: "/role",
    method: "get",
    params
  });
}

export function createList(data) {
  return request({
    url: "/role",
    method: "post",
    data
  });
}

export function updateList(data) {
  return request({
    url: "/role",
    method: "put",
    data
  });
}

export function createUserole(data) {
  return request({
    url: "/userole",
    method: "post",
    data
  });
}

export function createAuthRole(params) {
  return request({
    url: "/role/auth",
    method: "post",
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

export function fetchRoleAuth(id) {
  return request({
    url: `/role/auth/${id}`,
    method: "get"
  });
}

export function fetchRoleUser(params) {
  return request({
    url: `/role/tenant/users`,
    method: "get",
    params
  });
}
