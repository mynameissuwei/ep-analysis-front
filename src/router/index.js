import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import demandRouter from "./modules/demand.js";

export const constantRoutes = [
  // {
  //   path: "/login",
  //   component: () => import("@/views/login/index"),
  //   hidden: true
  // },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "index",
        meta: { title: "效能词典", icon: "tree" }
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
        meta: { title: "效能大盘" }
      },
      {
        path: "category",
        component: () => import("@/views/process/category"),
        name: "Category",
        meta: { title: "类别分析" }
      },
      {
        path: "module",
        component: () => import("@/views/process/module"),
        name: "Module",
        meta: { title: "模板分析" }
      },
      {
        path: "module/more",
        name: "moduleMore",
        component: () => import("@/views/process/moduleMore"),
        hidden: true,
        meta: {
          title: "查看模板",
          noCache: true,
          activeMenu: "/process/module"
        }
      },
      {
        path: "module/flow:id?",
        name: "moduleFlow",
        component: () => import("@/views/process/moduleFlow"),
        hidden: true,
        props: true,
        meta: {
          title: "查看流程",
          noCache: true,
          activeMenu: "/process/module"
        }
      },
      {
        path: "flow",
        component: () => import("@/views/process/flow"),
        name: "Flow",
        meta: { title: "流程分析" }
      },
      {
        path: "people",
        component: () => import("@/views/process/people"),
        name: "People",
        meta: { title: "人效分析" }
      },
      {
        path: "design",
        component: () => import("@/views/process/design"),
        name: "design",
        meta: { title: "设计分析" }
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
  demandRouter,
  {
    path: "/rule",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/rule"),
        name: "rule",
        meta: { title: "规则配置", icon: "el-icon-s-help" }
      },
      {
        path: "index/create",
        name: "createRule",
        component: () => import("@/views/rule/create"),
        hidden: true,
        meta: {
          title: "添加规则",
          noCache: true,
          activeMenu: "/rule/index"
        }
      }
    ]
  },
  // {
  //   path: "/ops",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/ops"),
  //       name: "ops",
  //       meta: { title: "统一运维", icon: "link" }
  //     }
  //   ]
  // },
  {
    path: "/workbench",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/workbench"),
        name: "workbench",
        meta: { title: "工作台", icon: "form" }
      },
      {
        path: "templateTable",
        component: () => import("@/views/workbench/templateTable"),
        hidden: true,
        name: "templateTable",
        meta: {
          title: "工作台",
          icon: "el-icon-s-help",
          activeMenu: "/workbench/index"
        }
      },
      {
        path: "processTable",
        component: () => import("@/views/workbench/processTable"),
        hidden: true,
        name: "processTable",
        meta: {
          title: "工作台",
          icon: "el-icon-s-help",
          activeMenu: "/workbench/index"
        }
      }
    ]
  },
  {
    path: "/opbench",
    component: Layout,
    redirect: "/opbench",
    children: [
      {
        path: "index",
        component: () => import("@/views/opbench"),
        name: "opbench",
        meta: { title: "运营工作台", icon: "form" }
      },
    ]
  },
  // {
  //   path: "/operate",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/process/OperateBoard"),
  //       name: "operate",
  //       meta: { title: "运营大盘", icon: "eye" }
  //     }
  //   ]
  // },
  {
    path: "/platdict",
    component: Layout,
    redirect: "/platdict",
    children: [
      {
        path: "index",
        component: () => import("@/views/platdict/index"),
        name: "Dashboard",
        meta: { title: "词典管理", icon: "tree" }
      }
    ]
  },
  {
    path: "/operate",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/process/OperateBoard"),
        name: "operate",
        meta: { title: "运营大盘", icon: "eye" }
      }
    ]
  },
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
        meta: {
          title: "添加用户",
          noCache: true,
          activeMenu: "/acount/user"
        }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/acount/role/index"),
        meta: { title: "角色管理" }
      },
      {
        path: "role/create/:id?",
        name: "createRole",
        component: () => import("@/views/acount/role/create"),
        hidden: true,
        props: true,
        meta: {
          title: "添加角色",
          noCache: true,
          activeMenu: "/acount/role"
        }
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/acount/permission/index"),
        meta: { title: "权限管理" }
      },
      {
        path: "permission/create/:id?",
        name: "createPermission",
        component: () => import("@/views/acount/permission/create"),
        hidden: true,
        props: true,
        meta: {
          title: "权限编辑",
          noCache: true,
          activeMenu: "/acount/permission"
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];


const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const createNewRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: []
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createNewRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
