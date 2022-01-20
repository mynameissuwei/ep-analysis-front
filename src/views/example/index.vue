<template>
  <div>
    <el-form :model="listQuery" :rules="rules" ref="ruleForm">
      <div class="card-container" style="height: 156px; margin-top: 0px">
        <el-row :gutter="22" class="example-container">
          <el-col :span="5">
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="title-container">选择流程类型</div>
              </el-col>
              <el-col :span="16">
                <el-form-item prop="templateTypesValue">
                  <el-select
                    filterable
                    v-model="listQuery.templateTypesValue"
                    placeholder="请选择"
                    class="my-el-select"
                    @change="handleSelectChange"
                  >
                    <el-option
                      v-for="(item, index) in selectTemplateData"
                      :key="index"
                      :label="`${item.appName} (${item.appKey})`"
                      :value="item.appKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="title-container" style="margin-left: 25px">
                  选择流程
                </div>
              </el-col>
              <el-col :span="16">
                <el-form-item prop="procDefValue">
                  <el-select
                    filterable
                    v-model="listQuery.procDefValue"
                    clearable
                    placeholder="请选择"
                    class="my-el-select"
                    @change="handleProcChange"
                  >
                    <el-option
                      v-for="item in procFactorData"
                      :key="item.procDefKey"
                      :label="item.procDefName"
                      :value="item.procDefKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="14">
            <div>
              <el-form-item prop="dateValue">
                <el-button
                  v-for="item in [
                    { name: '今日', value: 'day' },
                    { name: '本周', value: 'week' },
                    { name: '本月', value: 'month' },
                    { name: '全年', value: 'year' },
                  ]"
                  :key="item.value"
                  class="button-container"
                  @click="changeTime(item.value)"
                  >{{ item.name }}
                </el-button>
                <el-date-picker
                  class="date-container"
                  size="small"
                  v-model="listQuery.dateValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="22" class="example-container">
          <el-col :span="4">
            <div class="button-group" style="margin-top: 10px">
              <el-button
                type="primary"
                size="small"
                @click="submitForm('ruleForm')"
                >查询
              </el-button>
              <el-button size="small" @click="resetForm('ruleForm')"
                >重置
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <div class="tab-container" style="position: relative">
      <el-tabs v-model="activeName" @tab-click="handleTabChange">
        <el-tab-pane label="流程指数" name="first"></el-tab-pane>
        <el-tab-pane label="节点分析" name="second"></el-tab-pane>
        <el-tab-pane label="导出报告" name="third"></el-tab-pane>
        <tab-container>
          <template v-slot:left>
            <el-popover
              placement="bottom-start"
              title="流程图辅助说明"
              width="400"
              trigger="hover"
            >
              <el-descriptions
                :column="1"
                :colon="false"
                style="font-size: 12px"
              >
                <el-descriptions-item>
                  <div style="vertical-align: center">
                    <div class="roundedRectangle1"></div>
                    <span>线上节点</span>
                    <div class="roundedRectangle2"></div>
                    <span>线下节点</span>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item label="干系人:"
                  >是节点涉及的操作人数，没有操作流程的人员不计入。</el-descriptions-item
                >
                <el-descriptions-item label="平均耗时:"
                  >从前一节点到当前节点之前平均耗时。</el-descriptions-item
                >
              </el-descriptions>
              <i
                style="font-size: 20px; margin-left: 20px; margin-top: 20px"
                class="el-icon-question"
                slot="reference"
              >
                <span style="font-size: 14px; margin-left: 10px">元素说明</span>
              </i>
            </el-popover>
            <div id="process_graph" class="ap-pd-process-model"></div>
          </template>
          <template v-slot:right>
            <div
              style="overflow: scroll; height: 100%"
              class="scroll-container"
            >
              <el-tab-pane
                style="display: block"
                name="first"
                v-if="'first' === activeName"
              >
                <right-container
                  :procFactorDetail="procFactorDetail"
                  :procFactorRuleData="procFactorRuleData"
                  :getProcIndexRule="getProcIndexRule"
                  :getProcFactor="getProcFactor"
                  :listQuery="listQuery"
                  :isInit="isInit"
                />
              </el-tab-pane>
              <el-tab-pane
                style="display: block"
                name="second"
                v-if="'second' === activeName"
              >
                <node-detail
                  :nodeAnalysisData="nodeAnalysisData"
                  :nodeTimeData="nodeTimeData"
                  :nodeChartData="nodeChartData"
                  :listQuery="listQuery"
                  :isInit="isInit"
                />
              </el-tab-pane>
              <el-tab-pane
                style="display: block"
                name="third"
                v-if="'third' === activeName"
              >
                <export-detail
                  :listQuery="listQuery"
                  :appName="appName"
                  :processName="processName"
                  :isInit="isInit"
                />
              </el-tab-pane>
            </div>
          </template>
        </tab-container>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import TabContainer from "./TabContainer";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import NodeDetail from "./NodeDetail";
