<template>
  <div class="dashBoard">
    <div class="img-container">
      <div class="module-img" style="height: 204px">
        <span class="img-title">效能词典</span>
        <el-input
          class="img-input"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="listQuery.keyword"
          width="220px"
          @change="handleSearch"
        >
        </el-input>
      </div>

      <!-- <img src="@/assets/energy.svg" alt="LOGO" style="height: 308px" /> -->
    </div>
    <div class="dict-container">
      <el-tabs v-model="activeName" tab-position="left" style="height: 416px;">
        <el-tab-pane
          v-for="item in tabMapOptions"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        >
          <keep-alive>
            <div v-if="activeName == item.key">
              <dash-template
                :data="every"
                v-for="every in list"
                :key="every.id"
              />
            </div>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>

      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import DashTemplate from "./components/DashTemplate";
import { fetchList, createList, deleteList } from "@/api/dashboard";

export default {
  components: { Pagination, DashTemplate },
  data() {
    return {
      listLoading: false,
      total: 10,
      list: [],
      listQuery: {
        page: 1,
        size: 10,
        keyword: ""
      },
      tabMapOptions: [
        { label: "指标", key: "indicator" },
        { label: "非指标", key: "other" }
      ],
      activeName: "indicator"
    };
  },
  created() {
    this.getList();
  },
  watch: {
    activeName(val) {
      fetchList({
        ...this.listQuery,
        type: this.activeName === "indicator" ? 0 : 1
      }).then(response => {
        this.list = response.data.records;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList({
        ...this.listQuery,
        type: this.activeName === "indicator" ? 0 : 1
      }).then(response => {
        this.list = response.data.records;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleSearch() {
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.dashBoard {
  .module-img {
    border: 1px solid black;
    background-image: url("~@/assets/energy.svg");
    background-size: cover;
  }
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
    margin-left: 24px;
    margin-top: 24px;
    margin-bottom: 75px;
    margin-right: 150px;
  }
  .el-input {
    width: 220px;
  }
  ::v-deep .el-tabs__header {
    width: 138px;
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
  ::v-deep .el-tabs__content {
    overflow: auto;
    height: 416px;
  }
}
</style>
