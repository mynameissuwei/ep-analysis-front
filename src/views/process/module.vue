<template>
  <div class="module">
    <div class="module-container">
      <div class="module-text" v-if="list.length">
        <div>
          <div style="padding-bottom: 40px">AI模板智能分析诊断</div>
          <div style="padding-bottom: 20px">1、{{ list[0].defName }}</div>
          <div style="padding-bottom: 20px; padding-left: 20px">
            月度累计超 {{ list[0].totalCnt }} 次申请，其中超时率
            {{ toPercent(list[0].overRatio) }}，人均耗时
            {{ getDuration(list[0].avgPassTimePerson) }} 小时，平均耗时
            {{
              getDuration(list[0].avgPassTimeProc)
            }}
            小时，建议对该模板调整优化
          </div>
        </div>
        <el-button type="primary" size="default" @click="viewMore"
          >查看更多</el-button
        >
      </div>
      <img src="@/assets/module.svg" class="module-img" alt="" />
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
        console.log(data[0], "listData");
        this.list = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.module-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 100%;
  .module-text {
    padding: 24px;
    position: absolute;
    color: white;
  }
  .module-img {
    width: 100%;
    height: 100%;
  }
}
</style>
