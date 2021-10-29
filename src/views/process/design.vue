<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card class="box-card">
        <bar-chart
          id="designChart"
          text="模板节点长度分布总览"
          :execSqlToList="execSqlToList"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import { fetchBar } from "@/api/design";
export default {
  data() {
    return {
      execSqlToList: {}
    };
  },
  created() {
    this.init();
  },
  components: { BarChart },
  methods: {
    init() {
      this.getExecSqlToList();
    },
    async getExecSqlToList() {
      const { data } = await fetchBar({
        length: 20,
        step: 2
      });
      let xAxis = data.map(item => item.range);
      let yAxis = data.map(item => item.count);
      this.execSqlToList = {
        xAxis,
        yAxis
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
