import router, { constantRoutes, resetRouter } from "./router";
import getPageTitle from "@/utils/get-page-title";
import store from "./store";

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  try {
    const hasTenant = store.getters.tenantId;
    const hasRoute =  store.getters.routeInfo
    console.log(hasTenant,hasRoute,'hasRoute')

    if (hasRoute) {
      next();
    } else {
      try {
        resetRouter();
        await store.dispatch("user/getInfo");
        let routerInfo = await store.dispatch("user/getRouterInfo");
        const { accessedRoutes,flatResult }  = await store.dispatch(
          "permission/generateRoutes",
          routerInfo
        );
        console.log(accessedRoutes,'accessedRoutes');
        router.addRoutes(accessedRoutes);
        next({ ...to, replace: true });
      } catch (error) {
        next();
      }
    }
  } catch (error) {
    next();
  }
});

router.afterEach(() => {});
