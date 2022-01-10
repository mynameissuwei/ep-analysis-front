<template>
  <div class="app-wrapper">
    <div class="fixed-header">
      <nav-bar productName="效能分析决策管理平台" />
    </div>
    <div class="app-main-container">
      <sidebar class="sidebar-container" />
      <div class="right-container">
        <div class="bread-container">
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Sidebar, AppMain } from "./components";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "Layout",
  components: {
    NavBar,
    Sidebar,
    AppMain,
    Breadcrumb,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
  width: 100%;
}

.app-main-container {
  @include clearfix;
  position: relative;
  min-height: calc(100vh - 48px);
  width: 100%;
}
.right-container {
  padding: 24px;
  background: #f4f4f4;
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
  top: 48px;
}
.bread-container {
  // margin-bottom: 14px;
}
</style>
