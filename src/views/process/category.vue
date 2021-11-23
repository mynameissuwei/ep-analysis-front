<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <card-container style="position: relative">
          <el-button size="small" class="resetButton" @click="handleReset">
            重置
          </el-button>
          <el-row :gutter="20">
            <el-col :span="12">
              <pie-chart
                id="leftChart"
                :data="leftChartData"
                :getCasCadePie="getCasCadePie"
                title="类别饼图"
                type="category"
                height="650px"
              />
            </el-col>
            <el-col :span="12">
              <pie-chart
                id="rightChart"
                :data="rightChartData"
                :getCasCadePie="getCasCadePie"
                title="部门饼图"
                type="section"
                height="650px"
              />
            </el-col>
          </el-row>
        </card-container>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-loading="loading">
      <el-col :span="24">
        <card-container>
          <el-row type="flex" justify="space-around">
            <el-col :span="4">
              <display-card
                :cardTitle="pieMap.procDefNum"
                cardText="模板总数"
                svgText="template"
              />
              <display-card
                :cardTitle="getDuration(pieMap.totalPassTime)"
                cardText="耗时总长"
                svgText="overtime"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                :cardTitle="pieMap.totalProcessCnt"
                cardText="流程总数"
                svgText="flow"
              />
              <display-card
                :cardTitle="getDuration(pieMap.processPassTime)"
                cardText="平均耗时"
                svgText="timeConsume"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                :cardTitle="pieMap.finishRatio"
                cardText="完成率"
                svgText="complete"
              />
              <display-card
                :cardTitle="pieMap.totalOverTime"
                cardText="超时总长"
                svgText="overtime"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                :cardTitle="pieMap.partNum"
                cardText="审批总人数"
                svgText="people"
              />
              <display-card
                :cardTitle="pieMap.processOverTime"
                cardText="平均超时"
                svgText="overtime"
              />
            </el-col>
            <el-col :span="4">
              <display-card
                :cardTitle="getDuration(pieMap.personPassTime)"
                cardText="人均耗时"
                svgText="timeConsume"
              />
              <display-card
                :cardTitle="toPercent(pieMap.overRatio)"
                cardText="平均超时率"
                svgText="overtime"
              />
            </el-col>
          </el-row>
        </card-container>
      </el-col>
    </el-row>

    <card-container style="padding: 24px">
      <category-table />
    </card-container>
  </div>
</template>

<script>
import { fetchExecSqlToPie, fetchCasCadePie } from "@/api/category";
import DisplayCard from "@/components/DisplayCard";
import CardContainer from "@/components/CardContainer";
import PieChart from "./components/PieChart";
import CategoryTable from "./components/category-table";
import toPercent from "@/utils/toPercent";
import getDuration from "@/utils/getDuration";

export default {
  name: "Category",
  data() {
    return {
      leftChartData: [],
      rightChartData: [],
      pieMap: {},
      toPercent,
      getDuration,
      loading: false,
    };
  },
  components: {
    DisplayCard,
    PieChart,
    CategoryTable,
    CardContainer,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getExecSqlToPie("appNamePie");
      this.getExecSqlToPie("orgPieList");
      this.getCasCadePie();
    },
    handleReset() {
      this.getCasCadePie({});
      console.log("Reset");
    },
    async getExecSqlToPie(pieType) {
      const { data } = await fetchExecSqlToPie({
        condition: {
          sqlKey: pieType,
        },
      });
      if (pieType === "appNamePie") {
        let leftChartData = data.map((item) => ({
          name: item.appName,
          value: item.procDefNum,
          appKey: item.appKey,
        }));
        this.leftChartData = leftChartData;
      } else {
        let rightChartData = data.map((item) => ({
          name: item.orgName,
          value: item.procDefNum,
          orgCode: item.orgCode,
        }));
        this.rightChartData = rightChartData;
      }
    },
    async getCasCadePie(params) {
      this.loading = true;
      const { data } = await fetchCasCadePie({
        condition: {
          sqlKey: "pieCasCadeMap",
          extParam: params,
        },
      });
      this.loading = false;
      this.pieMap = data;
    },
  },
};
</script>

<style lang="scss" scoped>
#leftChart {
  padding-top: 40px;
}
#rightChart {
  padding-top: 40px;
}
.resetButton {
  position: absolute;
  right: 40px;
  top: 20px;
  z-index: 3;
}
</style>
