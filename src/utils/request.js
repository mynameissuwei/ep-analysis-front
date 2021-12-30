import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: "https://efficiency-analysis-backend.dev.ennew.com", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    "x-gw-accessKey": process.env.VUE_APP_ACCESS_KEY,
  },
});

// request interceptor
service.interceptors.request.use(
  async (config) => {
    if (config.method === "post" || config.method === "put") {
      const data = await store.dispatch("user/getPreventId");
      config.headers["token"] = data;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if the custom code is not 0, it is judged as an error.
    if (res.code != 0 || res.code != "0") {
      Message({
        message: res.message || "系统繁忙，请稍后再试",
        type: "error",
        duration: 5 * 1000,
      });
      store.dispatch("loading/cancelLoading");
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    // });
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
