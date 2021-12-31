<template>
  <div class="nodeDetail">
    <div class="iconContainer">
      <div>里程碑节点执行力分析</div>

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
      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          {{ nodeChartData.conclusion }}
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="nodeDetailContainer">
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

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          {{ nodeAnalysisData.conclusion }}
        </div>
      </div>
      <el-divider></el-divider>
    </div>

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

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          {{ nodeTimeData.conclusion }}
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="nodeDetailContainer">
      <div class="iconContainer">
        <div>节点执行事件明细</div>
        <div class="iconClass" @click="showNode">
          <i class="el-icon-setting"></i>
        </div>
      </div>

      <el-row
        type="flex"
        justify="space-between"
        class="row-container"
        :gutter="44"
      >
        <el-col :span="12">
          <el-row :gutter="4">
            <el-col :span="6">
              <span>选择占比类型</span>
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="input"
                placeholder="123"
                size="small"
                clearable
                @change="handleChange"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="4">
            <el-col :span="6">
              <span>选择占比类型</span>
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="input"
                placeholder="123"
                size="small"
                clearable
                @change="handleChange"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          耗时上升节点出现4个。平均耗时中5个节点在上升；平均处理中1个节点在上升，平均等待中3个节点在上升；该流程审批效率环比降低5/人天。
        </div>
      </div>

      <el-divider></el-divider>
    </div>

    <dia-modal :visible="dialogVisible" :handleClose="handleClose" />
    <node-modal :visible="nodeVisible" :handleClose="closeNode" />
    <detail-modal
      :visible="detailVisible"
      :handleClose="handleHiddleDetail"
      :nodeChartDataDetail="nodeChartDataDetail"
      :nodeChartData="nodeChartData"
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

export default {
  props: ["nodeAnalysisData", "nodeTimeData", "nodeChartData", "listQuery"],
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
      this.chart.resize();
    },
    async getNodeChartDetail() {
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
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: [
            "name",
            this.this.nodeChartData.list.map((item) => item.taskName),
            // "taskNumReal",
            // "taskNumLine",
            // "timeConsumingReal",
            // "timeConsumingLine",
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
