<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>名称</span> </template>
              <template v-slot:right>
                <el-input v-model="listQuery.name" placeholder="搜索名称" />
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
      <!-- right button -->
      <el-col :span="6">
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
    <el-button
      size="small"
      type="primary"
      style="margin-bottom:16px"
      @click="handleCheckBoxDelete"
    >
      删除
    </el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="权限名称">
        <template slot-scope="scope">
          {{ scope.row.authName }}
        </template>
      </el-table-column>
      <el-table-column label="权限编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.authType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限描述">
        <template slot-scope="scope">
          {{ scope.row.authDesc }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.audit === "0" ? "下线" : "发布" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="{ row, $index }">
          <span class="actionStyle" @click="handleUpdate(row)">
            编辑
          </span>
          <span class="actionStyle" @click="handleDelete(row, $index)">
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, deleteList, fetchUpdateForm } from "@/api/permission";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import FilterItem from "@/components/FilterItem"; // secondary package based on el-pagination
import BreadText from "@/components/Breadtext";

export default {
  components: { Pagination, FilterItem, BreadText },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      listQuery: {
        name: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(res => {
        this.list = res.data;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleCreate() {
      this.$router.push({
        name: "createPermission",
        params: { id: undefined, getList: this.getList }
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "createPermission",
        params: { id: row.authId, getList: this.getList }
      });
    },
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        name: ""
      };
      this.multipleSelection = [];
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(row) {
      this.$confirm("你确定要删除该权限？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await deleteList([row.authId]);

        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    handleCheckBoxDelete() {
      this.$confirm("你确定要删除该权限？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const auIdarray = this.multipleSelection.map(item => item.authId);
        await deleteList(auIdarray);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  }
};
</script>
