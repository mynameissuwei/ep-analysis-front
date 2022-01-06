<template>
  <div id="process_graph_iframe" class="ap-pd-process-model"/>
</template>

<script>
import PD from "@/api/processMining";
import {discoverProcess} from "@/api/process";

export default {
  name: "ProcessMiningIframe",
  props: ["dateValue", "procDefKey"],
  mounted() {
    this.init()
    this.go()
  },
  methods: {
    init() {
      this.pd = new PD('process_graph_iframe')
    },
    getParam(key){
      let paramStr = window.location.href.split("?")[1];
      return new URLSearchParams(paramStr).get(key);
    },
    async go() {
      let data = {
        "startDate": this.getParam("startDate"),
        "endDate": this.getParam("endDate"),
        "procDefKey": this.getParam("procDefKey")
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
