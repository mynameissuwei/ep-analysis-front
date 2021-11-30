import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import demandRouter from "./modules/demand.js";

export const constantRoutes = [
  {
    path: "/404",
    meta: {
      id: "404",
    },
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
      id: "EFFICIENCY_ANALYSIS_TENANT_DICT",
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "index",
        meta: {
          title: "效能词典",
          icon: "tree",
          id: "EFFICIENCY_ANALYSIS_TENANT_DICT",
        },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
      id: "EFFICIENCY_ANALYSIS_OPERATION_DICT_MANAGE",
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/platdict/index"),
        name: "index",
        meta: {
          title: "词典管理",
          icon: "tree",
          id: "EFFICIENCY_ANALYSIS_OPERATION_DICT_MANAGE",
        },
      },
    ],
  },
  {
    path: "/process",
    component: Layout,
    redirect: "/process/category",
    meta: {
      title: "效能分析",
      icon: "dict",
      id: "EFFICIENCY_ANALYSIS",
    },
    children: [
      // {
      //   path: "efficiency",
      //   component: () => import("@/views/process/efficiency"),
      //   name: "Efficiency",
      //   meta: { title: "效能大盘", id: "EFFICIENCY_ANALYSIS_TENANT_DASHBOARD" },
      // },
      {
        path: "category",
        component: () => import("@/views/process/category"),
        name: "Category",
        meta: { title: "类别分析", id: "EFFICIENCY_ANALYSIS_TENANT_CATEGORY" },
      },
      {
        path: "module",
        component: () => import("@/views/process/module"),
        name: "Module",
        meta: { title: "模板分析", id: "EFFICIENCY_ANALYSIS_TENANT_TEMPLATE" },
      },
      {
        path: "module/more",
        name: "moduleMore",
        component: () => import("@/views/process/moduleMore"),
        hidden: true,
        meta: {
          title: "查看模板",
          noCache: true,
          activeMenu: "/process/module",
          id: "EFFICIENCY_ANALYSIS_TENANT_TEMPLATE",
        },
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
          activeMenu: "/process/module",
          id: "EFFICIENCY_ANALYSIS_TENANT_TEMPLATE",
        },
      },
      {
        path: "flow",
        component: () => import("@/views/process/flow"),
        name: "Flow",
        meta: { title: "流程分析", id: "EFFICIENCY_ANALYSIS_TENANT_PROCESS" },
      },
      {
        path: "people",
        component: () => import("@/views/process/people"),
        name: "People",
        meta: {
          title: "人效分析",
          id: "EFFICIENCY_ANALYSIS_TENANT_HUMAN_EFFECT",
        },
      },
      {
        path: "design",
        component: () => import("@/views/process/design"),
        name: "design",
        meta: { title: "设计分析", id: "EFFICIENCY_ANALYSIS_TENANT_DESIGN" },
      },
    ],
  },
  demandRouter,
  {
    path: "/rule",
    component: Layout,
    meta: {
      id: "EFFICIENCY_ANALYSIS_TENANT_RULE_CONFIG",
    },
    redirect: "/rule/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/rule"),
        name: "rule",
        meta: {
          title: "规则配置",
          icon: "el-icon-s-help",
          id: "EFFICIENCY_ANALYSIS_TENANT_RULE_CONFIG",
        },
      },
      {
        path: "index/create",
        name: "createRule",
        component: () => import("@/views/rule/create"),
        hidden: true,
        meta: {
          title: "添加规则",
          noCache: true,
          activeMenu: "/rule/index",
          id: "EFFICIENCY_ANALYSIS_TENANT_RULE_CONFIG",
        },
      },
    ],
  },
  {
    path: "/workbench",
    component: Layout,
    meta: {
      id: "EFFICIENCY_ANALYSIS_TENANT_WORKBENCH",
    },
    redirect: "/workbench/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/workbench"),
        name: "workbench",
        meta: {
          title: "工作台",
          icon: "form",
          id: "EFFICIENCY_ANALYSIS_TENANT_WORKBENCH",
        },
      },
      {
        path: "templateTable",
        component: () => import("@/views/workbench/templateTable"),
        hidden: true,
        name: "templateTable",
        meta: {
          title: "工作台",
          icon: "el-icon-s-help",
          activeMenu: "/workbench/index",
          id: "EFFICIENCY_ANALYSIS_TENANT_WORKBENCH",
        },
      },
      {
        path: "processTable",
        component: () => import("@/views/workbench/processTable"),
        hidden: true,
        name: "processTable",
        meta: {
          title: "工作台",
          icon: "el-icon-s-help",
          activeMenu: "/workbench/index",
          id: "EFFICIENCY_ANALYSIS_TENANT_WORKBENCH",
        },
      },
    ],
  },
  {
    path: "/opbench",
    component: Layout,
    redirect: "/opbench/index",
    meta: {
      id: "EFFICIENCY_ANALYSIS_OPERATION_WORKBENCH",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/opbench"),
        name: "opbench",
        meta: {
          title: "运营工作台",
          icon: "form",
          id: "EFFICIENCY_ANALYSIS_OPERATION_WORKBENCH",
        },
      },
    ],
  },
  {
    path: "/operate",
    component: Layout,
    redirect: "/operate/index",
    meta: {
      id: "EFFICIENCY_ANALYSIS_OPERATION_DASHBOARD",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/process/OperateBoard"),
        name: "operate",
        meta: {
          title: "运营大盘",
          icon: "eye",
          id: "EFFICIENCY_ANALYSIS_OPERATION_DASHBOARD",
        },
      },
    ],
  },
  {
    path: "/acount",
    component: Layout,
    redirect: "/acount/user",
    meta: {
      title: "账户管理",
      icon: "acount",
      id: "EFFICIENCY_ANALTSIS_TENANT_ACCOUNT_MANAGE",
    },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/acount/user/index"),
        meta: {
          title: "用户管理",
          id: "EFFICIENCY_ANALYSIS_TENANT_USER_MANAGE",
        },
      },
      {
        path: "user/create",
        name: "createUser",
        component: () => import("@/views/acount/user/create"),
        hidden: true,
        meta: {
          title: "添加用户",
          noCache: true,
          activeMenu: "/acount/user",
          id: "EFFICIENCY_ANALYSIS_TENANT_USER_MANAGE",
        },
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/acount/role/index"),
        meta: {
          title: "角色管理",
          id: "EFFICIENCY_ANALYSIS_TENANT_ROLE_MANAGE",
        },
      },
      {
        path: "role/create/:id?",
        name: "createRole",
        component: () => import("@/views/acount/role/create"),
        hidden: true,
        props: true,
        meta: {
          title: "角色配置",
          noCache: true,
          activeMenu: "/acount/role",
          id: "EFFICIENCY_ANALYSIS_TENANT_ROLE_MANAGE",
        },
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/acount/permission/index"),
        meta: {
          title: "权限管理",
          id: "EFFICIENCY_ANALYSIS_TENANT_AUTHORITY_MANAGE",
        },
      },
      {
        path: "permission/create/:id?",
        name: "createPermission",
        component: () => import("@/views/acount/permission/create"),
        hidden: true,
        props: true,
        meta: {
          title: "权限配置",
          noCache: true,
          activeMenu: "/acount/permission",
          id: "EFFICIENCY_ANALYSIS_TENANT_AUTHORITY_MANAGE",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    meta: {
      id: "404redirect",
    },
    hidden: true,
  },
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [],
  });

const createNewRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [],
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createNewRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
