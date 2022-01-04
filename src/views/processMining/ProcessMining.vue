<template>
  <div id="process_graph" class="ap-pd-process-model"/>
</template>

<script>
import PD from "@/api/processMining";
import {discoverProcess} from "@/api/process";

export default {
  name: "ProcessMining",
  props: ["dateValue", "procDefKey"],
  mounted() {
    this.init()
    this.go()
  },
  methods: {
    init() {
      this.pd = new PD('process_graph')
    },
    async go() {
      let data = {
        "startDate": "2021-12-17",
        "endDate": "2022-12-17",
        "procDefKey": "TQM_NCR_BILL_FAT_001"
      }
      const result = await discoverProcess(data)
      if (result.data.length > 0) {
        this.pd.loadLog(result.data, 3, false)
      }
    },
  }
}
</script>

<style scoped>
.ap-pd-process-model {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #666;
  background: #F8F9FA;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);
}

</style>
