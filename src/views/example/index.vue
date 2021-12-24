<template>
  <div>
    <div class="card-container" style="height: 136px">
      <el-row
        :gutter="22"
        class="filter-container example-container"
        type="flex"
        justify="space-between"
      >
        <el-col :span="7">
          <el-row :gutter="5">
            <el-col :span="6">
              <span>选择组织</span>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="listQuery.createOrgCode"
                clearable
                placeholder="请选择"
                class="my-el-select"
              >
                <el-option
                  v-for="item in selectDepartmentData"
                  :key="item.orgCode"
                  :label="item.orgName"
                  :value="item.orgCode"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row :gutter="5">
            <el-col :span="6">
              <span>选择租户</span>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="listQuery.createOrgCode"
                clearable
                placeholder="请选择"
                class="my-el-select"
              >
                <el-option
                  v-for="item in selectDepartmentData"
                  :key="item.orgCode"
                  :label="item.orgName"
                  :value="item.orgCode"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row :gutter="5">
            <el-col :span="8">
              <span>选择流程类型（租户）</span>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="listQuery.createOrgCode"
                clearable
                placeholder="请选择"
                class="my-el-select"
              >
                <el-option
                  v-for="item in selectDepartmentData"
                  :key="item.orgCode"
                  :label="item.orgName"
                  :value="item.orgCode"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        :gutter="22"
        class="filter-container example-container"
        type="flex"
        justify="space-between"
      >
        <el-col :span="7">
          <el-row :gutter="5">
            <el-col :span="6">
              <span>选择流程</span>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="listQuery.createOrgCode"
                clearable
                placeholder="请选择"
                class="my-el-select"
              >
                <el-option
                  v-for="item in selectDepartmentData"
                  :key="item.orgCode"
                  :label="item.orgName"
                  :value="item.orgCode"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14">
          <el-button class="button-container">今日</el-button>
          <el-button class="button-container">本周</el-button>
          <el-button class="button-container">本月</el-button>
          <el-button class="button-container">全年</el-button>
          <el-date-picker
            class="date-container"
            size="small"
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <div style="float: right">
            <el-button type="primary" size="small">查询</el-button>
            <el-button size="small">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="tab-container" style="position: relative">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="流程指数" name="first">
          <tab-container>
            <template v-slot:left> <left-container /> </template>
            <template v-slot:right> <right-container /> </template>
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
      dateValue: "",
      activeName: "second",
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        createOrgCode: undefined,
        appKey: undefined,
        startUserName: undefined,
      },
    };
  },
  methods: {
    handleClick() {
      console.log("click");
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
