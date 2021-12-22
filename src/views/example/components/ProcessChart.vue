<template>
  <el-card class="box-card">
    <div class="title">
      <span> {{ title }}</span>
      <el-tooltip placement="top" style="margin-left: 8px">
        <div slot="content">多行信息<br />第二行信息</div>
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
    <div class="container">
      <div>
        <div class="container-content">
          <div><zen-badge color="#52c41a" /> <span>增值</span></div>
          <div class="container-content-number">50%</div>
        </div>
        <div class="container-content">
          <div><zen-badge color="#52c41a" /> <span>增值</span></div>
          <div class="container-content-number">50%</div>
        </div>
        <div class="container-content">
          <div><zen-badge color="#52c41a" /> <span>增值</span></div>
          <div class="container-content-number">50%</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import ZenBadge from "@/components/ZenBadge";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    ZenBadge,
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  .title {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    line-height: 20px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    .container-content {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      .container-content-number {
        margin-left: 40px;
      }
    }
  }
}
</style>
