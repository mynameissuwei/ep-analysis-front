<template>
  <div class="app-wrapper">
    <div class="fixed-header">
      <nav-bar productName="效能分析决策管理平台" />
    </div>
    <div>
      <sidebar class="sidebar-container" />
      <div class="right-container">
        <div class="bread-container">
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <div class="app-main-container">
          <app-main />
        </div>
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
    Breadcrumb
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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

.bread-container {
  margin-bottom: 14px;
}

.app-main-container {
  background: #fff;
  border-radius: 4px;
}
</style>
