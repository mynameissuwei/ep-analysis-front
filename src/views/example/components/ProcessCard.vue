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
      <div class="top-container">
        <div class="container-title">
          {{ content }}
        </div>
        <div class="container-content">
          <span class="container-content-text">{{ text }}</span>
          <span>{{ textData }}</span>
        </div>
      </div>

      <slot name="right"></slot>
    </div>

    <div class="bottom-container" v-if="showButton">
      <div>
        <div style="color: #999999">
          <span>流效期望</span>
          <el-tooltip placement="top" style="margin-left: 8px">
            <div slot="content">多行信息<br />第二行信息</div>
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
        </div>
        <div style="margin-top: 5px">>50%</div>
      </div>
      <div>
        <div style="color: #999999">
          <span>流效红线</span>
          <el-tooltip placement="top" style="margin-left: 8px">
            <div slot="content">多行信息<br />第二行信息</div>
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
        </div>
        <div style="margin-top: 5px">>10%</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    textData: {
      type: String,
      default: "",
    },

    showButton: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.warnClass {
  width: 30px;
  height: 30px;
}
.box-card {
  .title {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    line-height: 20px;
  }
  .container {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .container-title {
      // margin-top: 15px;
      font-size: 32px;
      font-weight: bold;
      color: #333333;
      font-family: DINAlternate-Bold, DINAlternate;
    }
    .container-content {
      font-weight: 500;
      color: #333333;
      .container-content-text {
        color: #999999;
        margin-right: 3px;
      }
    }
  }
  .bottom-container {
    display: flex;
    justify-content: space-between;
    height: 50px;
    background: #f8f9fa;
    border-radius: 0px 0px 4px 4px;
    padding: 10px;
    margin-top: 10px;
  }
}
</style>
