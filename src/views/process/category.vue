<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-row :gutter="20">
          <el-col :span="12">
            <pie-chart id="leftChart" />
          </el-col>
          <el-col :span="12">
            <pie-chart id="rightChart" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <display-card cardTitle="258" cardText="模板总数" />
        <display-card cardTitle="258" cardText="模板总数" />
      </el-col>
      <el-col :span="3">
        <display-card cardTitle="258" cardText="模板总数" />
        <display-card cardTitle="258" cardText="模板总数" />
      </el-col>
      <el-col :span="3">
        <display-card cardTitle="258" cardText="模板总数" />
        <display-card cardTitle="258" cardText="模板总数" />
      </el-col>
      <el-col :span="3">
        <display-card cardTitle="258" cardText="模板总数" />
        <display-card cardTitle="258" cardText="模板总数" />
      </el-col>
      <el-col :span="3">
        <display-card cardTitle="258" cardText="模板总数" />
        <display-card cardTitle="258" cardText="模板总数" />
      </el-col>
    </el-row>
    <category-table />
  </div>
</template>

<script>
import DisplayCard from "@/components/DisplayCard";
import PieChart from "./components/PieChart";
import CategoryTable from "./category-table";

export default {
  name: "Category",
  components: {
    DisplayCard,
    PieChart,
    CategoryTable
  }
};
</script>

<style lang="scss" scoped></style>
