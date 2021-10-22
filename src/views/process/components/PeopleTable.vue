<template>
  <div class="card-container">
    <bread-text name="人效分析明细" />
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>名称</span> </template>
              <template v-slot:right>
                <el-input
                  v-model="tableUserName"
                  placeholder="搜索名称"
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
            style="margin-left: 10px;"
            @click="handleReset"
          >
            重置
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="userName" label="姓名"> </el-table-column>
      <el-table-column prop="userId" label="用户id"> </el-table-column>
      <el-table-column prop="procDefNum" sortable label="审批模版数">
      </el-table-column>
      <el-table-column prop="overTime" sortable label="超时总长">
      </el-table-column>
      <el-table-column prop="passTime" sortable label="耗时总长">
      </el-table-column>
      <el-table-column prop="overRatio" sortable label="超时率">
      </el-table-column>
      <el-table-column prop="overNum" sortable label="超时次数">
      </el-table-column>
      <el-table-column prop="taskNum" sortable label="审批任务数">
      </el-table-column>
      <el-table-column prop="finishRatio" sortable label="任务积压率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";

export default {
  props: ["tableData", "listLoading", "handleSearch", "username"],
  components: { FilterItem, BreadText },
  data() {
    return {
      activeName: "first",
      listQuery: {
        title: "",
        limit: 20
      },
      tableUserName: this.username
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
