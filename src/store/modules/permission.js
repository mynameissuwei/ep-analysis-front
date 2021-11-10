import { constantRoutes } from '@/router'
import router, { resetRouter } from "@/router";


const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, routerInfo) {
    resetRouter()
    console.log(router.options.routes,routerInfo,'routerInfo')
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = constantRoutes || []
      router.addRoutes(constantRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
