<template>
  <div class="card-box" :style="{ height: height }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "100%",
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.08);
}
</style>
