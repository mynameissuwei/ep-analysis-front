<template>
  <div>
    <!--  页眉  -->
    <div class="page_header">

      <div class="page_header_logo">
        <div class="page_header_logo_img" style="margin-right: 5px">
          <img src="@/assets/logo.png" alt="LOGO" width="90" />
        </div>
        <div class="page_header_logo_text">
          <h3 style="color: cornflowerblue">Process Mining</h3>
        </div>
      </div>

      <div class="page_header_text">
        <p align="right">流程分析报告     导出时间：{{ exportTime }}    操作人：{{this.$store.state.user.nickName}}</p>
      </div>
    </div>

    <el-divider/>

    <div style="text-align: center">
      <h1>{{this.listQuery.procDefName}}</h1>
      <h4>-流程分析报告</h4>
    </div>

    <div style="margin-left: 5px">
      <h3>数据样本来自于：</h3>
      <p>选择租户：{{this.$store.state.user.tenantId}}</p>
      <p>流程类型：{{this.listQuery.appName}}</p>
      <p>流程名称：{{this.listQuery.procDefName}}</p>
      <p>选择时间：{{this.listQuery.startTime}} ~ {{this.listQuery.endTime}}</p>
    </div>


    <span style="margin-top: 20px;margin-left: 5px">流程图</span>
    <el-divider/>

    <!--  流程图  -->
    <div class="process-graph">
      <left-container/>
    </div>

    <!-- 流程指数 -->
    <div v-if="showProcessIndex" style="margin-top: 10px;margin-bottom: 10px">
      <span style="margin:10px 10px 10px 10px">流程指数</span>
      <right-container
        :procFactorDetail="procFactorDetail"
        :procFactorRuleData="procFactorRuleData"
        :showSettingButton="false"
      />
    </div>

    <span style="margin-bottom: 10px;">节点分析</span>
    <el-divider/>

    <!--节点分析-->
    <div class="nodeDetail">
      <!--里程碑节点执行力分析-->
      <div v-if="showNodeExecutionAnalysis">
        <div class="iconContainer">
          <div>里程碑节点执行力分析</div>
        </div>

        <div class="nodeDetailContainer">
          <div id="histogram" style="width: 100%; height: 190px" />
          <el-divider/>
        </div>
      </div>

      <!--节点审批效率分析-->
      <div v-if="showNodeApprovalAnalysis">
        <div class="iconContainer">
          <div>节点审批效率分析</div>
          <div>
            <span>环比至</span>
            <span> {{ nodeAnalysisData.chainDate }} </span>
          </div>
        </div>
        <el-table :data="nodeAnalysisData.list">
          <el-table-column prop="taskName" label="节点名称" width="150" fixed>
          </el-table-column>
          <el-table-column label="平均耗时(人天)">
            <el-table-column prop="averagePassTime" label="耗时" width="120">
            </el-table-column>
            <el-table-column prop="averagePassTimeChain" label="环比" width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column label="平均实际处理(人天)">
            <el-table-column
              prop="averageActualCostTime"
              label="耗时"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="averageActualCostTimeChain"
              label="环比"
              width="300"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column label="平均等待(人天)">
            <el-table-column prop="averageWaitTime" label="耗时" width="120">
            </el-table-column>
            <el-table-column prop="averageWaitTimeChain" label="环比" width="300">
            </el-table-column>
          </el-table-column>
        </el-table>

      </div>

      <el-divider/>

      <!--审批耗时区间分布-->
      <div v-if="showApprovalTCIntervalDistribution">
        <div class="nodeDetailContainer">
          <div class="iconContainer">
            <div>审批耗时区间分布</div>
          </div>
          <el-table :data="nodeTimeData.list">
            <el-table-column prop="taskName" label="节点名称" width="150" fixed>
            </el-table-column>
            <el-table-column label="秒批（≤60s）">
              <el-table-column prop="secondNum" label="次数" width="120">
              </el-table-column>
              <el-table-column prop="secondPercent" label="占比" width="120">
              </el-table-column>
            </el-table-column>
            <el-table-column label="跨天（≥1/人天）">
              <el-table-column prop="dayNum" label="次数" width="120">
              </el-table-column>
              <el-table-column prop="dayPercent" label="占比" width="300">
              </el-table-column>
            </el-table-column>
            <el-table-column label="常规">
              <el-table-column prop="normalNum" label="次数" width="120">
              </el-table-column>
              <el-table-column prop="normalPercent" label="占比" width="300">
              </el-table-column>
            </el-table-column>
          </el-table>

        </div>
      </div>
    </div>

    <el-divider/>

    <!--conclusion-->
    <div>
      整体分析结论：

      <!--流程指数结论-->
      <div>
        <h4>
          &nbsp;&nbsp;&nbsp;&nbsp;
          【{{this.listQuery.procDefName}}】本次分析参与数据量为{{this.procFactorDetail.total}}条，识别到以下指数：
          流程线上化率 --；
          流程流效率0.00%；
          流程时效{{this.procFactorDetail.timeLimit}}/人天；
          流程平均干系人{{this.procFactorDetail.avgHolder}}人；
          流程人效{{this.procFactorDetail.personLimit}}/人天；
        </h4>
      </div>

      <!--节点分析结论-->
      <div>
        <h4>
          通过节点分析，
          「里程碑节点执行力分析」{{this.nodeChartData.conclusion}}
          「节点审批效率分析」{{this.nodeAnalysisData.conclusion}}
          「审批耗时区间分布」{{this.nodeTimeData.conclusion}}
        </h4>
      </div>


      <h2 style="color: red">
        注意：以上分析结论可能因数据样本偏差，存在不准确性，请谨慎参考。
      </h2>
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
  fetchTimeConsuming
} from '@/api/example'
export default {
  name: 'processAnalysisReport',
  components: { LeftContainer, RightContainer },
  data(){
    return{
      exportTime: moment(parseInt(new Date().getTime())).format("YYYY-MM-DD HH:mm:ss"),
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
        conclusion: ""
      },
      listQuery: this.$route.query
    }
  },
  methods: {
    initChart() {
      console.log(document.getElementById("histogram"), "node");
      this.chart = echarts.init(document.getElementById("histogram"));
      this.getNodeChart().then(resp => {
        this.chart.setOption(this.getOption());
        this.chart.on('finished', () => {
          if(this.listQuery.export){
            alert("页面加载完毕，准备导出")
            window.print();
          }
        })
      })
    },
    getOption() {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: [
            "name",
            this.nodeChartData.list.map((item) => item.taskName),
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
    handleNodeAnalysisShow(){
      const ranges = this.listQuery.exportRanges;
      console.log("ranges",ranges)
      if(ranges.includes("PROCESS_INDEX")){
        this.showProcessIndex = true;
      }
      if(ranges.includes("MILESTONE_TASK_EXECUTIVE_FORCE_ANALYSIS")){
        this.showNodeExecutionAnalysis = true;
      }
      if(ranges.includes("MILESTONE_TASK_ROlLBACK_DETAIL")){
        this.showNodeRollbackDetail = true;
      }
      if(ranges.includes("TASK_APPROVAL_EFFICIENCY_ANALYSIS")){
        this.showNodeApprovalAnalysis = true;
      }
      if(ranges.includes("APPROVAL_TIME_CONSUMING_INTERVAL_DISTRIBUTION")) {
        this.showApprovalTCIntervalDistribution = true;
      }
    },
    watermarkPage(){
      if(this.listQuery.watermark){
        watermark(this.$store.state.user.nickName+" "+this.$store.state.user.userId);
      }
    }
  },
  mounted() {
    this.watermarkPage();
    this.getProcFactor();
    this.getProcIndexRule();
    this.initChart();
    this.getNodeAnalysis();
    this.getNodeTimeConsuming();
    console.log(">>>>>>>>>>>>>queryParam is ", JSON.stringify(this.$route.query))
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

}
</script>

<style lang="scss" scoped>
.page_header_logo, .page_header_text, .page_header_logo_img, .page_header_logo_text {
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

</style>
