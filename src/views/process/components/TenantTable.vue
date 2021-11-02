<template>
  <div class="card-container">
    <bread-text name="平台租户统计"/>
    <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="tenantName" label="租户名称"></el-table-column>
      <el-table-column prop="bornTimestamp" label="开户时间"></el-table-column>
      <el-table-column prop="accountNum" sortable label="用户总数"></el-table-column>
      <el-table-column prop="templateNum" sortable label="模板总数"></el-table-column>
      <el-table-column prop="processNum" sortable label="流程总数"></el-table-column>
      <el-table-column prop="taskNum" sortable label="任务总数"></el-table-column>
    </el-table>
  </div>
</template>

<script>

import BreadText from "@/components/Breadtext";

export default {
  props: ["tableData", "listLoading"],
  components: {BreadText}
};
</script>

<style lang="scss" scoped></style>
