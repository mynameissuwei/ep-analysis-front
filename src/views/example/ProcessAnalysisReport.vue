<template>
  <div class="process-report">
    <el-container>
      <el-header style="margin-top: 10px">
        <div class="page_header_logo">
          <div class="left-content">
            <img
              src="@/assets/ennew-logo.png"
              class="logo"
              alt="LOGO"
              style="margin-left: 5px"
            />
            <el-divider
              direction="vertical"
              class="vertical-container"
              style="color: cornflowerblue"
            />
            <div class="page_header_logo_text">
              <h3 style="color: cornflowerblue">流程分析报告</h3>
            </div>
          </div>
        </div>

        <div class="page_header_text">
          <p
            align="right"
            style="color: #333333; font-size: 14px; float: right"
          >
            流程分析报告 导出时间：{{ exportTime }} 操作人：{{
              this.$store.state.user.nickName
            }}
          </p>
        </div>
      </el-header>
      <el-main>
        <!--title-->
        <div style="text-align: center">
          <h1>{{ this.listQuery.procDefName }}</h1>
          <p style="font-size: 20px; color: #333333">流程分析报告</p>
        </div>
        <!--数据源详情-->
        <div style="margin-left: 25px" class="data-source">
          <span>数据样本来自</span>
          <el-row :gutter="24" style="margin-top: 10px; margin-bottom: 10px">
            <el-col :span="8">
              <span class="data-source-key">选择租户</span>
              <span class="data-source-value">{{
                this.$store.state.user.tenantName
              }}</span>
            </el-col>
            <el-col :span="8">
              <span class="data-source-key">流程类型</span>
              <span class="data-source-value">{{
                this.listQuery.appName
              }}</span>
            </el-col>
            <el-col :span="8">
              <span class="data-source-key">流程名称</span>
              <span class="data-source-value">{{
                this.listQuery.procDefName
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="data-source-key">选择时间</span>
              <span class="data-source-value"
                >{{ this.listQuery.startTime }} ~
                {{ this.listQuery.endTime }}</span
              >
            </el-col>
          </el-row>
        </div>
        <!--结论-->
        <div class="conclusion">
          <p class="conclusion-title">总分析结论</p>
          <div
            style="
              font-size: 14px;
              margin-left: 24px;
              margin-right: 24px;
              line-height: 22px;
            "
          >
            <p style="text-indent: 2em">
              【{{ this.listQuery.procDefName }}】本次分析参与数据量为{{
                this.procFactorDetail.total
              }}条，识别到以下指数： 流程线上化率 --； 流程流效率0.00%；
              流程时效{{ this.procFactorDetail.timeLimit }}/人天；
              流程平均干系人{{ this.procFactorDetail.avgHolder }}人； 流程人效{{
                this.procFactorDetail.personLimit
              }}/人天；
            </p>

            <p style="text-indent: 2em">
              通过节点分析， 「里程碑节点执行力分析」{{
                this.nodeChartData.conclusion
              }}
              「节点审批效率分析」{{
                this.nodeAnalysisData.conclusion
              }}
              「审批耗时区间分布」{{ this.nodeTimeData.conclusion }}。
            </p>

            <img
              src="@/assets/exclamation-mark.png"
              style="width: 25px; height: 25px"
            />
            <span style="color: #ea4646"
              >以下分析结论可能因数据样本偏差，存在不准确性，请谨慎参考。</span
            >
          </div>
        </div>

        <!--流程指数-->
        <div
          v-if="showProcessIndex"
          style="margin-bottom: 10px; margin-top: 10px"
        >
          <span>流程指数</span>
          <report-right-container
            :procFactorDetail="procFactorDetail"
            :procFactorRuleData="procFactorRuleData"
            :showSettingButton="false"
          />
        </div>

        <!--节点分析-->
        <div style="margin-top: 10px; margin-bottom: 10px" v-if="showNodeAnalysis">
          <span>节点分析</span>
          <node-detail
            :nodeAnalysisData="nodeAnalysisData"
            :nodeTimeData="nodeTimeData"
            :nodeChartData="nodeChartData"
            :listQuery="listQuery"
            :showNodeExecutionAnalysis="showNodeExecutionAnalysis"
            :showNodeRollbackDetail="showNodeRollbackDetail"
            :showNodeApprovalAnalysis="showNodeApprovalAnalysis"
            :showApprovalTCIntervalDistribution="
              showApprovalTCIntervalDistribution
            "
            :showConclusion="false"
            :showButton="false"
          />
        </div>
      </el-main>
      <el-footer>
        <div style="text-align: center">
          流程分析报告 导出时间：{{ exportTime }} 操作人：{{
            this.$store.state.user.nickName
          }}
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import RightContainer from "@/views/example/RightContainer";
import LeftContainer from "@/views/example/LeftContainer";
import * as echarts from "echarts";
import watermark from "@/utils/common";
import moment from "moment";
import {
  fetchNodeAnalysis,
  fetchNodeChart,
  fetchProcFactor,
  fetchProcIndexRule,
  fetchTimeConsuming,
} from "@/api/example";
import NodeDetail from "@/views/example/NodeDetail";
import PD from "@/api/processMining";
import { discoverProcess } from "@/api/process";
import ReportRightContainer from "@/views/example/ReportRightContainer";
export default {
  name: "processAnalysisReport",
  components: {
    ReportRightContainer,
    NodeDetail,
    LeftContainer,
    RightContainer,
  },
  data() {
    return {
      exportTime: moment(parseInt(new Date().getTime())).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      chart: null,
      showNodeExecutionAnalysis: false,
      showNodeRollbackDetail: false,
      showProcessIndex: false,
      showNodeApprovalAnalysis: false,
      showApprovalTCIntervalDistribution: false,
      procFactorDetail: {
        partRadio: "0",
        total: "25",
        flowRadio: "0",
        timeLimit: "0",
        avgHolder: "0",
        personLimit: "0",
      },
      procFactorRuleData: {
        rule: {
          flowEffic: {
            expect: 0,
            high: 0,
            middle: 0,
            low: 0,
            redLine: 0,
          },
          timeEffic: {
            expect: 0,
            high: 0,
            middle: 0,
            low: 0,
            redLine: 0,
          },
          personEffic: {
            expect: 0,
            high: 0,
            middle: 0,
            low: 0,
            redLine: 0,
          },
        },
      },
      nodeChartData: {
        conclusion: "",
        list: [],
      },
      nodeAnalysisData: {
        list: [],
        conclusion: "",
        chainDate: "2015-09-09 09:45:23～2025-09-09 09:45:23",
      },
      nodeTimeData: {
        list: [],
        conclusion: "",
      },
      listQuery: this.$route.query,
    };
  },
  computed:{
    showNodeAnalysis(){
      return this.showNodeExecutionAnalysis || this.showNodeApprovalAnalysis || this.showApprovalTCIntervalDistribution
    }
  },
  methods: {
    initPD() {
      this.pd = new PD("process_graph");
    },
    async DFG() {
      let queryData = {
        startDate: this.listQuery.startTime,
        endDate: this.listQuery.endTime,
        procDefKey: this.listQuery.procDefKey,
        appKey: this.listQuery.appKey,
      };
      const result = await discoverProcess(queryData);
      this.pd.loadLog(result.data.visualizedText, 3);
    },
    initChart() {
      console.log(document.getElementById("histogram"), "node");
      this.chart = echarts.init(document.getElementById("histogram"));
      this.getNodeChart().then((resp) => {
        this.chart.setOption(this.getOption());
        console.log(this.listQuery, "listQuery");
        this.chart.on("finished", () => {
          if (
            this.listQuery.export === "true" ||
            this.listQuery.export === true
          ) {
            window.print();
            this.chart.off("finished");
          }
        });
      });
    },
    getOption() {
      let formatter = function (name) {
        const legendData = {
          taskNumReal: "节点数",
          taskNumLine: "标准节点数",
          timeConsumingReal: "里程碑耗时",
          timeConsumingLine: "里程碑标准耗时",
        };
        return legendData[name];
      };
      return {
        legend: {
          formatter: formatter,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
          formatter: function (params) {
            let str = "";
            params.forEach((item) => {
              str +=
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
                item.color +
                '"></span>' +
                formatter(item.seriesName) +
                " : " +
                item.data[item.seriesName] +
                "<br />";
            });
            return str;
          },
        },
        dataset: {
          dimensions: [
            "name",
            "taskNumReal",
            "taskNumLine",
            "timeConsumingReal",
            "timeConsumingLine",
          ],
          source: this.nodeChartData.list,
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
        ],
      };
    },
    // 获取流效样本
    async getProcFactor() {
      const { data } = await fetchProcFactor({
        procDefKey: this.listQuery.procDefKey,
        tenantId: this.$store.state.user.tenantId,
        appKey: this.listQuery.appKey,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
      });
      console.log(data, "获取流效样本");
      this.procFactorDetail = data;
    },
    // 获取流效期望
    async getProcIndexRule() {
      const { data } = await fetchProcIndexRule(
        JSON.stringify({
          tenantId: this.$store.state.user.tenantId,
          procDefKey: this.listQuery.procDefKey,
        })
      );
      console.log(data, "获取流效期望");
      if (data) {
        this.procFactorRuleData = data;
      }
    },
    // 获取里程碑节点数据
    async getNodeChart() {
      const { data } = await fetchNodeChart({
        appKey: this.listQuery.appKey,
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefKey,
        startDateTime: this.listQuery.startTime,
        endDateTime: this.listQuery.endTime,
      });
      console.log(data, "datadataa");
      this.nodeChartData = data;
    },
    async getNodeAnalysis() {
      const { data } = await fetchNodeAnalysis({
        appKey: this.listQuery.appKey,
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefKey,
        startDateTime: this.listQuery.startTime,
        endDateTime: this.listQuery.endTime,
      });
      this.nodeAnalysisData = data;
    },
    async getNodeTimeConsuming() {
      const { data } = await fetchTimeConsuming({
        appKey: this.listQuery.appKey,
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefKey,
        startDateTime: this.listQuery.startTime,
        endDateTime: this.listQuery.endTime,
      });

      this.nodeTimeData = data;
    },
    handleNodeAnalysisShow() {
      const ranges = this.listQuery.exportRanges;
      console.log("ranges", ranges);
      if (ranges.includes("PROCESS_INDEX")) {
        this.showProcessIndex = true;
      }
      if (ranges.includes("MILESTONE_TASK_EXECUTIVE_FORCE_ANALYSIS")) {
        this.showNodeExecutionAnalysis = true;
      }
      if (ranges.includes("MILESTONE_TASK_ROlLBACK_DETAIL")) {
        this.showNodeRollbackDetail = true;
      }
      if (ranges.includes("TASK_APPROVAL_EFFICIENCY_ANALYSIS")) {
        this.showNodeApprovalAnalysis = true;
      }
      if (ranges.includes("APPROVAL_TIME_CONSUMING_INTERVAL_DISTRIBUTION")) {
        this.showApprovalTCIntervalDistribution = true;
      }
    },
    watermarkPage() {
      if (
        this.listQuery.watermark === "true" ||
        this.listQuery.watermark === true
      ) {
        watermark(
          this.$store.state.user.nickName + " " + this.$store.state.user.userId
        );
      }
    },
  },
  mounted() {
    this.getProcFactor();
    this.getProcIndexRule();
    this.initChart();
    this.getNodeAnalysis();
    this.getNodeTimeConsuming();
    // this.initPD();
    // this.DFG();
    this.watermarkPage();
    console.log(
      ">>>>>>>>>>>>>queryParam is ",
      JSON.stringify(this.$route.query)
    );
  },
  created() {
    this.handleNodeAnalysisShow();
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

<style lang="scss" scoped>
.page_header_logo,
.page_header_text,
.page_header_logo_img,
.page_header_logo_text {
  display: inline-block;
}

.page_header {
  display: flex;
  justify-content: space-between;
}

.process-graph {
  position: relative;
  height: calc(100vh - 420px);
}

.triangle-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid red;
  margin-left: 10px;
  display: inline-block;
}
.triangle-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid green;
  margin-left: 10px;
  display: inline-block;
}
.nodeDetail {
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  background: #ffffff;
  box-shadow: 1px 0px 1px 0px #eeeeee;
  border: 1px solid #e9ecf3;
  overflow: scroll;
  .row-container {
    line-height: 40px;
  }
  .iconContainer-title {
    font-size: 16px;
    font-weight: 500;
  }
  .iconContainer {
    width: 100%;
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .textClass {
    width: 68px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    border: 1px solid #e0e3e5;
    display: inline-block;
    text-align: center;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 16px;
    margin-right: 16px;
    cursor: pointer;
    font-size: 12px;
  }
  .iconClass {
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #e0e3e5;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .conclusion {
    .conclusion-title {
      padding: 10px 0px 6px 0px;
    }
    width: 100%;
    height: 78px;
    background: #f8f9fa;
    border-radius: 4px;
    margin-top: 8px;
    margin-bottom: 20px;
    //padding: 9px 9px 9px 13px;
  }
}
.ap-pd-process-model {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #666;
  background: #f8f9fa;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}

.left-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-header {
  width: 100%;
  height: 48px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.process-report {
  top: 5px;
  bottom: 5px;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  background: #ffffff;
  width: 65%;
  background: #FFFFFF;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.data-source {
  .data-source-key {
    width: 56px;
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 14px;
    margin-right: 24px;
  }
  .data-source-value {
    width: 141px;
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 14px;
  }
}

.conclusion {
  height: 280px;
  background: #f8f9fa;
  border-radius: 4px;
  margin-top: 20px;
  .conclusion-title {
    padding: 10px 0px 16px 0px;
    width: 96px;
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 16px;
    margin-top: 24px;
    margin-left: 24px;
  }
}


</style>
