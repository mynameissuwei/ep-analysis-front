import { constantRoutes } from "@/router";

function hasRoute(routeArray, route) {
  if (route.meta && route.meta.id) {
    if (routeArray.includes(route.meta.id)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function filterRoute(routes, routeArray) {
  const res = [];
  routes.forEach(route => {
    const temp = { ...route };

    if (hasRoute(routeArray, temp)) {
      if (temp.children) {
        temp.children = filterRoute(temp.children, routeArray);
      }

      res.push(temp);
    }
  });
  return res;
}

function flatId(routes) {
  let res = [];
  routes.forEach(route => {
    const temp = { ...route };
    res.push(temp.component);
    if (temp.children) {
      res.push(flatId(temp.children));
    }
  });
  return res;
}

const flattenDeep = array =>
  array.reduce((a, b) => a.concat(Array.isArray(b) ? flattenDeep(b) : b), []);

const state = {
  permission_routes: []
};

const mutations = {
  SET_ROUTES: (state, permission_routes) => {
    state.permission_routes = permission_routes;
  }
};

const actions = {
  generateRoutes({ commit }, routerInfo) {
    // resetRouter();
    return new Promise(resolve => {
      let accessedRoutes;
      console.log(routerInfo,'routerInforouterInfo')
      let flatArray = flattenDeep(
        flatId(routerInfo.length ?  (routerInfo.length === 2 ? routerInfo[0].children.concat(routerInfo[1].children) : routerInfo[0].children) : [])
      );

      let result = filterRoute(
        constantRoutes,
        flatArray.length ? flatArray.concat(["404", "404redirect"]) : flatArray.concat(["404", "404redirect","EFFICIENCY_ANALYSIS_OPERATION_DICT_MANAGE","EFFICIENCY_ANALYSIS_TENANT_DICT"])
      );
        
      console.log(flatArray, "flatArrayflatArray");
      accessedRoutes = result || [];
      commit("SET_ROUTES", accessedRoutes);
      // router.addRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
