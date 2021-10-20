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
      @click="batchDeploy"
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
      <el-table-column label="模板名称">
        <template slot-scope="scope">
          <span>{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板代码">
        <template slot-scope="scope">
          {{ scope.row.orgCode }}
        </template>
      </el-table-column>
      <el-table-column label="归属部门">
        <template slot-scope="scope">
          {{ scope.row.orgName }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button @click="overTimeDeploy(scope.row)" type="text" size="small"
            >超时配置</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog title="批量配置" :visible.sync="dialogVisible" width="670px">
      <div class="diag-container">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="以模板平台内部配置规则计算"></el-checkbox>
          <el-checkbox label="不配置超时规则"></el-checkbox>
          <el-checkbox label="自定义超时规则"></el-checkbox>
        </el-checkbox-group>
        <div class="content">
          <span class="content-text">模板超时: </span>
          <span v-if="!isSelected">{{ value }}</span>
          <el-select v-else v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in this.rangeNumber"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <span
            v-if="!isSelected"
            class="actionStyle deployText"
            @click="isSelected = true"
            >配置</span
          >
          <span v-else>
            <span @click="isSelected = false" class="actionStyle ">保存</span>
            <span @click="isSelected = false" class="actionStyle ">取消</span>
          </span>
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
import {
  fetchList,
  fetchSelectDepartment,
  fetchSelectTemplate
} from "@/api/rule";
import Pagination from "@/components/Pagination";
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import rangeNumber from "@/utils/numberRange";

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
      dialogVisible: false,
      checkList: [],
      listQuery: {
        current: 1,
        size: 10,
        orgCode: undefined,
        appKey: undefined,
        procDefName: undefined
      },
      value: 0,
      selectDepartmentData: [],
      selectTemplateData: [],
      rangeNumber: rangeNumber(),
      isSelected: false
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
      const { data, totalCount } = await fetchList({
        condition: this.listQuery
      });
      this.total = totalCount;
      this.list = data;
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
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 10,
        orgCode: undefined,
        appKey: undefined,
        procDefName: undefined
      };
      this.getList();
    },
    handleCreate(row) {
      this.$router.push({
        name: "createUser",
        params: { getList: this.getList }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    overTimeDeploy(row) {
      this.$router.push({
        name: "createRule",
        params: { id: row.procDefKey }
      });
    },
    batchDeploy() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  display: block;
  margin-bottom: 22px;
}
.content {
  margin: 20px 0px;
}
.content-text {
  margin-right: 20px;
}
.content {
  .el-select {
    width: 100px;
    margin-right: 10px;
  }
}
.deployText {
  margin-left: 10px;
}
</style>
