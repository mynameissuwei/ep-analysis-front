<template>
  <el-card class="box-card" shadow="never">
    <div class="title">
      <span> {{ title }}</span>
      <el-tooltip placement="top" style="margin-left: 8px">
        <div slot="content">
          <slot name="topTip"></slot>
        </div>
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>

    <div class="container">
      <div class="top-container">
        <div class="container-title">
          {{ content }}
        </div>
        <span class="container-day">{{ unit }}</span>
        <div class="container-content">
          <span class="container-content-text" style="font-size: 14px">{{
            text
          }}</span>
          <span style="font-size: 14px">{{ textData }}</span>
        </div>
      </div>

      <slot name="right"></slot>
    </div>

    <div class="bottom-container" v-if="showButton">
      <div>
        <div style="color: #999999">
          <span style="font-size: 12px">{{ expectText }}</span>
          <el-tooltip placement="top" style="margin-left: 8px">
            <div slot="content">
              <slot name="leftTip"></slot>
            </div>
            <i class="el-icon-warning-outline icon-class"></i>
          </el-tooltip>
        </div>
        <div style="margin-top: 5px; font-size: 12px">
          {{ isInit ? "--" : expect }}
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div>
        <div style="color: #999999">
          <span style="font-size: 12px">{{ redLineText }}</span>
          <el-tooltip placement="top" style="margin-left: 8px">
            <div slot="content">
              <slot name="rightTip"></slot>
            </div>
            <i class="el-icon-warning-outline icon-class"></i>
          </el-tooltip>
        </div>
        <div style="margin-top: 5px; font-size: 12px">
          {{ isInit ? "--" : redLine }}
        </div>
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
    expect: {
      type: String,
      default: "",
    },
    redLine: {
      type: String,
      default: "",
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    redLineText: {
      type: String,
      default: "",
    },
    expectText: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    topTip: {
      type: String,
      default: "",
    },
    isInit: {
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
      display: inline-block;
    }
    .container-day {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-left: 5px;
    }
    .container-content {
      font-weight: 500;
      color: #333333;
      position: relative;
      top: 10px;
      // margin-top: 20px;
      .container-content-text {
        color: #999999;
        margin-right: 3px;
      }
    }
  }

  .bottom-container {
    display: flex;
    justify-content: space-between;
    height: 55px;
    background: #f8f9fa;
    border-radius: 0px 0px 4px 4px;
    padding: 10px;
    margin-top: 10px;
  }
}
.el-divider--vertical {
  height: 2.5em;
}
.icon-class {
  font-size: 12px;
}
</style>
