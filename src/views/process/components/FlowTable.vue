<template>
  <div class="card-container">
    <bread-text name="流程分析明细" />
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>归属部门</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.createOrgCode"
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
                    v-for="(item, key) in selectTemplateData"
                    :key="item.key"
                    :label="`${item.appName} (${item.appKey})`"
                    :value="item.appKey"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>发起人</span> </template>
              <template v-slot:right>
                <el-input
                  v-model="listQuery.startUserName"
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

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="app_name" label="模板名称"> </el-table-column>
      <el-table-column prop="start_user_name" label="发起人"> </el-table-column>
      <el-table-column prop="proc_pass_time" label="耗时总长" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_pass_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="task_part_num"
        label="审批参与人数"
        sortable
        width="150px"
      >
      </el-table-column>
      <el-table-column prop="proc_over_time" label="超时总长" sortable>
      </el-table-column>
      <el-table-column prop="start_time" label="发起时间" sortable>
      </el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <span>{{ scope.row.proc_over === 0 ? "未结束" : "结束" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_cost_time" label="最长耗时" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_cost_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_approve_user" label="最长耗时审批人">
      </el-table-column>
      <el-table-column prop="ratio" label="人均耗时" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.ratio) }}</span>
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
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import { fetchList } from "@/api/flow";
import { fetchSelectDepartment, fetchSelectTemplate } from "@/api/rule";
import Pagination from "@/components/Pagination";
import getDuration from "@/utils/getDuration";

export default {
  components: { Pagination, FilterItem, BreadText },
  data() {
    return {
      total: 0,
      list: null,
      listLoading: false,
      selectDepartmentData: [],
      selectTemplateData: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        createOrgCode: undefined,
        appKey: undefined,
        startUserName: undefined
      },
      getDuration
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
            createOrgCode: this.listQuery.createOrgCode,
            appKey: this.listQuery.appKey,
            startUserName: this.listQuery.startUserName
          },
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "procAnalyPage"
        }
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        createOrgCode: "",
        appKey: "",
        startUserName: ""
      };
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
