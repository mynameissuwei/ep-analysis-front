<template>
  <el-row class="rowContainer" type="flex" justify="center" align="center">
    <el-col :span="6" class="rowItem rowIcon">
      <svg-icon :icon-class="svgText" />
    </el-col>
    <el-col :span="18" class="rowItem rowText">
      <div>
        <div class="cardTitle">{{ cardTitle }}</div>
        <div class="cardText">{{ cardText }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "DisplayCard",
  props: ["cardTitle", "cardText", "svgText"],
};
</script>

<style lang="scss" scoped>
.rowContainer {
  width: 100%;
  height: 126px;
  margin-bottom: 24px;
}
.rowIcon {
  margin-left: 20px;
}
.rowText {
  margin-right: 20px;
}
.rowItem {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cardTitle {
  text-align: center;
  margin-bottom: 14px;
  font-size: 28px;
  font-weight: 400;
  line-height: 40px;
}
.cardText {
  font-size: 14px;
  font-weight: 400;
  color: #343a40;
  text-align: center;
}
</style>
