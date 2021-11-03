import router from "./router";
import getPageTitle from "@/utils/get-page-title";
import store from "./store";

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  // const hasPreventId =
  //   store.getters.preventId && store.getters.preventId.length > 0;

  // if (hasPreventId) {
  //   next();
  // } else {
  //   try {
  //     const { roles } = await store.dispatch("user/getPreventId");
  //     next();
  //   } catch {
  //     next();
  //   }
  // }
  // if (hasRoles) {
  //   next();
  // } else {
  //   try {
  //     const { roles } = await store.dispatch("user/getInfo");
  //     next();
  //   } catch {
  //     next();
  //   }
  // }
});

router.afterEach(() => {});
