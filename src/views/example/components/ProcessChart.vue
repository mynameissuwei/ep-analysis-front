<template>
  <el-card class="box-card">
    <div class="title">
      <span> {{ title }}</span>
      <el-tooltip placement="top" style="margin-left: 8px">
        <div slot="content">多行信息<br />第二行信息</div>
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
    <el-row>
      <el-col :span="12">
        <div>
          <div class="container-content">
            <div>
              <zen-badge color="#52c41a" />
              <span class="text-container">增值</span>
            </div>
            <span class="container-content-number">50%</span>
          </div>
          <div class="container-content">
            <div>
              <zen-badge color="#52c41a" />
              <span class="text-container">增值</span>
            </div>
            <div class="container-content-number">50%</div>
          </div>
          <div class="container-content">
            <div>
              <zen-badge color="#52c41a" />
              <span class="text-container">增值</span>
            </div>
            <div class="container-content-number">50%</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div id="pie" style="width: 100%; height: 90px" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import ZenBadge from "@/components/ZenBadge";
import * as echarts from "echarts";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    ZenBadge,
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
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("pie"));
      this.chart.setOption(this.getOption());
    },
    getOption() {
      return {
        series: [
          {
            name: "Access From",
            type: "pie",
            label: {
              show: false,
              position: "center",
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  .title {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    line-height: 20px;
  }
  .container-content {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }
  .text-container {
    color: #999999;
    margin-left: 5px;
  }
}
</style>
