<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row class="filter-container">
      <el-col :span="6">
        <el-input v-model="listQuery.name" placeholder="搜索名称" />
      </el-col>
      <el-col :span="18">
        <div style="float: right">
          <el-button size="small" type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button
            size="small"
            style="margin-left: 10px"
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
      style="margin-bottom: 16px"
      @click="handleCreate"
    >
      添加
    </el-button>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.audit === "0" ? "关闭" : "正常" }}
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色编码"> </el-table-column>
      <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="{ row, $index }">
          <span class="actionStyle" @click="handleUpdate(row)"> 编辑 </span>
          <span class="actionStyle" @click="handleDelete(row, $index)">
            删除
          </span>
          <!-- <span class="actionStyle" @click="handleDeploy(row, $index)">
            权限配置
          </span> -->
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

    <!-- <dialog-form :dialogVisible="dialogVisible" :temp="temp" /> -->
  </div>
</template>

<script>
import { fetchList, deleteList } from "@/api/role";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import FilterItem from "@/components/FilterItem"; // secondary package based on el-pagination
import BreadText from "@/components/Breadtext";
import DialogForm from "./dialog";

export default {
  components: { Pagination, FilterItem, BreadText, DialogForm },
  created() {
    this.getList();
  },
  data() {
    return {
      list: [{ id: 1 }],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        name: "",
      },
      dialogVisible: false,
      temp: {},
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;

        // Just to simulate the time of the request
      });
    },
    handleSearch() {
      this.getList();
    },
    handleDeploy() {
      this.dialogVisible = true;
      this.temp = Object.assign({}, row);

      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleCreate() {
      this.$router.push({
        name: "createRole",
        params: {
          id: undefined,
          getList: this.getList,
          dialogStatus: "create",
        },
      });
    },
    handleDelete(row) {
      this.$confirm("你确定要删除该角色？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleteList([row.roleId]);
        await this.getList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "createRole",
        params: {
          id: row.roleId,
          getList: this.getList,
          row,
          dialogStatus: "edit",
        },
      });
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        size: 10,
        name: "",
      };
      this.getList();
    },
  },
};
</script>
