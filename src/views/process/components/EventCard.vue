<template>
  <div class="event-card">
    <div class="title">
      <span class="text">实时事件</span>
      <svg-icon icon-class="event" />
    </div>

    <el-table :data="events" height="250px" :show-header="false">
      <el-table-column prop="operateName" />
      <el-table-column prop="noticeText" label="通知内容">
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      :disabled="isShowOverLengthStringTip(scope.row.noticeText)"
                      :content="scope.row.noticeText"
                      placement="top-end">
            <span>{{showOverLengthStr(scope.row.noticeText)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="operateTime" label="操作时间"/>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  methods: {
    showOverLengthStr(text){
      if(text.length > 9){
        return text.substring(0,9)+"...";
      }
      return text;
    },
    isShowOverLengthStringTip(text){
      return text.length <= 9;
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
