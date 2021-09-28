<template>
  <div class="displayCard">
    <div class="left">
      <svg-icon :icon-class="svgText" />
    </div>
    <div class="right">
      <div class="cardTitle">{{ cardTitle }}</div>
      <div class="cardText">{{ cardText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayCard",
  props: ["cardTitle", "cardText", "svgText"]
};
</script>

<style lang="scss" scoped>
.displayCard {
  width: 100%;
  height: 126px;
  // background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
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
}
.left {
  height: 70px;
  margin-right: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.right {
  display: inline-block;
}
</style>
