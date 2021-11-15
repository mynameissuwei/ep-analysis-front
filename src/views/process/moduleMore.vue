<template>
  <div class="module">
    <div class="module-img" style="height: 309px">
      <div class="module-text">
        AI模板智能分析诊断
      </div>
    </div>
    <div>
      <card-container>
        <div style="padding-left: 100px; padding-top: 40px" v-if="list.length">
          <div
            style="padding: 30px 30px"
            v-for="(item, index) in list"
            :key="index"
          >
            <div style="padding-bottom: 20px; color: #E2292C; cursor: pointer;">
              {{ index + 1 }} . {{ item.defName }}
            </div>
            <div style="padding-left: 25px">
              月度累计超 {{ item.totalCnt }} 次申请，其中超时率
              {{ toPercent(item.overRatio) }}，累计超时
              {{ getDuration(item.totalPassTime) }}，建议对该模板调整优化
            </div>
          </div>
          <pagination
            :total="total"
            :page.sync="listQuery.pageNo"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
        <el-empty :image-size="200" v-else></el-empty>
      </card-container>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { fetchListMore } from "@/api/module";
import CardContainer from "@/components/CardContainer";
import toPercent from "@/utils/toPercent";
import getDuration from "@/utils/getDuration";

export default {
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      getDuration,
      toPercent
    };
  },
  created() {
    this.getList();
  },
  components: { Pagination, CardContainer },
  methods: {
    getList() {
      this.listLoading = true;
      fetchListMore({
        condition: {
          sqlKey: "procAnalyMorePage",
          pageSize: this.listQuery.pageSize,
          pageNo: this.listQuery.pageNo
        }
      }).then(response => {
        const { data, totalCount } = response;
        console.log(data, "datadata");
        this.list = data;
        this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.module-img {
  border: 1px solid black;
  background-image: url("~@/assets/module.svg");
  background-size: cover;
}
.module-text {
  top: 131px;
  left: 105px;
  position: absolute;
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
}
</style>
