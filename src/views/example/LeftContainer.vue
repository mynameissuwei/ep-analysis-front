<template>
  <process-mining :dateValue="dateValue" :procDefKey="procDefKey"></process-mining>
</template>

<script>
import ProcessMining from "@/views/processMining/ProcessMining";

export default {
  components: {ProcessMining},
  props: ["dateValue", "procDefKey"]
};
</script>

<style lang="scss" scoped></style>
