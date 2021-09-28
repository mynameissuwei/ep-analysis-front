<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
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
      default: "274px"
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
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            radius: "100%",
            center: ["50%", "80%"],
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, "#FF6E76"],
                  [0.5, "#FDDD60"],
                  [0.75, "#58D9F9"],
                  [1, "#7CFFB2"]
                ]
              }
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 20,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "auto"
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: "auto",
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "auto",
                width: 5
              }
            },
            radius: "100%",
            axisLabel: {
              color: "#464646",
              fontSize: 20,
              distance: -60,
              formatter: function(value) {
                if (value === 0.875) {
                  return "优";
                } else if (value === 0.625) {
                  return "良";
                } else if (value === 0.375) {
                  return "中";
                } else if (value === 0.125) {
                  return "差";
                }
                return "";
              }
            },
            title: {
              offsetCenter: [0, "-20%"],
              fontSize: 20
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, "0%"],
              valueAnimation: true,
              formatter: function(value) {
                return Math.round(value * 100) + "分";
              },
              color: "auto"
            },
            data: [
              {
                value: 0.7,
                name: "效能评分"
              }
            ]
          }
        ]
      });
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
