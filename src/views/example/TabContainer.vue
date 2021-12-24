<template>
  <div class="components-container">
    <split-pane
      split="vertical"
      v-on:resize="resize"
      :min-percent="33"
      :default-percent="50"
    >
      <template slot="paneL">
        <slot name="left"></slot>
      </template>
      <template slot="paneR">
        <slot name="right"></slot>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";

export default {
  name: "SplitpaneDemo",
  components: { splitPane },
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
