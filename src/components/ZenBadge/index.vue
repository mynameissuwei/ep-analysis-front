<template>
  <span
    class="ant-badge-status-dot ant-badge-status-success"
    :style="{ backgroundColor: color }"
  ></span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-badge-status-dot {
  position: relative;
  top: -1px;
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: middle;
  border-radius: 50%;
}
</style>
