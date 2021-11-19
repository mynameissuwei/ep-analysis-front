<template>
  <div class="module">
    <div class="module-img" style="height: 309px">
      <div class="module-text" v-if="list.length">
        <div style="padding-bottom: 40px">AI模板智能分析诊断</div>
        <div style="padding-bottom: 20px">1、{{ list[0].defName }}</div>
        <div style="padding-bottom: 20px; padding-left: 20px">
          月度累计超 {{ list[0].totalCnt }} 次申请，其中超时率
          {{ toPercent(list[0].overRatio) }}，累计超时
          {{ getDuration(list[0].totalPassTime) }}，建议对该模板调整优化
        </div>
        <div style="padding-bottom: 20px">2、{{ list[1].defName }}</div>
        <div style="padding-bottom: 20px; padding-left: 20px">
          月度累计超 {{ list[1].totalCnt }} 次申请，其中超时率
          {{ toPercent(list[1].overRatio) }}，累计超时
          {{ getDuration(list[1].totalPassTime) }}，建议对该模板调整优化
        </div>
        <el-button type="primary" size="default" @click="viewMore"
          >查看更多</el-button
        >
      </div>
    </div>
    <div>
      <module-table />
    </div>
  </div>
</template>

<script>
import { fetchListMore } from "@/api/module";
import ModuleTable from "./components/ModuleTable";
import toPercent from "@/utils/toPercent";
import getDuration from "@/utils/getDuration";

export default {
  data() {
    return {
      list: [],
      getDuration,
      toPercent,
    };
  },
  components: { ModuleTable },
  created() {
    this.getList();
  },
  methods: {
    viewMore() {
      this.$router.push({
        name: "moduleMore",
      });
    },
    getList() {
      fetchListMore({
        condition: {
          sqlKey: "procAnalyMorePage",
          pageSize: 10,
          pageNo: 1,
        },
      }).then((response) => {
        const { data } = response;
        console.log(data, "listData");
        this.list = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.module-text {
  padding: 24px;
  position: absolute;
  color: white;
}
.module-img {
  border: 1px solid black;
  background-image: url("~@/assets/module.svg");
  background-size: cover;
}
</style>
