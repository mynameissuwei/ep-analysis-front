<template>
  <div class="nodeDetail">
    <div v-if="showNodeExecutionAnalysis">
      <div class="iconContainer">
        <div class="iconContainer-title">里程碑节点执行力分析</div>

        <div>
          <div class="textClass" @click="handleShowDetail">查看明细</div>
          <div class="iconClass" @click="handleShow">
            <i class="el-icon-setting"></i>
          </div>
        </div>
      </div>

      <div class="nodeDetailContainer">
        <div style="width: 100%; height: 190px">
          <div id="histogram" style="width: 100%; height: 190px" />
        </div>
        <div class="conclusion" v-if="showConclusion">
          <div class="conclusion-title">分析结论：</div>
          <div>
            {{ nodeChartData.conclusion }}
          </div>
        </div>
        <el-divider></el-divider>
      </div>
    </div>

    <div class="nodeDetailContainer" v-if="showNodeApprovalAnalysis">
      <div class="iconContainer">
        <div class="iconContainer-title">节点审批效率分析</div>
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
            <template slot-scope="{ row }">
              <div>
                <span>{{ row.averagePassTimeChain.toFixed(2) + "%" }}</span>
                <div
                  :class="
                    row.averagePassTimeChain > 0
                      ? 'triangle-up'
                      : row.averagePassTimeChain < 0
                      ? 'triangle-down'
                      : ''
                  "
                ></div>
              </div>
            </template>
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
            <template slot-scope="{ row }">
              <div>
                <span>{{
                  row.averageActualCostTimeChain.toFixed(2) + "%"
                }}</span>
                <div
                  :class="
                    row.averagePassTimeChain > 0
                      ? 'triangle-up'
                      : row.averagePassTimeChain < 0
                      ? 'triangle-down'
                      : ''
                  "
                ></div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平均等待(人天)">
          <el-table-column prop="averageWaitTime" label="耗时" width="120">
          </el-table-column>
          <el-table-column prop="averageWaitTimeChain" label="环比" width="300">
            <template slot-scope="{ row }">
              <div>
                <span>{{ row.averageWaitTimeChain.toFixed(2) + "%" }}</span>
                <div
                  :class="
                    row.averagePassTimeChain > 0
                      ? 'triangle-up'
                      : row.averagePassTimeChain < 0
                      ? 'triangle-down'
                      : ''
                  "
                ></div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>

      <div class="conclusion" v-if="showConclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          {{ nodeAnalysisData.conclusion }}
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="nodeDetailContainer" v-if="showApprovalTCIntervalDistribution">
      <div class="iconContainer">
        <div class="iconContainer-title">审批耗时区间分布</div>
      </div>
      <el-table :data="nodeTimeData.list">
        <el-table-column prop="taskName" label="节点名称" width="150" fixed>
        </el-table-column>
        <el-table-column label="秒批（≤60s）">
          <el-table-column prop="secondNum" label="次数" width="120">
            <template slot-scope="{ row }">
              <span style="color: red">{{ row.secondNum }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="secondPercent" label="占比" width="120">
            <template slot-scope="{ row }">
              <span>{{ row.secondPercent.toFixed(2) + "%" }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="跨天（≥1/人天）">
          <el-table-column prop="dayNum" label="次数" width="120">
            <template slot-scope="{ row }">
              <span style="color: purple">{{ row.dayNum }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dayPercent" label="占比" width="300">
            <template slot-scope="{ row }">
              <span>{{ row.dayPercent.toFixed(2) + "%" }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="常规">
          <el-table-column prop="normalNum" label="次数" width="120">
          </el-table-column>
          <el-table-column prop="normalPercent" label="占比" width="300">
            <template slot-scope="{ row }">
              <span>{{ row.normalPercent.toFixed(2) + "%" }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>

      <div class="conclusion" v-if="showConclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          {{ nodeTimeData.conclusion }}
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <!-- <div class="nodeDetailContainer">
      <div class="iconContainer">
        <div>节点执行事件明细</div>
        <div class="iconClass" @click="showNode">
          <i class="el-icon-setting"></i>
        </div>
      </div>
    </div> -->

    <dia-modal
      :visible="dialogVisible"
      :handleClose="handleClose"
      :listQuery="listQuery"
      v-if="dialogVisible"
    />
    <node-modal
      :visible="nodeVisible"
      :handleClose="closeNode"
      :listQuery="listQuery"
      v-if="nodeVisible"
    />
    <detail-modal
      :visible="detailVisible"
      :handleClose="handleHiddleDetail"
      :nodeChartDataDetail="nodeChartDataDetail"
      :nodeChartData="nodeChartData"
      :getNodeChartDetail="getNodeChartDetail"
    />
  </div>
</template>

<script>
import DiaModal from "./components/DiaModal";
import NodeModal from "./components/NodeModal";
import DetailModal from "./components/DetailModal";
import * as echarts from "echarts";
import Bus from "@/Bus.js";
import { fetchNodeChartDetail } from "@/api/example";
import moment from "moment";

export default {
  props: {
    nodeAnalysisData: {
      type: Object,
      require: true,
    },
    nodeTimeData: {
      type: Object,
      require: true,
    },
    nodeChartData: {
      type: Object,
      require: true,
    },
    listQuery: {
      type: Object,
      require: true,
    },
    showNodeExecutionAnalysis: {
      type: Boolean,
      default: true,
    },
    showNodeRollbackDetail: {
      type: Boolean,
      default: true,
    },
    showNodeApprovalAnalysis: {
      type: Boolean,
      default: true,
    },
    showApprovalTCIntervalDistribution: {
      type: Boolean,
      default: true,
    },
    showConclusion: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    DiaModal,
    NodeModal,
    DetailModal,
  },
  data() {
    return {
      input: "",
      dialogVisible: false,
      nodeVisible: false,
      detailVisible: false,
      chart: null,
      nodeChartDataDetail: {
        milestoneRollBackTime: 0,
        list: [],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    Bus.$on("sendMsg", (data) => {
      this.resize();
    });
    window.addEventListener("resize", () => {
      this.resize();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    Bus.$off("sendMsg");
  },

  methods: {
    resize() {
      this.chart && this.chart.resize();
    },
    async getNodeChartDetail(taskDefKey = "") {
      const { data } = await fetchNodeChartDetail({
        appKey: this.listQuery.templateTypesValue,
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefValue,
        startDateTime: moment(
          parseInt(this.listQuery.dateValue[0].getTime())
        ).format("YYYY-MM-DD"),
        endDateTime: moment(
          parseInt(this.listQuery.dateValue[1].getTime())
        ).format("YYYY-MM-DD"),
        taskDefKey,
      });
      this.nodeChartDataDetail = data;
    },
    handleShowDetail() {
      this.detailVisible = true;
      this.getNodeChartDetail();
    },
    handleHiddleDetail() {
      this.detailVisible = false;
    },
    handleChange() {
      console.log("handleChange");
    },
    handleShow() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    showNode() {
      this.nodeVisible = true;
    },
    closeNode() {
      this.nodeVisible = false;
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("histogram"));
      this.chart.setOption(this.getOption());
    },
    getOption() {
      return {
        legend: {
          formatter: function (name) {
            const legendData = {
              taskNumReal: "里程碑实际节点数量",
              taskNumLine: "里程碑标准节点数量",
              timeConsumingReal: "里程碑实际耗时",
              timeConsumingLine: "里程碑标准耗时",
            };
            return legendData[name];
          },
        },
        tooltip: {},
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
  },
};
</script>

<style lang="scss" scoped>
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
  .iconContainer-title {
    font-size: 16px;
    font-weight: 500;
  }
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
