<template>
  <div class="DashTemplate">
    <div class="title">
      <svg-icon icon-class="timeConsumeBlue" />
      <span class="title-text">模板流程</span>
    </div>
    <div class="content">
      <div>
        <div style="margin-bottom:10px">
          定义：即发起模板的数据，一个模板可以被多个复用
        </div>
        <div>
          公式: 模板耗时-结束时间-发起时间
        </div>
      </div>
      <div>
        <div style="margin-bottom:10px">
          维护时间：2021-09-14
        </div>
        <div>
          维护人：张鼎新
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.DashTemplate {
  border-bottom: 1px solid #eeeeee;
  margin-left: 74px;
  margin-right: 74px;
  .title {
    color: #0f55fa;
  }
  .title-text {
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
