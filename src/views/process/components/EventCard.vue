<template>
  <div class="event-card">
    <div class="title">
      <span class="text">实时事件</span>
      <svg-icon icon-class="event" />
    </div>
    <el-row :gutter="20" justify="space-between" class="textEvent">
      <el-col :span="4"><span>张三</span> </el-col>
      <el-col :span="12"><span>发起：请假审批模板</span> </el-col>
      <el-col :span="8" style="text-align:right"><span>12:13 李</span> </el-col>
    </el-row>
    <el-row :gutter="20" justify="space-between" class="textEvent">
      <el-col :span="4"><span>张三</span> </el-col>
      <el-col :span="12"><span>发起：请假审批模板</span> </el-col>
      <el-col :span="8" style="text-align:right"><span>12:13 李</span> </el-col>
    </el-row>
    <el-row :gutter="20" justify="space-between" class="textEvent">
      <el-col :span="4"><span>张三</span> </el-col>
      <el-col :span="12"><span>发起：请假审批模板</span> </el-col>
      <el-col :span="8" style="text-align:right"><span>12:13 李</span> </el-col>
    </el-row>
    <el-row :gutter="20" justify="space-between" class="textEvent">
      <el-col :span="4"><span>张三</span> </el-col>
      <el-col :span="12"><span>发起：请假审批模板</span> </el-col>
      <el-col :span="8" style="text-align:right"><span>12:13 李</span> </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.event-card {
  margin-top: 36px;
  padding-left: 24px;
  padding-right: 24px;
  .title {
    margin-bottom: 24px;
    .text {
      margin-right: 10px;
    }
  }
  .textEvent {
    margin-bottom: 40px;
  }
}
</style>
