<template>
  <div class="event-card">
    <div class="title">
      <span class="text">实时事件</span>
      <svg-icon icon-class="event" />
    </div>
    <el-row v-for="event in events" :gutter="20" justify="space-between" class="textEvent">
      <el-col :span="4"><span>{{event.operateName}}</span> </el-col>
      <el-col :span="12"><span>{{event.noticeType}}: {{event.processName}}</span> </el-col>
      <el-col :span="8" style="text-align:right"><span>{{event.operateTime}}</span> </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  }
};
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
