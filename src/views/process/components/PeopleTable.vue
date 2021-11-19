<template>
  <div class="card-container">
    <bread-text name="人效分析明细" />
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>姓名</span> </template>
              <template v-slot:right>
                <el-input
                  v-model="tableUserName"
                  placeholder="请输入"
                  size="normal"
                  clearable
                  @change="handleInput"
                ></el-input>
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
      <!-- right button -->
      <el-col :span="6">
        <div style="float: right">
          <el-button size="small" type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button
            size="small"
            style="margin-left: 10px"
            @click="handleReset"
          >
            重置
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="userName" label="姓名"> </el-table-column>
      <el-table-column prop="procDefNum" sortable label="审批模版数">
      </el-table-column>
      <el-table-column prop="taskNum" sortable label="审批任务数">
      </el-table-column>
      <el-table-column prop="passTime" sortable label="耗时总长">
        <template slot-scope="scope">
          {{ getDuration(scope.row.passTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="overTime" sortable label="超时总长">
        <template slot-scope="scope">
          {{ getDuration(scope.row.overTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="overNum" sortable label="超时次数">
      </el-table-column>
      <el-table-column prop="overRatio" sortable label="超时率">
        <template slot-scope="scope">
          {{ toPercent(scope.row.overRatio) }}
        </template>
      </el-table-column>
      <el-table-column prop="finishRatio" sortable label="任务积压率">
        <template slot-scope="scope">
          {{ toPercent(scope.row.finishRatio) }}
        </template>
      </el-table-column>
      <el-table-column prop="overRatio" sortable label="个人效率评分">
        <template slot-scope="scope">
          <span v-html="flowRate(scope.row.overRatio)"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import getDuration from "@/utils/getDuration";
import toPercent from "@/utils/toPercent";

export default {
  props: ["tableData", "listLoading", "handleSearch", "username"],
  components: { FilterItem, BreadText },
  data() {
    return {
      activeName: "first",
      listQuery: {
        title: "",
        limit: 20,
      },
      tableUserName: this.username,
      getDuration,
      toPercent,
    };
  },
  methods: {
    handleInput(value) {
      this.tableUserName = value;
      this.$emit("onEmitUsername", value);
    },
    handleReset() {
      this.tableUserName = "";
      this.$emit("onResetUsername", "");
    },
    flowRate(value, data) {
      console.log(value, "value");
      // let html = <i class="el-icon-star-on"></i>;
      if (0 <= value <= 20) {
        return '<div><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i></div>';
      } else if (21 <= value <= 40) {
        return '<div><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i></div>';
      } else if (41 <= value <= 60) {
        return '<div><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i></div>';
      } else if (61 <= value <= 90) {
        return '<div><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i></div>';
      } else if (81 <= value <= 100) {
        return '<div><i class="el-icon-star-on"></i></div>';
      } else {
        return "<div>无</div>";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
