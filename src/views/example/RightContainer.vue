<template>
  <div class="right-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
    </el-row>
    <el-row :gutter="20" class="center-row">
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
    </el-row>
    <el-row :gutter="20" class="bottomRow">
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.center-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.bottomRow {
  margin-top: 20px;
}
.right-container {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
