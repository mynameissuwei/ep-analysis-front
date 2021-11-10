import router,{ resetRouter } from "./router";
import getPageTitle from "@/utils/get-page-title";
import store from "./store";

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  try {
    function hasRoute(routeArray, route) {
      
      if (route.meta && route.meta.title) {
        if (routeArray.includes(route.meta.title)) {
          
          return true;
        } else {
          
          return false
        }
        
      } else {
        
        return true;
      }
    }
    
    function filterRoute(routes, routeArray) {
      const res = [];
      routes.forEach((route) => {
        
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
    
    let routeArray = ["Tab",'Excel','Export Excel'];
    
    let routes = [
      {
        path: '/excel',
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
          title: 'Excel',
          icon: 'excel'
        },
        children: [
          {
            path: 'export-excel',
            name: 'ExportExcel',
            meta: { title: 'Export Excel' }
          },
          {
            path: 'export-selected-excel',
            name: 'SelectExcel',
            meta: { title: 'Export Selected' }
          },
          {
            path: 'export-merge-header',
            name: 'MergeHeader',
            meta: { title: 'Merge Header' }
          },
          {
            path: 'upload-excel',
            name: 'UploadExcel',
            meta: { title: 'Upload Excel' }
          }
        ]
      },
      {
        path: "/tab",
        children: [
          {
            path: "index",
            name: "Tab",
            meta: { title: "Tab", icon: "tab" }
          }
        ]
      }
    ];
    
    let result = filterRoute(routes, routeArray);
    
    console.log(result, "result");





    await store.dispatch("user/getInfo");
    const routerInfo = await store.dispatch("user/getRouterInfo")
    await store.dispatch('permission/generateRoutes',routerInfo)
    next()
  } catch(error) {
    
    next();
  }
});

router.afterEach(() => {});
