<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" style="height:314px">
          <bar-chart
            id="leftChart"
            text="模板节点快部门分布总览"
            :xAxis="xAxis"
            :yAxis="yAxis"
          />
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
              :count="execSqlToMap.finishRatio"
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
      execSqlToList: [],
      xAxis: [],
      yAxis: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getExecSqlToList();
      this.getExecSqlToMap();
    },
    async getExecSqlToList() {
      const { data } = await fetchExecSqlToList({
        condition: {
          extParam: {
            target: "month"
          },
          sqlKey: "procIncrList"
        }
      });
      console.log(data, "data");
      let xAxis = data.map(item => item.dayTime);
      let yAxis = data.map(item => item.yAxis);
      this.execSqlToList = data;
      this.xAxis = xAxis;
      this.yAxis = yAxis;
    },
    async getExecSqlToMap() {
      const { data } = await fetchExecSqlToMap({
        condition: { sqlKey: "procOtherMap" }
      });
      console.log(data, "datadata");
      this.execSqlToMap = data;
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
</style>
