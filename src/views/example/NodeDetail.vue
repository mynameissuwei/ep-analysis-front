<template>
  <div class="nodeDetail">
    <div v-if="showNodeExecutionAnalysis">
      <div class="iconContainer">
        <div class="iconContainer-title">里程碑节点执行力分析</div>

        <div v-if="showButton">
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

    <div v-if="showNodeExecutionAnalysisDetail">
      <div class="detail-modal">
        <el-row
          :gutter="22"
          type="flex"
          justify="space-between"
          style="line-height: 32px"
        >
          <el-col :span="12">
            <el-row :gutter="5">
              <el-col :span="4">
                <span>里程碑</span>
              </el-col>
              <el-col :span="20">
                <el-select
                  v-model="milestoneId"
                  placeholder="请选择"
                  class="my-el-select"
                  @change="handleSelectChange"
                >
                  <el-option
                    v-for="item in nodeChartData.list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <div class="text-container">
              <span style="margin-right: 8px">里程碑回退耗时</span>
              <span>{{ nodeChartDataDetail.milestoneRollBackTime }}</span>
              <span>人天</span>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="nodeChartDataDetail.list"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="taskName" label="节点名称" width="180">
          </el-table-column>
          <el-table-column
            prop="normalOperation"
            label="应操作(次)"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="backOperation" label="回退操作(次)">
            <template slot-scope="{ row }">
              <span style="color: red">{{ row.backOperation }}</span>
            </template>
          </el-table-column>
        </el-table>
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
        <div class="iconContainer-title">审批耗时偏好分布</div>
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
    showNodeExecutionAnalysisDetail: {
      type: Boolean,
      default: false,
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
    showButton: {
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
        milestoneRollBackTime: "--",
        list: [],
      },
      milestoneId: null,
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
  watch: {
    nodeChartData(newValue, oldValue) {
      console.log(newValue, oldValue, "oldValue");
      if (newValue.list) {
        if (!newValue.list.length) {
          this.chart.setOption(
            {
              dataset: {
                dimensions: [],
                source: [],
              },
              xAxis: { type: "category" },
              yAxis: {},
            },
            true
          );
        } else {
          this.chart.setOption(this.getOption(), true);
        }
      } else {
        this.chart.setOption(
          {
            dataset: {
              dimensions: [],
              source: [],
            },
            xAxis: { type: "category" },
            yAxis: {},
          },
          true
        );
      }
    },
  },
  methods: {
    resize() {
      this.chart && this.chart.resize();
    },
    handleSelectChange(val) {
      let taskDefKey = this.nodeChartData.list.find(
        (item) => item.id === val
      ).taskDefKeys;
      this.getNodeChartDetail(taskDefKey);
    },
    async getNodeChartDetail(taskDefKey = "") {
      let startDateTime =
        this.listQuery.startTime == undefined
          ? this.listQuery.dateValue[0]
          : this.listQuery.startTime;
      let endDateTime =
        this.listQuery.endTime == undefined
          ? this.listQuery.dateValue[1]
          : this.listQuery.endTime;
      let param = {
        appKey: this.listQuery.templateTypesValue,
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefValue,
        taskDefKey,
      };
      param.startDateTime = startDateTime;
      param.endDateTime = endDateTime;
      const { data } = await fetchNodeChartDetail(param);
      this.nodeChartDataDetail = data;
    },
    handleShowDetail() {
      this.detailVisible = true;
      this.getNodeChartDetail();
    },
    handleHiddleDetail() {
      this.detailVisible = false;
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
      this.chart.setOption(this.getOption(), true);
      let $chart = this.chart;
      let nodeChartData = this.nodeChartData;
      this.chart.getZr().on("click", function (params) {
        let pointInPixel = [params.offsetX, params.offsetY];
        if ($chart.containPixel("grid", pointInPixel)) {
          let xIndex = $chart.convertFromPixel({ seriesIndex: 0 }, [
            params.offsetX,
            params.offsetY,
          ])[0];
          Bus.$emit(
            "selectNodes",
            nodeChartData.list[xIndex].taskDefKeys.split(",")
          );
        }
      });
    },
    getOption() {
      let $emit = this.$emit;
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
          dimensions: this.nodeChartData.list
            ? this.nodeChartData.list.length
              ? [
                  "name",
                  "taskNumReal",
                  "taskNumLine",
                  "timeConsumingReal",
                  "timeConsumingLine",
                ]
              : []
            : [],
          source: this.nodeChartData.list ? this.nodeChartData.list : [],
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
  // overflow: scroll;
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
      color: #333333;
      font-weight: 400;
      font-size: 12px;
    }

    font-weight: 500;
    color: #333333;
    font-size: 12px;

    width: 100%;
    height: 78px;
    background: #f8f9fa;
    border-radius: 4px;
    margin-top: 12px;
    margin-bottom: 20px;
    padding: 9px 9px 9px 13px;
  }
}

.detail-modal {
  .my-el-select {
    width: 100%;
    ::v-deep {
      .el-input__inner {
        height: 32px;
      }

      .el-input__prefix,
      .el-input__suffix {
        height: 32px;
      }

      .el-input__icon {
        line-height: inherit;
      }

      .el-input__suffix-inner {
        display: inline-block;
      }
    }
  }
  .text-container {
    text-align: right;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #0f55fa;
    line-height: 22px;
    height: 100%;
    line-height: 32px;
  }
  .without-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  // ::v-deep {
  //   .el-dialog__header {
  //     border-bottom: 1px solid #e0e3e5;
  //   }
  // }
}
</style>
