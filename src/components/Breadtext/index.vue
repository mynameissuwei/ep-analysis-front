<template>
  <div>
    <div class="rectangle"></div>
    <div class="rect-text" :style="style">
      {{ name ? name : text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "style"],
  data() {
    return {
      text: "",
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      this.text = matched[matched.length - 1].meta.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.rectangle {
  width: 4px;
  height: 14px;
  background: #0780ed;
  display: inline-block;
  margin-right: 10px;
}
.rect-text {
  margin-bottom: 24px;
  display: inline-block;
}
</style>
