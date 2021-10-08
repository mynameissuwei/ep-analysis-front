<template>
  <div class="people">
    <el-row :gutter="20" style="height:276px">
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            效率榜
          </div>
          <div class="card-body">
            <img src="@/assets/notRank.svg" alt="LOGO" class="img-people" />
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            劳模榜
          </div>
          <div class="card-body">
            <img src="@/assets/notRank.svg" alt="LOGO" class="img-people" />
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            催办榜
          </div>
          <div class="card-body">
            <img src="@/assets/notRank.svg" alt="LOGO" class="img-people" />
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            耗时榜
          </div>
          <div class="card-body">
            <img src="@/assets/notRank.svg" alt="LOGO" class="img-people" />
          </div>
        </card-container>
      </el-col>
    </el-row>
    <people-table />
  </div>
</template>

<script>
import BarChart from "./components/BarChart";
import CardContainer from "@/components/CardContainer";
import PeopleTable from "./components/PeopleTable.vue";
import { fetchList } from "@/api/people";

export default {
  components: { BarChart, CardContainer, PeopleTable },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = await fetchList(this.listQuery);
      console.log(data, "data");
    }
  }
};
</script>

<style lang="scss" scoped>
.people {
  .card-header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  .card-body {
    height: 100%;
    display: flex;
    height: calc(100% - 55px);
    align-items: center;
    justify-content: center;
  }
}
</style>
