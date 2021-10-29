import Cookies from "js-cookie";
import request from "@/utils/request2";

const TokenKey = "vue_admin_template_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getTokenId() {
  return request({
    url: "/token/generate",
    method: "get"
  });
}
