<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.app-main {
  /* background: #fff; */
  border-radius: 4px;
  min-height: calc(100vh - 180px);
  width: 100%;
  position: relative;
  display: inline-block;
  overflow: hidden;
}
</style>
