import router, { constantRoutes, resetRouter } from "./router";
import getPageTitle from "@/utils/get-page-title";
import store from "./store";

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  try {
    // function hasRoute(routeArray, route) {
    //   if (route.meta && route.meta.title) {
    //     if (routeArray.includes(route.meta.title)) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return true;
    //   }
    // }

    // function filterRoute(routes, routeArray) {
    //   const res = [];
    //   routes.forEach(route => {
    //     const temp = { ...route };

    //     if (hasRoute(routeArray, temp)) {
    //       if (temp.children) {
    //         temp.children = filterRoute(temp.children, routeArray);
    //       }
    //       res.push(temp);
    //     }
    //   });
    //   return res;
    // }

    // let routeArray = ["Tab", "Excel", "Export Excel"];

    // let routes = [
    //   {
    //     path: "/excel",
    //     redirect: "/excel/export-excel",
    //     name: "Excel",
    //     meta: {
    //       title: "Excel",
    //       icon: "excel"
    //     },
    //     children: [
    //       {
    //         path: "export-excel",
    //         name: "ExportExcel",
    //         meta: { title: "Export Excel" }
    //       },
    //       {
    //         path: "export-selected-excel",
    //         name: "SelectExcel",
    //         meta: { title: "Export Selected" }
    //       },
    //       {
    //         path: "export-merge-header",
    //         name: "MergeHeader",
    //         meta: { title: "Merge Header" }
    //       },
    //       {
    //         path: "upload-excel",
    //         name: "UploadExcel",
    //         meta: { title: "Upload Excel" }
    //       }
    //     ]
    //   },
    //   {
    //     path: "/tab",
    //     children: [
    //       {
    //         path: "index",
    //         name: "Tab",
    //         meta: { title: "Tab", icon: "tab" }
    //       }
    //     ]
    //   }
    // ];

    // let result = filterRoute(routes, routeArray);

    const hasTenant = store.getters.tenantId;
    const hasRoute =
      store.getters.routeInfo && store.getters.routeInfo.length > 0;
    

    if (hasTenant && hasRoute) {
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
        console.log(accessedRoutes,flatResult,'flatResult');
        router.addRoutes(accessedRoutes);
        let currentId = to.meta.id
        next()
        // if(flatResult.includes(currentId)) {
        //   debugger;
        //   next()
        // } else {
        //   debugger;
        //   next('/404')
        // }
        // next({ ...to, replace: true });
      } catch (error) {
        
        next();
      }
    }
  } catch (error) {
    next();
  }
});

router.afterEach(() => {});
