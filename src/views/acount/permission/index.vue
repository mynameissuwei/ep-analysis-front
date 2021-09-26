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
                <el-input v-model="listQuery.title" placeholder="搜索名称" />
              </template>
            </filter-item>
          </el-col>
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>状态</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.title"
                  placeholder="搜索状态"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
      <!-- right button -->
      <el-col :span="6">
        <div style="float: right">
          <el-button size="small" type="primary" @click="handleFilter">
            查询
          </el-button>
          <el-button
            size="small"
            style="margin-left: 10px;"
            @click="handleCreate"
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
      @click="handleFilter"
    >
      删除
    </el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
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
          {{ scope.row.audit === "0" ? "关闭" : "正常" }}
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
import { fetchList, deleteList } from "@/api/permission";
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
      total: 0,
      listLoading: true,
      selectOptions: [
        {
          value: "1",
          name: "正常"
        },
        {
          value: "0",
          name: "关闭"
        }
      ],
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
        console.log(response, "response");
        this.list = response.data;
        this.total = response.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleCreate() {
      this.$router.push("/acount/permission/create");
    },
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteList([row.autId, row.appId]);
          this.list1.splice(index, 1);

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
