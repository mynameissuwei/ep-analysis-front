<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../mixins/resize.js";

export default {
  mixins: [resize],
  props: {
    text: {
      type: String
    },
    execSqlToList: {
      type: Object
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      chart: null
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
      deep: true
    }
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
          text: this.text
        },
        xAxis: {
          type: "category",
          data: xAxis
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yAxis,
            type: "bar",
            barWidth: "40%",
            color: "#558CFF"
          }
        ]
      };
    }
  }
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
