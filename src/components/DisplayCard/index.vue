<template>
  <div class="displayCard">
    <div>
      <div class="cardTitle">{{ cardTitle }}</div>
      <div class="cardText">{{ cardText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayCard",
  props: {
    cardTitle: String,
    cardText: String
  }
};
</script>

<style lang="scss" scoped>
.displayCard {
  width: 100%;
  height: 126px;
  background: #f8f9fa;
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
</style>