import ExportDetail from "./ExportDetail";
import {
  fetchProc,
  fetchSelectTemplate,
  fetchProcFactor,
  fetchProcIndexRule,
  fetchNodeAnalysis,
  fetchTimeConsuming,
  fetchNodeChart,
} from "@/api/example";
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import moment from "moment";
import Bus from "@/Bus.js";
import { discoverProcess } from "@/api/process";
import PD from "@/api/processMining";
import processJson from "@/views/example/process.json";
import DateUtil from "./components/getTime";

const start = new Date();
start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

export default {
  components: {
    FilterItem,
    TabContainer,
    LeftContainer,
    RightContainer,
    NodeDetail,
    ExportDetail,
  },
  mounted() {
    // this.driver = new Driver();
    // const steps = [
    //   {
    //     element: ".button-group",
    //     popover: {
    //       title: "提示",
    //       description: "请填写相关参数,再点击查询",
    //       position: "bottom",
    //     },
    //     padding: 0,
    //   },
    // ];
    // this.driver.defineSteps(steps);
    // this.driver.start();
    this.initPD();
    let $this = this;
    Bus.$on("selectNodes", (data) => {
      $this.pd.selectNodes(data);
    });
    Bus.$on("unSelectNodes", () => {
      $this.pd.unSelectNodes();
    });
  },
  data() {
    return {
      driver: null,
      procDefKey: "",
      selectDepartmentData: [
        {
          orgCode: "123",
          orgName: "123",
        },
      ],
      rules: {
        templateTypesValue: [
          { required: true, message: "请选择流程类型", trigger: "blur" },
        ],
        procDefValue: [
          { required: true, message: "请选择流程", trigger: "blur" },
        ],
        dateValue: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      selectTemplateData: [],
      activeName: "first",
      procFactorData: [],
      isInit: true,
      procFactorDetail: {
        partRadio: "0",
        total: "0",
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
      nodeAnalysisData: {},
      nodeTimeData: {},
      appName: "",
      processName: "",
      nodeChartData: {
        list: [],
        conclusion: "",
      },
      DateUtil: DateUtil,
      listQuery: {
        templateTypesValue: "",
        procDefValue: "",
        dateValue: [
          DateUtil.DateUtil.getStartDayOfMonth(),
          DateUtil.DateUtil.getEndDayOfMonth(),
        ],
      },
    };
  },
  created() {
    this.getSelectTemplate();
    // this.getProcDef();
    // this.getProcess();
    // this.getNode();
  },
  methods: {
    selectNodes(ids) {
      this.pd.selectNodes(ids);
    },
    unSelectNodes() {
      this.pd.unSelectNodes();
    },
    initPD() {
      this.pd = new PD("process_graph");
      this.pd.loadLog(JSON.stringify(processJson), 3);
    },
    async DFG() {
      let queryData = {
        startDate: moment(
          parseInt(this.listQuery.dateValue[0].getTime())
        ).format("YYYY-MM-DD"),
        endDate: moment(parseInt(this.listQuery.dateValue[1].getTime())).format(
          "YYYY-MM-DD"
        ),
        procDefKey: this.listQuery.procDefValue,
        appKey: this.listQuery.templateTypesValue,
      };
      const result = await discoverProcess(queryData);
      this.pd.loadLog(result.data.visualizedText, 3);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isInit = false;
          this.getProcIndexRule();
          this.getProcFactor();
          this.getNode();
          this.DFG();
        }
      });
    },
    handleSelectChange(val) {
      let appName = this.selectTemplateData.find(
        (item) => item.appKey === val
      ).appName;
      this.appName = appName;
      this.listQuery.procDefValue = "";
      this.getProcDef();
    },
    handleProcChange(val) {
      let procDefName = this.procFactorData.find(
        (item) => item.procDefKey === val
      ).procDefName;
      this.processName = procDefName;
    },
    resetForm(formName) {
      this.isInit = true;
      this.$refs[formName].resetFields();
      this.listQuery.dateValue = [
        DateUtil.DateUtil.getStartDayOfMonth(),
        DateUtil.DateUtil.getEndDayOfMonth(),
      ];
      this.initProcess();
      this.initNode();
    },
    initNode() {
      this.nodeAnalysisData = {};
      this.nodeTimeData = {};
      this.nodeChartData = {
        list: [],
        conclusion: "",
      };
    },
    initProcess() {
      this.procFactorDetail = {
        partRadio: "0",
        total: "0",
        flowRadio: "0",
        timeLimit: "0",
        avgHolder: "0",
        personLimit: "0",
      };
      this.procFactorRuleData = {
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
      };
    },
    //获取流程指数
    getProcess() {
      this.getProcFactor();
      this.getProcIndexRule();
    },
    handleTabChange() {
      Bus.$emit("sendMsg", "handleTabChange");
    },
    changeTime(time) {
      const end = new Date();
      if (time === "day") {
        const start = new Date();
        this.listQuery.dateValue = [start, start];
      }
      if (time === "week") {
        // const start = new Date();
        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        const start = this.DateUtil.DateUtil.getStartDayOfWeek();
        const end = this.DateUtil.DateUtil.getEndDayOfWeek();
        this.listQuery.dateValue = [start, end];
      }
      if (time == "month") {
        // const start = new Date();
        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        const start = this.DateUtil.DateUtil.getStartDayOfMonth();
        const end = this.DateUtil.DateUtil.getEndDayOfMonth();
        this.listQuery.dateValue = [start, end];
      }
      if (time === "year") {
        // const start = new Date();
        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
        const start = this.DateUtil.DateUtil.getStartDayOfYear();
        const end = this.DateUtil.DateUtil.getEndDayOfYear();
        this.listQuery.dateValue = [start, end];
      }
    },
    async getSelectTemplate() {
      const { data } = await fetchSelectTemplate();
      this.selectTemplateData = data;
    },
    async getProcDef() {
      const { data } = await fetchProc({
        condition: {
          appKey: this.listQuery.templateTypesValue,
          tenantId: this.$store.state.user.tenantId,
          maxLimit: -1,
        },
      });

      this.procFactorData = data;
    },
    // 获取流效期望
    async getProcIndexRule() {
      const { data } = await fetchProcIndexRule(
        JSON.stringify({
          tenantId: this.$store.state.user.tenantId,
          procDefKey: this.listQuery.procDefValue,
        })
      );

      if (data) {
        this.procFactorRuleData = data;
      }
    },
    // 获取流效样本
    async getProcFactor() {
      const { data } = await fetchProcFactor({
        procDefKey: this.listQuery.procDefValue,
        // tenantId: this.$store.state.user.tenantId,
        appKey: this.listQuery.templateTypesValue,
        startTime: moment(
          parseInt(this.listQuery.dateValue[0].getTime())
        ).format("YYYY-MM-DD"),
        endTime: moment(parseInt(this.listQuery.dateValue[1].getTime())).format(
          "YYYY-MM-DD"
        ),
      });

      this.procFactorDetail = data;
    },
    getNode() {
      this.getNodeAnalysis();
      this.getNodeTimeConsuming();
      this.getNodeChart();
    },
    async getNodeChart() {
      const { data } = await fetchNodeChart({
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
      this.nodeChartData = data;
    },
    async getNodeAnalysis() {
      const { data } = await fetchNodeAnalysis({
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

      this.nodeAnalysisData = data;
    },
    async getNodeTimeConsuming() {
      const { data } = await fetchTimeConsuming({
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

      this.nodeTimeData = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.example-container {
  font-size: 14px;
  // line-height: 32px;
  // height: 32px;
  // margin-bottom: 24px;
}

.title-container {
  line-height: 36px;
  height: 36px;
}

.tab-container {
  padding: 12px 24px 24px 24px;
  margin-top: 20px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  font-size: 14px;
  font-weight: 400;

  ::v-deep {
    .el-tabs__item {
      color: #666666;
    }
  }
}

.date-container {
  margin-left: 10px;
}

.button-container {
  width: 54px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #e0e3e5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.add_btn {
  min-width: 54px;
  min-height: 32px;
  border-radius: 4px;
  border: 1px solid #e0e3e5;
}

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

    /* 下面设置右侧按钮居中 */
    // .el-input__suffix {
    //   top: 5px;
    // }

    .el-input__icon {
      line-height: inherit;
    }

    .el-input__suffix-inner {
      display: inline-block;
    }
  }
}

::v-deep {
  .el-form-item__content {
    margin-left: 0px;
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
.roundedRectangle1 {
  width: 40px;
  height: 20px;
  border: 2px solid #e0e3e5;
  border-radius: 4px;
  display: inline-block;
  margin-right: 20px;
}
.roundedRectangle2 {
  width: 40px;
  height: 20px;
  border: 2px solid #0d54fc;
  border-radius: 4px;
  display: inline-block;
  margin-left: 50px;
  margin-right: 20px;
}
</style>
