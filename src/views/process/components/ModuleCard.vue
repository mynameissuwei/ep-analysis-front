<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <div class="card-template">
          <display-card
            :cardTitle="itemDetail.overtime"
            cardText="模板总数"
            svgText="overtime"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="1234"
            cardText="耗时总长"
            svgText="template"
          />
        </div>
        <div class="card-template">
          <display-card :cardTitle="1234" cardText="流程总数" svgText="flow" />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <div class="card-template">
          <display-card
            :cardTitle="itemDetail.timeConsume"
            cardText="平均耗时"
            svgText="timeConsume"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="itemDetail.finishRatio"
            cardText="完成率"
            svgText="complete"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="1234"
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
            :cardTitle="1234"
            cardText="审批总人数"
            svgText="people"
          />
        </div>
        <div class="card-template">
          <display-card
            :cardTitle="1234"
            cardText="平均超时"
            svgText="overtime"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DisplayCard from "@/components/DisplayCard";

export default {
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
