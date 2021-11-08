<template>
  <div class="card-container">
    <bread-text name="模块分析明细" />
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>归属部门</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.orgCode"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in selectDepartmentData"
                    :key="index"
                    :label="item.orgName"
                    :value="item.procDefKey"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>模板类别</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.appKey"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in selectTemplateData"
                    :key="index"
                    :label="`${item.appName} (${item.appKey})`"
                    :value="item.appKey"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="8">
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

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="模版类别">
        <template slot-scope="scope">
          <span
            style="color: #0F55FA; cursor: pointer"
            @click="
              textClick({
                source: scope.row.source,
                procDefKey: scope.row.procDefKey
              })
            "
            >{{ scope.row.appName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="平均超时">
        <template slot-scope="scope">
          {{ scope.row.processOverTime }}
        </template>
      </el-table-column>
      <el-table-column label="平均耗时">
        <template slot-scope="scope">
          {{ scope.row.personPassTime }}
        </template>
      </el-table-column>
      <el-table-column label="平均超时率">
        <template slot-scope="scope">
          {{ scope.row.finishRatio }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchSelectDepartment, fetchSelectTemplate } from "@/api/rule";
import { fetchList } from "@/api/module";
import Pagination from "@/components/Pagination";
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import rangeNumber from "@/utils/numberRange";

export default {
  components: { Pagination, FilterItem, BreadText },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      checkList: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
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
        condition: {
          extParam: {
            createOrgCode: this.listQuery.orgCode,
            appKey: this.listQuery.appKey,
            procDefName: this.listQuery.procDefName
          },
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "procDefDetailPage"
        }
      });
      this.total = totalCount;
      console.log(data, "listData");
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

    overTimeDeploy(row) {
      this.$router.push({
        name: "createRule",
        params: { id: row.procDefKey }
      });
    },
    textClick(query) {
      this.$router.push({
        name: "moduleFlow",
        query
      });
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
