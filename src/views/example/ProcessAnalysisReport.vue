<template>
  <div class="process-report">
    <!--  页眉  -->
    <div class="page_header">
      <div class="page_header_logo">
        <div class="left-content">
          <img src="@/assets/menuHover.png" alt="LOGO" />
          <img src="@/assets/logo.png" alt="LOGO" style="margin-left: 5px" />
          <el-divider direction="vertical" class="vertical-container"/>
          <!-- <span class="logo">LOGO</span> -->
          <div class="page_header_logo_text">
            <h3 style="color: cornflowerblue">Process Mining</h3>
          </div>
        </div>

      </div>

      <div class="page_header_text">
        <p align="right">
          流程分析报告 导出时间：{{ exportTime }} 操作人：{{
            this.$store.state.user.nickName
          }}
        </p>
      </div>
    </div>

    <div style="text-align: center">
      <h1>{{ this.listQuery.procDefName }}</h1>
      <h4>-流程分析报告</h4>
    </div>

    <div style="margin-left: 5px">
      <h3>数据样本来自于：</h3>
      <p>选择租户：{{ this.$store.state.user.tenantName }}</p>

      <p>流程类型：{{ this.listQuery.appName }}</p>
      <p>流程名称：{{ this.listQuery.procDefName }}</p>
      <p>
        选择时间：{{ this.listQuery.startTime }} ~ {{ this.listQuery.endTime }}
      </p>
    </div>

    <span style="margin-top: 20px; margin-left: 5px">流程图</span>
    <el-divider />

    <!--  流程图  -->
    <div class="process-graph">
      <div id="process_graph" class="ap-pd-process-model"></div>
    </div>

    <!-- 流程指数 -->
    <div v-if="showProcessIndex" style="margin-top: 10px; margin-bottom: 10px">
      <span style="margin: 10px 10px 10px 10px">流程指数</span>
      <right-container
        :procFactorDetail="procFactorDetail"
        :procFactorRuleData="procFactorRuleData"
        :showSettingButton="false"
      />
    </div>

    <span style="margin-bottom: 10px">节点分析</span>
    <el-divider />

    <!--节点分析-->
    <div style="margin-top: 10px; margin-bottom: 10px">
      <span style="margin: 10px 10px 10px 10px">节点分析</span>
      <node-detail
        :nodeAnalysisData="nodeAnalysisData"
        :nodeTimeData="nodeTimeData"
        :nodeChartData="nodeChartData"
        :listQuery="listQuery"
        :showNodeExecutionAnalysis="showNodeExecutionAnalysis"
        :showNodeExecutionAnalysisDetail="true"
        :showNodeRollbackDetail="showNodeRollbackDetail"
        :showNodeApprovalAnalysis="showNodeApprovalAnalysis"
        :showApprovalTCIntervalDistribution="showApprovalTCIntervalDistribution"
        :showConclusion="false"
        :showButton="false"
      />
    </div>

    <el-divider />

    <!--conclusion-->
    <div>
      整体分析结论：

      <!--流程指数结论-->
      <div>
        <h4>
          &nbsp;&nbsp;&nbsp;&nbsp; 【{{
            this.listQuery.procDefName
          }}】本次分析参与数据量为{{
            this.procFactorDetail.total
          }}条，识别到以下指数： 流程线上化率 --； 流程流效率0.00%； 流程时效{{
            this.procFactorDetail.timeLimit
          }}/人天； 流程平均干系人{{ this.procFactorDetail.avgHolder }}人；
          流程人效{{ this.procFactorDetail.personLimit }}/人天；
        </h4>
      </div>

      <!--节点分析结论-->
      <div>
        <h4>
          通过节点分析， 「里程碑节点执行力分析」{{
            this.nodeChartData.conclusion
          }}
          「节点审批效率分析」{{
            this.nodeAnalysisData.conclusion
          }}
          「审批耗时区间分布」{{ this.nodeTimeData.conclusion }}
        </h4>
      </div>

      <h2 style="color: red">
        注意：以上分析结论可能因数据样本偏差，存在不准确性，请谨慎参考。
      </h2>
    </div>

    <el-divider/>

    <div style="text-align: center">
      流程分析报告     导出时间：{{exportTime}}   操作人：{{this.$store.state.user.nickName}}
    </div>
  </div>
</template>

<script>
import RightContainer from '@/views/example/RightContainer'
import LeftContainer from '@/views/example/LeftContainer'
import * as echarts from 'echarts'
import watermark from '@/utils/common'
import moment from 'moment'
import {
  fetchNodeAnalysis,
  fetchNodeChart,
  fetchProcFactor,
  fetchProcIndexRule,
  fetchTimeConsuming,
} from "@/api/example";
import NodeDetail from "@/views/example/NodeDetail";
import PD from "@/api/processMining";
import { discoverProcess } from '@/api/process';
export default {
  name: "processAnalysisReport",
  components: { NodeDetail, LeftContainer, RightContainer },
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
          if (this.listQuery.export === 'true' || this.listQuery.export === true) {
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
      }
      return {
        legend: {
          formatter: formatter
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          },
          formatter: function (params) {
            let str = '';
            params.forEach((item) => {
              str +=
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>'
                + formatter(item.seriesName) + " : " + item.data[item.seriesName] + "<br />";
            });
            return str;
          }
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
      if (this.listQuery.watermark === 'true' || this.listQuery.watermark === true) {
        watermark(
          this.$store.state.user.nickName + " " + this.$store.state.user.userId
        );
      }
    },
  },
  mounted() {
    this.watermarkPage();
    this.getProcFactor();
    this.getProcIndexRule();
    this.initChart();
    this.getNodeAnalysis();
    this.getNodeTimeConsuming();
    this.initPD();
    this.DFG();
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
    margin-top: 12px;
    margin-bottom: 20px;
    padding: 9px 9px 9px 13px;
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

.page_header {
  width: 100%;
  height: 48px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: #264480;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.process-report{
  width: 80%;
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

}
</style>
