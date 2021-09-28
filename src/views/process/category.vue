<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <card-container>
          <el-row :gutter="20">
            <el-col :span="12">
              <pie-chart id="leftChart" />
            </el-col>
            <el-col :span="12">
              <pie-chart id="rightChart" />
            </el-col>
          </el-row>
        </card-container>
      </el-col>
      <el-col :span="12">
        <card-container>
          <el-row type="flex" justify="space-around">
            <el-col :span="4">
              <display-card
                cardTitle="258"
                cardText="模板总数"
                svgText="template"
              />
              <display-card
                cardTitle="258"
                cardText="耗时总长"
                svgText="overtime"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                cardTitle="258"
                cardText="流程总数"
                svgText="flow"
              />
              <display-card
                cardTitle="258"
                cardText="平均耗时"
                svgText="timeConsume"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                cardTitle="258"
                cardText="完成率"
                svgText="complete"
              />
              <display-card
                cardTitle="258"
                cardText="超时总长"
                svgText="overtime"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                cardTitle="258"
                cardText="审批总人数"
                svgText="people"
              />
              <display-card
                cardTitle="258"
                cardText="平均超时"
                svgText="overtime"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                cardTitle="258"
                cardText="人均耗时"
                svgText="timeConsume"
              />
              <display-card
                cardTitle="258"
                cardText="平均超时率"
                svgText="overtime"
              />
            </el-col>
          </el-row>
        </card-container>
      </el-col>
    </el-row>
    <card-container style="padding:24px">
      <category-table />
    </card-container>
  </div>
</template>

<script>
import DisplayCard from "@/components/DisplayCard";
import CardContainer from "@/components/CardContainer";
import PieChart from "./components/PieChart";
import CategoryTable from "./components/category-table";

export default {
  name: "Category",
  components: {
    DisplayCard,
    PieChart,
    CategoryTable,
    CardContainer
  }
};
</script>

<style lang="scss" scoped></style>
