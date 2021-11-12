import Layout from "@/layout";

const demandRouter = {
  path: "/demand",
  component: Layout,
  redirect: "/demand/water/alarm",
  name: "Demand",
  meta: {
    title: "业务定制",
    icon: "dashboard",
    id: "EFFICIENCY_ANALYSIS_CUSTOMIZE"
  },
  children: [
    {
      path: "water",
      component: () => import("@/views/demand/water/index"), // Parent router-view
      name: "Water",
      meta: {
        title: "平潭水务",
        id: "EFFICIENCY_ANALYSIS_PTSW"
      },
      redirect: "/demand/water/alarm",
      children: [
        {
          path: "alarm",
          component: () => import("@/views/demand/water/alarm"),
          name: "Alarm",
          meta: {
            title: "告警工单",
            id: "EFFICIENCY_ANALYSIS_PTSW"
          }
        },
        {
          path: "maintenance",
          component: () => import("@/views/demand/water/maintenance"),
          name: "Maintenance",
          meta: {
            title: "养护工单",
            id: "EFFICIENCY_ANALYSIS_PTSW"
          }
        },
        {
          path: "breakdown",
          component: () => import("@/views/demand/water/breakdown"),
          name: "Breakdown",
          meta: {
            title: "故障维修工单",
            id: "EFFICIENCY_ANALYSIS_PTSW"
          }
        },
        {
          path: "inspection",
          component: () => import("@/views/demand/water/inspection"),
          name: "Inspection",
          meta: {
            title: "巡检工单",
            id: "EFFICIENCY_ANALYSIS_PTSW"
          }
        }
      ]
    },
    {
      path: "ops",
      component: () => import("@/views/demand/ops/index"), // Parent router-view
      name: "ops",
      meta: {
        title: "泛能网",
        id: "EFFICIENCY_ANALYSIS_PTSW"
      },
      // redirect: "/demand/water/alarm",
      children: [
        {
          path: "devops",
          component: () => import("@/views/demand/ops/devops"),
          name: "devops",
          meta: {
            title: "统一运维",
            id: "EFFICIENCY_ANALYSIS_PTSW"
          }
        }
      ]
    }
  ]
};

export default demandRouter;
