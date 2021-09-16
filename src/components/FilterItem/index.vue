<template>
  <el-row :gutter="5" class="filter-item">
    <el-col :span="5">
      <slot name="left"></slot>
    </el-col>
    <el-col :span="19">
      <slot name="right"></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "FilterItem"
};
</script>

<style lang="scss" scoped></style>
