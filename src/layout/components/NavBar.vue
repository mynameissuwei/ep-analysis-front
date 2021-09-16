<template>
  <div class="common-header">
    <div class="left-content">
      <img src="@/assets/logo.png" alt="LOGO" width="100" />
      <el-divider direction="vertical"></el-divider>
      <!-- <span class="logo">LOGO</span> -->
      <div v-if="productName || companyName" class="page-title">
        <span v-if="productName">{{ productName }}</span>
        <span v-if="productName && companyName"> - </span>
        <span v-if="companyName">{{ companyName }}</span>
      </div>
    </div>
    <div class="center-content">
      <slot name="centerContent"></slot>
    </div>
    <el-popover placement="bottom">
      <div class="logout-pop" style="cursor: pointer">退出</div>
      <div class="right-content" slot="reference">
        <div class="user-name">名字名字名字名字</div>
        <img :src="arrow_down" class="arrow-down" />
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  props: {
    productName: String,
    companyName: String
  },
  components: {}
};
</script>

<style scoped>
.common-header {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.left-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-content {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.page-title {
  margin-left: 21px;
  position: relative;
}
.user-name {
  margin: 0 5px 0 10px;
  max-width: 72px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
