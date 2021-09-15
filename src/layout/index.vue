<template>
  <div>
    <nav-bar productName="suwei" companyName="suwei" />
    <div class="main-container">
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
.right-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 24px;
  background: #f4f5f9;
}

.bread-container {
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 14px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.app-main-container {
  box-shadow: 0 2px 6px 0 rgb(0 0 0);
  background: #fff;
  border-radius: 4px;
}
</style>
