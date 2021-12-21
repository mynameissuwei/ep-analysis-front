<template>
  <div class="components-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <left-container />
      </template>
      <template slot="paneR">
        <right-container />
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";
import LeftContainer from "./LeftContainer";
import rightContainer from "./RightContainer";

export default {
  name: "SplitpaneDemo",
  components: { splitPane, rightContainer, LeftContainer },
  methods: {
    resize() {
      console.log("resize");
    },
  },
};
</script>

<style scoped>
.components-container {
  position: relative;
  height: calc(100vh - 420px);
}
</style>
