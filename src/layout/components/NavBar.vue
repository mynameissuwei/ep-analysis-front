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
      <div class="logout-pop" style="cursor: pointer" @click="logout">退出</div>
      <div class="right-content" slot="reference">
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          class="user-avatar"
        />
        <div class="user-name">{{ this.$store.state.user.nickName }}</div>
        <i class="el-icon-caret-bottom" />
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
  components: {},
  methods: {
    logout() {
      console.log("logout ",process.env.VUE_APP_ACCESS_URL);
      this.authSdk.logout(process.env.VUE_APP_ACCESS_URL);
    }
  }
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
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
