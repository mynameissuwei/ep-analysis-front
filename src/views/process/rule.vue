<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>归属部门</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.orgCode"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in selectDepartmentData"
                    :key="item.orgCode"
                    :label="item.orgName"
                    :value="item.orgCode"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>模板类别</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.appKey"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in selectTemplateData"
                    :key="item.appKey"
                    :label="item.appName"
                    :value="item.appKey"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="6">
            <filter-item>
              <template v-slot:left> <span>模板名称</span> </template>
              <template v-slot:right>
                <el-input
                  v-model="listQuery.procDefName"
                  placeholder="请输入"
                />
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
      <!-- right button -->
      <el-col :span="6">
        <div style="float: right">
          <el-button size="small" type="primary">
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
      批量配置
    </el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="Display_time">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small"
            >配置角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  fetchList,
  fetchSelectDepartment,
  fetchSelectTemplate
} from "@/api/rule";
import Pagination from "@/components/Pagination";
import FilterItem from "@/components/FilterItem";
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
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        orgCode: undefined,
        appKey: undefined,
        procDefName: undefined
      },
      selectDepartmentData: [],
      selectTemplateData: []
    };
  },
  created() {
    this.getList();
    this.getSelectDepartment();
    this.getSelectTemplate();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = await fetchList(this.listQuery);
      this.total = "";
      this.list = "";
      this.listLoading = false;
    },
    async getSelectDepartment() {
      const { data } = await fetchSelectDepartment();
      this.selectDepartmentData = data;
    },
    async getSelectTemplate() {
      const { data } = await fetchSelectTemplate();
      this.selectTemplateData = data;
    },
    handleCreate() {
      this.$router.push("/acount/user/create");
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    }
  }
};
</script>
