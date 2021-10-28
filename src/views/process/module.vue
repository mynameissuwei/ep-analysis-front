<template>
  <div class="module">
    <div class="module-img" style="height: 309px">
      <div class="module-text">
        <div style="padding-bottom: 40px">AI模板智能分析诊断</div>
        <div style="padding-bottom: 20px">1、活动预算审批模板</div>
        <div style="padding-bottom: 20px;padding-left: 20px">
          月度累计超360次申请,期中超时率100%,累计超时2700小时,建议对该模板调整优化
        </div>
        <div style="padding-bottom: 20px">2、活动预算审批模板</div>
        <div style="padding-bottom: 20px; padding-left: 20px">
          月度累计超360次申请,期中超时率100%,累计超时2700小时,建议对该模板调整优化
        </div>
        <el-button type="primary" size="default" @click="viewMore"
          >查看更多</el-button
        >
      </div>
    </div>
    <div>
      <module-table />
    </div>
  </div>
</template>

<script>
import ModuleTable from "./components/ModuleTable";

export default {
  components: { ModuleTable },
  methods: {
    viewMore() {
      this.$router.push({
        name: "moduleMore"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.module-text {
  padding: 24px;
  position: absolute;
  color: white;
}
.module-img {
  border: 1px solid black;
  background-image: url("~@/assets/module.svg");
  background-size: cover;
}
</style>
