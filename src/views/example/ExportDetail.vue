<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="活动名称">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped></style>
