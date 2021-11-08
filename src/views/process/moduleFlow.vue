<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <card-container>
          <div id="container"></div>
        </card-container>
      </el-col>
      <el-col :span="12" :offset="0">
        <card-container>
          <div>
            <module-card :itemDetail="itemDetail" />
          </div>
        </card-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import { fetchFlow, fetchItemDetail } from "@/api/module";
import CardContainer from "@/components/CardContainer";
import ModuleCard from "./components/ModuleCard";

export default {
  props: ["id"],
  data() {
    return {
      itemDetail: {},
      flowChartData: null
    };
  },
  components: {
    CardContainer,
    ModuleCard
  },
  created() {
    this.getFlow();
    this.getItemDetail();
  },
  mounted() {
    this.init();
  },
  watch: {
    flowChartData: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
      deep: true
    }
  },
  methods: {
    getFlow() {
      fetchFlow({
        source: this.$route.query.source,
        procDefKey: this.$route.query.procDefKey
      }).then(response => {
        const { data } = response;
        this.flowChartData = data;
      });
    },
    getItemDetail() {
      fetchItemDetail({
        condition: {
          sqlKey: "procAnalyItemMap",
          extParam: { procDefKey: this.id }
        }
      }).then(response => {
        const { data } = response;
        this.itemDetail = data;
      });
    },
    init() {
      const data = {
        nodes: this.flowChartData.nodes.map(item => ({
          id: item.id,
          name: item.name
        })),
        edges: this.flowChartData.edges.map(item => ({
          source: item.source,
          target: item.target
        }))
      };

      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: "#5B8FF9",
                fill: "#C6E5FF",
                lineWidth: 3
              },
              name: "rect-shape"
            });
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold"
                },
                name: "text-shape"
              });
            }
            return rect;
          }
        },
        "single-node"
      );

      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        layout: {
          type: "dagre",
          nodesepFunc: d => {
            if (d.id === "3") {
              return 500;
            }
            return 50;
          },
          ranksep: 70,
          controlPoints: true
        },
        defaultNode: {
          type: "sql"
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5"
          }
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef"
          }
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            {
              type: "tooltip",
              formatText(model) {
                const cfg = model.conf;
                const text = [];
                cfg.forEach(row => {
                  text.push(row.label + ":" + row.value + "<br>");
                });
                return text.join("\n");
              },
              offset: 30
            }
          ]
        },
        fitView: true
      });
      graph.data(data);
      graph.render();
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
