<template>
  <div class="dashBoard">
    <div class="img-container">
      <span class="img-title">效能词典</span>
      <el-input
        class="img-input"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2"
        width="220px"
      >
      </el-input>
      <img src="@/assets/energy.svg" alt="LOGO" style="height: 308px" />
    </div>
    <div class="dict-container">
      <el-tabs tab-position="left" style="height: 416px;">
        <el-tab-pane label="指标">
          <dash-template />
        </el-tab-pane>
        <el-tab-pane label="非指标">
          <dash-template />
        </el-tab-pane>
      </el-tabs>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import DashTemplate from "./components/DashTemplate";
import { fetchList } from "@/api/task";

export default {
  components: { Pagination, DashTemplate },
  data() {
    return {
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashBoard {
  background: #ffffff;
  .img-container {
    position: relative;
    clear: both;
    .img-title {
      color: #ffffff;
      font-weight: bold;
      font-size: 36px;
      position: absolute;
      z-index: 100;
      top: 48%;
      left: 6%;
      font-family: PingFang-SC-Bold, PingFang-SC;
    }
    .img-input {
      position: absolute;
      bottom: 5%;
      right: 1%;
      z-index: 100;
    }
  }
  .dict-container {
    margin-left: 101px;
    margin-top: 56px;
    margin-bottom: 75px;
    margin-right: 150px;
  }
  .el-input {
    width: 220px;
  }
  ::v-deep .el-tabs__header {
    width: 297px;
    height: 416px;
    background: #f8f9fa;
    .el-tabs__item {
      text-align: center;
    }
    .is-active {
      background: #0f55fa;
      color: #fff;
    }
  }
}
</style>
