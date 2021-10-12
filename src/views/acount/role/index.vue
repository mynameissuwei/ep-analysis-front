<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row class="filter-container">
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
          <el-col :span="10">
            <filter-item>
              <template v-slot:left> <span>创建时间</span> </template>
              <template v-slot:right>
                <el-date-picker
                  v-model="dateValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
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

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.audit === "0" ? "关闭" : "正常" }}
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="{ row, $index }">
          <span class="actionStyle" @click="handleUpdate(row)">
            修改
          </span>
          <span class="actionStyle" @click="handleDelete(row, $index)">
            删除
          </span>
          <span class="actionStyle" @click="handleDeploy(row, $index)">
            权限配置
          </span>
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

    <dialog-form :dialogVisible="dialogVisible" />
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        name: "",
        createTimeStart: "",
        createTimeEnd: ""
      },
      dialogVisible: false,
      dateValue: ""
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        console.log(response, "response");
        this.list = response.data.records;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleSearch() {
      this.listQuery.createTimeStart = this.dateValue[0];
      this.listQuery.createTimeEnd = this.dateValue[1];
      this.getList();
    },
    handleDeploy() {
      this.dialogStatus = "update";
      this.dialogVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleCreate() {
      this.$router.push({
        name: "createRole",
        params: { id: undefined, getList: this.getList }
      });
    },
    handleDelete(row) {
      this.$confirm("你确定要删除该角色？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await deleteList([row.roleId]);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "createRole",
        params: { id: row.roleId, getList: this.getList }
      });
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        size: 10,
        name: ""
      };
      this.dateValue = "";
      this.getList();
    }
  }
};
</script>
