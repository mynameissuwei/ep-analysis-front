import Cookies from "js-cookie";

const TokenKey = "tenantId";
const RouteKey = "hasRoute";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRouteToken() {
  return Cookies.get(RouteKey);
}

export function setRouteToken(token) {
  return Cookies.set(RouteKey, token);
}

export function removeRouteToken() {
  return Cookies.remove(RouteKey);
}
