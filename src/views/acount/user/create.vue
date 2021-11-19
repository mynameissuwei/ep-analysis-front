<template>
  <el-container>
    <el-container class="app-container">
      <el-main>
        <bread-text name="添加用户"> </bread-text>
        <el-row class="filter-container">
          <el-col :span="12">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
              <template slot-scope="{ item }">
                <div class="name">
                  <span class="accountText">用户ID: {{ item.accountId }}</span>
                  <span>用户名称: {{ item.nickname }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-col>
        </el-row>

        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          fit
          highlight-current-row
        >
          <el-table-column label="用户ID">
            <template slot-scope="scope">
              <span>{{ scope.row.accountId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户电话">
            <template slot-scope="scope">
              {{ scope.row.mobile }}
            </template>
          </el-table-column>
          <el-table-column label="用户登录名称">
            <template slot-scope="scope">
              {{ scope.row.loginName }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="230">
            <template slot-scope="{ row, $index }">
              <span class="actionStyle" @click="handleDelete(row, $index)">
                删除
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-footer class="footerContainer">
      <div>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import TabPane from "./components/TabPane";
import BreadText from "@/components/Breadtext";
import { fetchCenterList, createList } from "@/api/user";
import Pagination from "@/components/Pagination";

export default {
  components: { TabPane, BreadText, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 10,
        keyword: "",
      },
      restaurants: [],
      state: "",
      timeout: null,
    };
  },

  methods: {
    onSubmit() {
      const data = this.list.map((item) => item.accountId);
      createList({
        accountIds: data,
      }).then(() => {
        this.$router.push("/acount/user");
        this.$route.params.getList();
        this.$message({
          type: "success",
          message: "创建成功!",
        });
      });
    },
    onCancel() {
      this.$router.push("/acount/user");
    },
    loadAll() {
      fetchCenterList(this.listQuery).then((response) => {
        const {
          data: { records },
        } = response;
        this.restaurants = records;
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      let array = this.list;
      array.push(item);
      this.list = array;
    },
    handleDelete(row, index) {
      let array = this.list;
      array.splice(index, 1);
      this.list = array;
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped>
.el-autocomplete {
  display: block;
}
.accountText {
  margin-right: 20px;
}
.el-container {
  min-height: calc(100vh - 240px);
}
</style>
