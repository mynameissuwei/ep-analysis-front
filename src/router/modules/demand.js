/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const demandRouter = {
  path: "/demand",
  component: Layout,
  redirect: "/demand/water/alarm",
  name: "Demand",
  meta: { title: "业务定制", icon: "dashboard" },
  children: [
    {
      path: "water",
      component: () => import("@/views/demand/water/index"), // Parent router-view
      name: "Water",
      meta: {
        title: "平潭水务"
      },
      redirect: "/demand/water/alarm",
      children: [
        {
          path: "alarm",
          component: () => import("@/views/demand/water/alarm"),
          name: "Alarm",
          meta: {
            title: "告警工单"
          }
        },
        {
          path: "maintenance",
          component: () => import("@/views/demand/water/maintenance"),
          name: "Maintenance",
          meta: {
            title: "养护工单"
            // if do not set roles, means: this page does not require permission
          }
        },
        {
          path: "breakdown",
          component: () => import("@/views/demand/water/breakdown"),
          name: "Breakdown",
          meta: {
            title: "故障维修工单"
            // if do not set roles, means: this page does not require permission
          }
        },
        {
          path: "inspection",
          component: () => import("@/views/demand/water/inspection"),
          name: "Inspection",
          meta: {
            title: "巡检工单"
            // if do not set roles, means: this page does not require permission
          }
        }
      ]
    }
  ]
};

export default demandRouter;
