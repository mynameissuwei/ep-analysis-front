import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
// import "@/permission"; // permission control

!(async function() {
  try {
    let authSdk = await EnnAuthSdk({
      appid: process.env.VUE_APP_APP_ID, // 项目APPID
      baseUrl: process.env.VUE_APP_LOGIN_API, //项目后端接口地址
      accessKey: process.env.VUE_APP_ACCESS_KEY, // 网关key
      authUrl: process.env.VUE_APP_AUTH_API,
      env: process.env.NODE_ENV, // 当前运行环境 develop or production
      warningCb: message => {
        Message({
          type: "error",
          message: message,
          showClose: true
        });
      }, // 错误提示回调函数
      whiteList: [/(.*)\.baidu\.com/i, "https://xxx.com"] // 第三方js白名单
    });
    Vue.prototype.authSdk = authSdk; // 将实例挂载至vue原型链中，以便其它组件调用 登出功能 （this.authSdk.logout()） 切换租户功能(this.authSdk.selectTenant())
    initVue();
  } catch (e) {
    // 处理获取token异常情况
    // 如果出现authentiation接口返回418和业务接口返沪417，然后一直循环跳鉴权页，则不要在这里 initVue()
  }
})();

// 实例化VUE
function initVue() {
  /**
   * If you don't want to use mock-server
   * you want to use MockJs for mock api
   * you can execute: mockXHR()
   *
   * Currently MockJs will be used in the production environment,
   * please remove it before going online ! ! !
   */
  if (process.env.NODE_ENV === "production") {
    const { mockXHR } = require("../mock");
    mockXHR();
  }

  // set ElementUI lang to EN
  Vue.use(ElementUI, { locale });
  // 如果想要中文版 element-ui，按如下方式声明
  // Vue.use(ElementUI)

  Vue.config.productionTip = false;

  new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
  });
}
