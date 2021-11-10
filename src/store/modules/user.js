import { login, logout, getInfo, getTokenId,getRouterInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    preventId: "",
    userId: "",
    username: "",
    nickName: "",
    hasTenant: true,
    tenantId: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PREVENT: (state, preventId) => {
    state.preventId = preventId;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName;
  },
  SET_HASTENANT: (state, hasTenant) => {
    state.hasTenant = hasTenant;
  },
  SET_TENANTID: (state, tenantId) => {
    state.tenantId = tenantId;
  }
};

const actions = {

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { userId, username, nickName, hasTenant, tenantId } = data;
          commit("SET_USERID", userId);
          commit("SET_USERNAME", username);
          commit("SET_NICKNAME", nickName);
          commit("SET_HASTENANT", hasTenant);
          commit("SET_TENANTID", tenantId);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


  // 防止重复登陆
  getPreventId({ commit, state }) {
    return new Promise((resolve, reject) => {
      getTokenId()
        .then(response => {
          const { data } = response;

          commit("SET_PREVENT", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取路由信息
  getRouterInfo() {
    return new Promise((resolve,reject) => {
      getRouterInfo()
        .then(response => {
          const { data } = response;
          console.log(response,'router')
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    })
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
