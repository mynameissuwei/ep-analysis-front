<template>
  <div :id="id" style=" width:100%; height: 100%;"/>
</template>
<script>

import resize from "../mixins/resize.js";

export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Object
    },
    id: {
      type: String,
      default: "chart"
    },
    title: {
      type: Number,
    }
  },
  data() {
    return {
      myChart: {},
      option: {},
    };
  },
  mounted() {
    let dom = document.getElementById(this.id)
    this.myChart = this.$echarts.init(dom);
    this.initEcharts(this.chartData);
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        if (this.myChart && newVal) {
          this.initEcharts(this.chartData);
        }
      },
      deep: true
    }
  },
  methods: {
    initEcharts(chartData) {
      const {xAxis, yAxis} = chartData;
      this.option = {
        title: {
          text: this.title,
          left: '20px',
          top: '5px'
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: "40px",
          bottom: "20px"
        },
        series: [
          {
            data: yAxis,
            type: 'bar'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let tar = params[0];
            return '' + tar.value;
          }
        }
      };
      this.myChart.setOption(this.option);
    }
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
};
</script>
