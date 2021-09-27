import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import demandRouter from "./modules/demand.js";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "效能词典", icon: "dict" }
      }
    ]
  },
  {
    path: "/process",
    component: Layout,
    redirect: "/process/efficiency",
    meta: { title: "效能分析", icon: "dict" },
    children: [
      {
        path: "efficiency",
        component: () => import("@/views/process/efficiency"),
        name: "Efficiency",
        meta: { title: "流程效能" }
      },
      {
        path: "category",
        component: () => import("@/views/process/category"),
        name: "Category",
        meta: { title: "按类别分析" }
      },
      {
        path: "people",
        component: () => import("@/views/process/people"),
        name: "People",
        meta: { title: "按人效分析" }
      },
      {
        path: "flow",
        component: () => import("@/views/process/flow"),
        name: "Flow",
        meta: { title: "按流程分析" }
      },
      {
        path: "design",
        component: () => import("@/views/process/design"),
        name: "design",
        meta: { title: "按设计分析" }
      }
    ]
  },
  // {
  //   path: "/info",
  //   component: Layout,
  //   redirect: "/info/task",
  //   meta: { title: "统计分析", icon: "dashboard" },
  //   children: [
  //     {
  //       path: "task",
  //       name: "Task",
  //       component: () => import("@/views/info/task"),
  //       meta: { title: "任务类别维度统计", icon: "dashboard" }
  //     },
  //     {
  //       path: "repair",
  //       name: "Repair",
  //       component: () => import("@/views/info/repair"),
  //       meta: { title: "工单类别维度统计", icon: "dashboard" }
  //     }
  //   ]
  // },
  // demandRouter,
  {
    path: "/acount",
    component: Layout,
    redirect: "/acount/user",
    meta: { title: "账户管理", icon: "acount" },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/acount/user/index"),
        meta: { title: "用户管理" }
      },
      {
        path: "user/create",
        name: "createUser",
        component: () => import("@/views/acount/user/create"),
        hidden: true,
        meta: { title: "添加用户", noCache: true }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/acount/role"),
        meta: { title: "角色管理" }
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/acount/permission/index"),
        meta: { title: "权限管理" }
      },
      {
        path: "permission/create",
        name: "createPermission",
        component: () => import("@/views/acount/permission/create"),
        hidden: true,
        meta: { title: "添加权限", noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
