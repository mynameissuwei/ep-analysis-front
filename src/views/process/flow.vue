<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" style="height:314px">
          <div class="bar-container">
            <el-tabs v-model="paneValue" @tab-click="tabChange">
              <el-tab-pane
                v-for="item in panes"
                :key="item.key"
                :label="item.label"
                :name="item.key"
              >
              </el-tab-pane>
            </el-tabs>
            <bar-chart
              id="flowChart"
              text="模板流程增长趋势"
              :execSqlToList="execSqlToList"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20" class="right-card">
          <el-col :span="8" :offset="0">
            <yellow-svg
              start-color="#FFFFFF"
              end-color="#5599FF"
              :count="execSqlToMap.todayNum"
              text="今日添加"
            />
          </el-col>
          <el-col :span="8" :offset="0">
            <yellow-svg
              start-color="#FFB64B"
              end-color="#FF972A"
              :count="execSqlToMap.total"
              text="流程总数"
            />
          </el-col>
          <el-col :span="8" :offset="0">
            <yellow-svg
              start-color="#8FB4FF"
              end-color="#6D78FD"
              :count="`${execSqlToMap.finishRatio}%`"
              text="总体完成率"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <flow-table />
  </div>
</template>

<script>
import { fetchExecSqlToList, fetchExecSqlToMap } from "@/api/flow";
import BarChart from "./components/BarChart";
import YellowSvg from "./components/YellowSvg";
import FlowTable from "./components/FlowTable";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination, BarChart, YellowSvg, FlowTable },
  data() {
    return {
      execSqlToMap: {},
      execSqlToList: {},
      panes: [
        { label: "本天", key: "day" },
        { label: "本月", key: "month" },
        { label: "本年", key: "year" }
      ],
      paneValue: "day"
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getExecSqlToList(this.paneValue);
      this.getExecSqlToMap();
    },
    async getExecSqlToList(panValue) {
      const { data } = await fetchExecSqlToList({
        condition: {
          extParam: {
            target: panValue
          },
          sqlKey: "procIncrList"
        }
      });
      let xAxis = data.map(item => item.dayTime);
      let yAxis = data.map(item => item.num);

      this.execSqlToList = {
        xAxis,
        yAxis
      };
    },
    async getExecSqlToMap() {
      const { data } = await fetchExecSqlToMap({
        condition: { sqlKey: "procOtherMap" }
      });
      this.execSqlToMap = data;
    },
    tabChange(value) {
      this.getExecSqlToList(value.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.right-card {
  height: 314px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .el-col {
    display: flex;
    justify-content: center;
  }
}
.bar-container {
  position: relative;
  .el-tabs {
    width: 180px;
    position: absolute;
    right: 0px;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background-color: #fff !important;
  }
}
</style>
