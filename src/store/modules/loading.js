const getDefaultState = () => {
    return {
        buttonLoading:false
    };
  };

const state = getDefaultState();

const mutations = {
    SET_LOADING: (state, loading) => {
      console.log(loading,'loadingloading')
      state.buttonLoading = loading;
    },
  };

const actions = {
    setLoading({ commit }) {
        commit('SET_LOADING',true)
    },

    cancelLoading({ commit }) {
        commit('SET_LOADING',false)
    }
};
  
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
