<template>
  <div class="wscn-http404-container">
    <img class="pic-404__parent" src="@/assets/noPermission.svg" alt="404" />
    <div class="textContainer">
      <div class="bullshit__headline">{{ message }}</div>
    </div>
    <div class="buttonContainer">
      <span @click="handleSkip" class="bullshit__return-home">返回首页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  computed: {
    message() {
      return "您暂无该菜单权限，请联系管理员";
    },
  },
  methods: {
    handleSkip() {
      this.$router.push({
        path: "/dashboard",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.bullshit__return-home {
  margin-top: 58px;
  display: block;
  width: 110px;
  height: 36px;
  background: #0f55fa;
  border-radius: 100px;
  text-align: center;
  font-size: 14px;
  line-height: 36px;
  cursor: pointer;
  color: #fff;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}
.buttonContainer {
  display: flex;
  justify-content: center;
}
.textContainer {
  display: flex;
  justify-content: center;
}
</style>
