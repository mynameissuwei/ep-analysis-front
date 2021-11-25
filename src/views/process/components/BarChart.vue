<template>
  <div :id="id" style="width: 100%; height: 316px" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../mixins/resize.js";

export default {
  mixins: [resize],
  props: {
    text: {
      type: String,
    },
    showHour: {
      type: Boolean,
      default: false,
    },
    execSqlToList: {
      type: Object,
    },
    id: {
      type: String,
      default: "chart",
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
    execSqlToList: {
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
    },
    getOption() {
      const { xAxis, yAxis } = this.execSqlToList;
      return {
        title: {
          text: this.text,
          top: -5,
        },
        xAxis: {
          type: "category",
          data: xAxis,
          name: this.showHour ? "节点数量" : "",
        },
        yAxis: {
          type: "value",
          name: this.showHour ? "模版数" : "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        series: [
          {
            data: yAxis,
            type: "bar",
            barWidth: "40%",
            color: "#558CFF",
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.echartCard {
  width: 100%;
  height: 274px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
</style>
