<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../mixins/resize";

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    data: {
      type: Array,
    },
    getCasCadePie: {
      type: Function,
    },
    type: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(this.getOption());
          } else {
            this.chart.setOption(this.getOption());
          }
        } else {
          this.initChart();
        }
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.getOption());
      this.chart.on("click", (param) => {
        this.getCasCadePie(
          this.type === "category"
            ? { appKey: param.data.appKey }
            : { createOrgCode: param.data.orgCode }
        );
      });
    },
    getOption() {
      return {
        title: {
          text: this.title,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            center: ["50%", "50%"],
            // roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: this.data,
          },
        ],
      };
    },
  },
};
</script>
