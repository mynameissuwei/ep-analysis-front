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
      <el-table-column label="用户邮箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="用户登录名称">
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
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog title="配置角色" :visible.sync="dialogVisible" width="670px">
      <div class="diag-container">
        <div>
          <span>用户姓名:</span>
          <span class="text-right">{{ temp.nickname }}</span>
        </div>
        <div class="user-text">
          <span>用户账号:</span>
          <span class="text-right">{{ temp.accountId }}</span>
        </div>
        <div>
          <span>itcode:</span>
          <span class="text-right">{{ temp.loginName }}</span>
        </div>
        <div class="checkGroup">
          <div class="checkbox-left">选择角色:</div>
          <div class="checkbox-right">
            <el-checkbox-group v-model="checkedList">
              <el-checkbox
                v-for="item in tenantList"
                :label="item.roleId"
                :key="item.roleId"
                >{{ item.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit">
            确认
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchTenantList, deployRole } from "@/api/user";
import * as roleApi from "@/api/role";

import Pagination from "@/components/Pagination";
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";

export default {
  components: { Pagination, FilterItem, BreadText },
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
      checkedList: [],
      tenantList: [],
      temp: {}
    };
  },
  created() {
    this.getList();
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
    getCheckedTenantList(accountId) {
      fetchTenantList({ accountId }).then(response => {
        this.checkedList = response.data.map(item => item.roleId);
      });
    },
    getTenantList() {
      roleApi.fetchList({ page: 1, size: 10 }).then(response => {
        console.log(response, "response");
        roleApi.fetchList({ page: 1, size: response.data.total }).then(res => {
          this.tenantList = res.data.records;
        });
      });
    },
    handleDeploy(row) {
      this.temp = Object.assign({}, row);
      this.dialogVisible = true;
      this.getTenantList();
      this.getCheckedTenantList(this.temp.accountId);
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
    onSubmit() {
      const data = this.checkedList.map(item => ({
        roleId: item,
        accountId: this.temp.accountId
      }));

      deployRole(data).then(() => {
        this.getList();
        this.dialogVisible = false;
        this.$notify({
          title: "成功",
          message: "配置成功",
          type: "success",
          duration: 2000
        });
      });
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

<style lang="scss" scoped>
.user-text {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-checkbox {
  display: block;
}
.text-right {
  margin-left: 16px;
}
.checkGroup {
  margin-top: 41px;
  margin-bottom: 41px;
  display: inline-flex;
  width: 100%;
  .checkbox-right {
    margin-left: 15px;
    width: 491px;
    height: 196px;
    border-radius: 2px;
    border: 1px solid #e0e3e5;
    padding: 10px;
    overflow: auto;
  }
}
.el-checkbox-group {
  display: inline-block;
  margin-left: 16px;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
</style>
