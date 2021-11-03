import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

// create an axios instance
const service2 = axios.create({
  baseURL: process.env.VUE_APP_BASE2_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

// request interceptor
service2.interceptors.request.use(
  async config => {
    if (config.method === "post" || config.method === "put") {
      const data = await store.dispatch("user/getPreventId");
      config.headers["token"] = data;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service2.interceptors.response.use(
  response => {
    const res = response.data;
    // if the custom code is not 0, it is judged as an error.
    if (res.code != 0) {
      Message({
        message: res.message || "系统繁忙，请稍后再试",
        type: "error",
        duration: 5 * 1000
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service2;
