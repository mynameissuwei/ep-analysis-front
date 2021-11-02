<template>
  <div class="numberCard">
    <div class="title">
      <span class="title-text"> {{title}}</span>
      <svg-icon icon-class="statistics" />
    </div>
    <el-row :gutter="10">
      <el-col :span="3" v-for="i in 8"
        ><div class="numberText"><div class="content">{{parseInt(num/(Math.pow(10, 8-i)) % 10)}}</div></div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    num: {
      type: Number,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>
.numberCard {
  padding: 16px;
  .title {
    margin-top: 10px;
    margin-bottom: 10px;
    display: inline-block;
    .title-text {
      margin-right: 10px;
    }
  }
  .numberText {
    background: #e6f3fe;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .numberText:after {
    content: "";
    display: block;
    margin-top: 100%;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
