<template>
  <div class="DashTemplate">
    <div class="title">
      <!-- <svg-icon icon-class="timeConsumeBlue" /> -->
      <img :src="indicator" class="ops-card-img" alt="" />
      <span class="title-text">{{ data.name }}</span>
    </div>
    <div class="content">
      <div>
        <div style="margin-bottom:10px">
          <span class="text-title">定义:</span>
          <span> {{ data.definition ? data.definition : "无" }} </span>
        </div>
        <div>
          <span class="text-title">公式:</span>
          <span>{{ data.formula ? data.formula : "无" }}</span>
        </div>
      </div>
      <div>
        <div style="margin-bottom:10px">
          <span class="text-title">创建时间：</span>
          <span>{{ data.updateTime ? data.updateTime : "无" }}</span>
        </div>
        <div>
          <span class="text-title">维护人：</span>
          <span>{{ data.maintainer ? data.maintainer : "无" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indicator from "@/assets/indicator.svg";

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      indicator
    };
  }
};
</script>

<style lang="scss" scoped>
.DashTemplate {
  border-bottom: 1px solid #eeeeee;
  margin-left: 74px;
  margin-right: 74px;
  margin-top: 30px;
  margin-bottom: 30px;
  .text-title {
    margin-right: 10px;
  }
  .title {
    color: #0f55fa;
  }
  .ops-card-img {
    position: relative;
    top: 2px;
  }
  .title-text {
    // height: 20px;
    // line-height: 20px;
    // display: inline-block;
    margin-left: 15px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 16px;
  }
}
</style>
