<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "../mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "440px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    },
    xAxisData: {
      type: Array,
      required: true
    },
    legendData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions(chartData) {
      const series = chartData.map((e,index) => {
        return {
          name: this.legendData[index],
          smooth: true,
          type: "line",
          data: e,
          animationDuration: 2800,
          animationEasing: "cubicInOut"
        }
      })
      this.chart.setOption({
        title: {
          text: "分时图",
          textStyle: {
            color: "black",
            fontSize: "18px",
            fontWeight: 500
          }
        },
        xAxis: {
          data: this.xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 20,
          right: 10,
          bottom: 20,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.legendData
        },
        series: series
      });
    }
  }
};
</script>
