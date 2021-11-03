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
      chart: {},
      option: {},
    };
  },
  mounted() {
    let dom = document.getElementById(this.id)
    this.chart = this.$echarts.init(dom);
    this.initEcharts(this.chartData);
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        if (this.chart && newVal) {
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
          top: '10px',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 20
          }
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: "50px",
          bottom: "20px",
        },
        series: [
          {
            data: yAxis,
            type: 'bar',
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
      this.chart.setOption(this.option);
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
};
</script>
