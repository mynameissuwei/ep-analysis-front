<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <div class="card-template">
          <display-card
            :cardTitle="isNill(itemDetail.taskNum)"
            cardText="节点长度"
            svgText="overtime"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="getDuration(itemDetail.totalPassTime)"
            cardText="耗时总长"
            svgText="template"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="itemDetail.totalCnt"
            cardText="流程总数"
            svgText="flow"
          />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <div class="card-template">
          <display-card
            :cardTitle="getDuration(itemDetail.processPassTime)"
            cardText="平均耗时"
            svgText="timeConsume"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="toPercent(itemDetail.finishRatio)"
            cardText="完成率"
            svgText="complete"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="getDuration(itemDetail.totalOverTime)"
            cardText="超时总长"
            svgText="overtime"
          />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <div class="card-template">
          <display-card
            :cardTitle="itemDetail.partNum"
            cardText="审批总人数"
            svgText="people"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="getDuration(itemDetail.processOverTime)"
            cardText="平均超时"
            svgText="overtime"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="getDuration(itemDetail.personPassTime)"
            cardText="人均耗时"
            svgText="overtime"
          />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <div class="card-template">
          <display-card
            :cardTitle="toPercent(itemDetail.overRatio)"
            cardText="平均超时率"
            svgText="people"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DisplayCard from "@/components/DisplayCard";
import getDuration from "@/utils/getDuration";
import toPercent, { isNill } from "@/utils/toPercent";

export default {
  data() {
    return {
      getDuration,
      isNill,
      toPercent
    };
  },
  props: ["itemDetail"],
  components: {
    DisplayCard
  }
};
</script>

<style lang="scss" scoped>
.card-template {
  width: 157px;
  background: #f8f9fa;
  display: inline-block;
  margin: 24px 16px;
}
</style>
