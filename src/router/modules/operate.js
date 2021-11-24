import Layout from "@/layout";

export const operateSidebar = [
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
];
