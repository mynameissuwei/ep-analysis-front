<template>
  <div>
    <div class="card-container" style="height: 136px">
      <el-row :gutter="22" class="filter-container example-container">
        <el-col :span="9">
          <el-row :gutter="5">
            <el-col :span="6">
              <span>选择流程类型（租户）</span>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="listQuery.templateTypesValue"
                placeholder="请选择"
                class="my-el-select"
              >
                <el-option
                  v-for="(item, index) in selectTemplateData"
                  :key="index"
                  :label="`${item.appName} (${item.appKey})`"
                  :value="item.appKey"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9">
          <el-row :gutter="5">
            <el-col :span="3">
              <span>选择流程</span>
            </el-col>
            <el-col :span="21">
              <el-select
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
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="22" class="filter-container example-container">
        <el-col :span="14">
          <div>
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
              v-model="dateValue"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="datePick"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="float: right">
            <el-button type="primary" size="small" @click="handleSearch"
              >查询</el-button
            >
            <el-button size="small" @click="handleReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="tab-container" style="position: relative">
      <el-tabs v-model="activeName" @tab-click="handleTabChange">
        <el-tab-pane label="流程指数" name="first">
          <tab-container>
            <template v-slot:left> <left-container /> </template>
            <template v-slot:right>
              <right-container
                :procFactorDetail="procFactorDetail"
                :procFactorRuleData="procFactorRuleData"
                :getProcIndexRule="getProcIndexRule"
                :getProcFactor="getProcFactor"
              />
            </template>
          </tab-container>
        </el-tab-pane>
        <el-tab-pane label="节点分析" name="second">
          <tab-container>
            <template v-slot:left> <left-container /> </template>
            <template v-slot:right> <node-detail /> </template>
          </tab-container>
        </el-tab-pane>
        <el-tab-pane label="流程指数" name="third">
          <tab-container>
            <template v-slot:left> <left-container /> </template>
            <template v-slot:right> <export-detail /> </template>
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
} from "@/api/example";

export default {
  components: {
    FilterItem,
    TabContainer,
    LeftContainer,
    RightContainer,
    NodeDetail,
    ExportDetail,
  },
  data() {
    return {
      selectDepartmentData: [
        {
          orgCode: "123",
          orgName: "123",
        },
      ],
      selectTemplateData: [],
      dateValue: [],
      activeName: "first",
      procFactorData: [],
      procFactorDetail: {},
      procFactorRuleData: {
        tenantId: "1369559970221985794",
        procDefKey: "appConvertProc003",
        type: "TYPE_PROC_INDEX",
        rule: {
          flowEffic: {
            expect: 12.89,
            high: 68.18,
            middle: 14.28,
            low: 34.54,
            redLine: 16.15,
          },
          timeEffic: {
            expect: 26.57,
            high: 74.81,
            middle: 22.91,
            low: 28.85,
            redLine: 28.52,
          },
          personEffic: {
            expect: 96.29,
            high: 59.76,
            middle: 58.97,
            low: 8.27,
            redLine: 34.98,
          },
        },
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      listQuery: {
        templateTypesValue: "",
        procDefValue: "",
        startTime: null,
        endTime: null,
      },
    };
  },
  created() {
    this.getSelectTemplate();
    this.getProcDef();
    this.getProcFactor();
    this.getProcIndexRule();
  },
  methods: {
    handleButtonClick(target) {
      console.log(target, "target");
    },
    handleTabChange() {
      console.log("handleTabChange");
    },
    changeTime(time) {
      const end = new Date();
      if (time === "day") {
        const start = new Date();
        this.dateValue = [start, start];
      }
      if (time === "week") {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.dateValue = [start, end];
      }
      if (time == "month") {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.dateValue = [start, end];
      }
      if (time === "year") {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
        this.dateValue = [start, end];
      }
    },
    handleSearch() {
      this.getProcIndexRule();
      this.getProcFactor();
    },
    handleReset() {
      this.listQuery = {
        templateTypesValue: "",
        procDefValue: "",
      };
      this.dateValue = [];
      this.getProcIndexRule();
      this.getProcFactor();
    },
    datePick(value) {
      if (value == null) {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      } else {
        this.listQuery.startTime = value[0];
        this.listQuery.endTime = value[1];
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

      this.procFactorRuleData = data;
    },
    // 获取流效样本
    async getProcFactor() {
      const { data } = await fetchProcFactor({
        procDefKey: this.listQuery.procDefValue,
        tenantId: this.$store.state.user.tenantId,
        appKey: this.listQuery.templateTypesValue,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
      });

      this.procFactorDetail = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.example-container {
  font-size: 14px;
  line-height: 32px;
  height: 32px;
  margin-bottom: 24px;
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
</style>
