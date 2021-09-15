/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const demandRouter = {
  path: "/demand",
  component: Layout,
  redirect: "/demand/water/alarm",
  name: "Demand",
  meta: { title: "客制化需求", icon: "dashboard" },
  children: [
    {
      path: "water",
      component: () => import("@/views/demand/menu1/index"), // Parent router-view
      name: "Water",
      meta: {
        title: "平潭水务",
        icon: "dashboard"
      },
      redirect: "/demand/water/alarm",
      children: [
        {
          path: "alarm",
          component: () => import("@/views/demand/menu1/alarm"),
          name: "Alarm",
          meta: {
            title: "告警工单",
            icon: "dashboard"
          }
        },
        {
          path: "maintenance",
          component: () => import("@/views/demand/menu1/maintenance"),
          name: "Maintenance",
          meta: {
            title: "养护工单",
            icon: "dashboard"
            // if do not set roles, means: this page does not require permission
          }
        },
        {
          path: "breakdown",
          component: () => import("@/views/demand/menu1/breakdown"),
          name: "Breakdown",
          meta: {
            title: "故障维修工单",
            icon: "dashboard"
            // if do not set roles, means: this page does not require permission
          }
        },
        {
          path: "inspection",
          component: () => import("@/views/demand/menu1/inspection"),
          name: "Inspection",
          meta: {
            title: "巡检工单",
            icon: "dashboard"
            // if do not set roles, means: this page does not require permission
          }
        }
      ]
    }
  ]
};

export default demandRouter;
