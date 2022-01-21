<template>
  <div class="components-container">
    <split-pane
      split="vertical"
      v-on:resize="resize"
      :min-percent="35"
      :default-percent="55"
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
import Bus from "@/Bus.js";

export default {
  name: "SplitpaneDemo",
  components: { splitPane },
  methods: {
    resize(val) {
      Bus.$emit("sendMsg", "这是要向外部发送的数据");
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
