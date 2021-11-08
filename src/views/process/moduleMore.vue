<template>
  <div class="module">
    <div class="module-img" style="height: 309px">
      <div class="module-text">
        AI模板智能分析诊断
      </div>
    </div>
    <div>
      <card-container>
        <div style="padding-left: 350px; padding-top: 40px" v-if="list.length">
          <div
            style="padding: 30px 30px"
            v-for="(item, index) in list"
            :key="index"
          >
            <div style="padding-bottom: 20px; color: #E2292C; cursor: pointer;">
              {{ index }} . {{ item.defName }}
            </div>
            <div style="padding-left: 25px">
              {{ item.totalPassTime }}
            </div>
          </div>
          <pagination
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.size"
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

export default {
  data() {
    return {
      listLoading: false,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      }
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
        condition: { sqlKey: "procAnalyMoreList" }
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
