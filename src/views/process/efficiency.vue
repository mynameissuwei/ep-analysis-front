<template>
  <div>
    <card-container>
      <el-row :gutter="20">
        <el-col :span="4">
          <display-card
            cardTitle="258"
            cardText="模板总数"
            svgText="template"
          />
          <display-card
            cardTitle="250"
            cardText="模板总耗时"
            svgText="timeConsume"
          />
        </el-col>
        <el-col :span="4">
          <display-card cardTitle="258" cardText="完成率" svgText="complete" />
          <display-card
            cardTitle="258"
            cardText="平均耗时"
            svgText="timeConsume"
          />
        </el-col>
        <el-col :span="8" class="chart-container">
          <card-chart />
        </el-col>
        <el-col :span="4">
          <display-card
            cardTitle="258"
            cardText="模板总超时"
            svgText="overtime"
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
            cardText="参与审批总人数"
            svgText="people"
          />
          <display-card
            cardTitle="258"
            cardText="人均耗时"
            svgText="timeConsume"
          />
        </el-col>
      </el-row>
    </card-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <card-container height="478px">
          <number-card />
          <event-card />
        </card-container>
      </el-col>
      <el-col :span="16">
        <card-container height="478px" style="padding-top:24px">
          <line-chart :chart-data="lineChartData" />
        </card-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DisplayCard from "@/components/DisplayCard";
import CardContainer from "@/components/CardContainer";
import CardChart from "./components/CardChart";
import LineChart from "./components/LineChart";
import NumberCard from "./components/NumberCard";
import EventCard from "./components/EventCard";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "Efficiency",
  components: {
    DisplayCard,
    CardChart,
    LineChart,
    NumberCard,
    EventCard,
    CardContainer
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}
</style>
