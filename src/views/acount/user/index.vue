<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="6">
        <el-input
          v-model="listQuery.keyword"
          placeholder="输入用户名/手机号/邮箱地址搜索"
        />
      </el-col>
      <!-- right button -->
      <el-col :span="18">
        <div style="float: right">
          <el-button size="small" type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button
            size="small"
            style="margin-left: 10px;"
            @click="handleReset"
          >
            重置
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-button
      size="small"
      type="primary"
      style="margin-bottom:16px"
      @click="handleCreate"
    >
      添加
    </el-button>

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
      <el-table-column label="用户邮件">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="用户登陆名称">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button @click="handleDeploy(row, $index)" type="text" size="small"
            >配置角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <dialog-form :dialogVisible="dialogVisible" :temp="temp" />
  </div>
</template>

<script>
import { fetchList } from "@/api/user";
import Pagination from "@/components/Pagination";
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import DialogForm from "./dialog";

export default {
  components: { Pagination, FilterItem, BreadText, DialogForm },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 10,
        keyword: ""
      },
      dialogVisible: false,
      dialogStatus: "create",
      temp: {}
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        const {
          data: { records, total }
        } = response;
        this.list = records;
        this.total = total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleDeploy(row) {
      console.log("deploy");
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        size: 10,
        keyword: ""
      };
      this.getList();
    },
    handleCreate() {
      this.$router.push({
        name: "createUser",
        params: { getList: this.getList }
      });
    }
  }
};
</script>
