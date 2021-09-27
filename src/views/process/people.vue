<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card">
        <bar-chart id="leftChart" text="模板节点快部门分布总览" />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <bar-chart id="rightChart" text="模板节点长度分布总览" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./components/BarChart";

export default {
  components: { BarChart }
};
</script>

<style lang="scss" scoped></style>
