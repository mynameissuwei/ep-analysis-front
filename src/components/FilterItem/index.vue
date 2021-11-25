<template>
  <el-row :gutter="5" class="filter-item">
    <el-col :span="6" class="leftContainer">
      <slot name="left"></slot>
    </el-col>
    <el-col :span="18">
      <slot name="right"></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "FilterItem",
};
</script>

<style lang="scss" scoped>
.leftContainer {
  padding-left: 15px !important;
}
</style>
