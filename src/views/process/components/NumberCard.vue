<template>
  <div class="numberCard">
    <div class="title">流程总数实时统计</div>
    <el-row :gutter="10">
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
      <el-col :span="3"><div class="numberText">2</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.numberCard {
  background: #f8f9fa;
  height: 126px;
  padding: 16px;
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .numberText {
    height: 53px;
    background: #e6f3fe;
    border: 1px solid #b8d8fd;
    text-align: center;
    line-height: 53px;
  }
}
</style>
