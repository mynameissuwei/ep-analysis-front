<template>
  <div>
    <el-form :model="listQuery" :rules="rules" ref="ruleForm">
      <div class="card-container" style="height: 156px">
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
                <div class="title-container">选择流程</div>
              </el-col>
              <el-col :span="16">
                <el-form-item prop="procDefValue">
                  <el-select
                    filterable
                    v-model="listQuery.procDefValue"
                    clearable
                    placeholder="请选择"
                    class="my-el-select"
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
                <el-button class="button-container" @click="changeTime('day')"
                  >今日</el-button
                >
                <el-button class="button-container" @click="changeTime('week')"
                  >本周</el-button
                >
                <el-button class="button-container" @click="changeTime('month')"
                  >本月</el-button
                >
                <el-button class="button-container" @click="changeTime('year')"
                  >全年</el-button
                >
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
                >查询</el-button
              >
              <el-button size="small" @click="resetForm('ruleForm')"
                >重置</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <div class="tab-container" style="position: relative">
      <el-tabs v-model="activeName" @tab-click="handleTabChange">
        <el-tab-pane label="流程指数" name="first">
          <tab-container v-if="'first' === activeName">
            <template v-slot:left>
              <left-container
                :dateValue="listQuery.dateValue"
                :procDefKey="procDefKey"
              ></left-container>
            </template>
            <template v-slot:right>
              <right-container
                :procFactorDetail="procFactorDetail"
                :procFactorRuleData="procFactorRuleData"
                :getProcIndexRule="getProcIndexRule"
                :getProcFactor="getProcFactor"
                :listQuery="listQuery"
              />
            </template>
          </tab-container>
        </el-tab-pane>
        <el-tab-pane label="节点分析" name="second">
          <tab-container v-if="'second' === activeName">
            <template v-slot:left> <left-container /> </template>
            <template v-slot:right>
              <node-detail
                :nodeAnalysisData="nodeAnalysisData"
                :nodeTimeData="nodeTimeData"
                :nodeChartData="nodeChartData"
                :listQuery="listQuery"
              />
            </template>
          </tab-container>
        </el-tab-pane>
        <el-tab-pane label="流程指数" name="third">
          <tab-container v-if="'third' === activeName">
            <template v-slot:left>
              <left-container />
            </template>
            <template v-slot:right>
              <export-detail />
            </template>
          </tab-container>
        </el-tab-pane>
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
    this.driver = new Driver();
    const steps = [
      {
        element: ".button-group",
        popover: {
          title: "提示",
          description: "请填写相关参数,再点击查询",
          position: "bottom",
        },
        padding: 0,
      },
    ];
    this.driver.defineSteps(steps);
    this.driver.start();
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
      nodeAnalysisData: {},
      nodeTimeData: {},
      nodeChartData: {
        list: [],
        conclusion: "",
      },
      listQuery: {
        templateTypesValue: "",
        procDefValue: "",
        dateValue: [start, new Date()],
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getProcIndexRule();
          this.getProcFactor();
          this.getNode();
        }
      });
    },
    handleSelectChange() {
      this.listQuery.procDefValue = "";
      this.getProcDef();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.listQuery.dateValue = "";
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
        total: "25",
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
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.listQuery.dateValue = [start, end];
      }
      if (time == "month") {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.listQuery.dateValue = [start, end];
      }
      if (time === "year") {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
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
    }
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
</style>
