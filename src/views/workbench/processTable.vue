<template>
  <div class="card-container">
    <bread-text name="流程分析明细" />

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column prop="app_name" label="模板名称"> </el-table-column>
      <el-table-column prop="start_user_name" label="发起人"> </el-table-column>
      <el-table-column prop="proc_pass_time" label="耗时总长(小时)" sortable>
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
      <el-table-column prop="proc_over_time" label="超时总长(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_over_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="发起时间" sortable>
      </el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <span>{{ scope.row.proc_over === 0 ? "未结束" : "结束" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_cost_time" label="最长耗时(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_cost_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_approve_user" label="最长耗时审批人">
      </el-table-column>
      <el-table-column prop="ratio" label="人均耗时(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.ratio) }}</span>
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
  </div>
</template>

<script>
import { fetchList } from "@/api/flow";
import Pagination from "@/components/Pagination";
import BreadText from "@/components/Breadtext";
import getDuration from "@/utils/getDuration";

export default {
  components: { Pagination, BreadText },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      getDuration,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        createOrgCode: undefined,
        appKey: undefined,
        startUserName: undefined
      }
    };
  },
  created() {
    this.getParams();
    this.getList();
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
    getParams() {
      let params = this.$route.params.definitionList;
      if(!params){
        return;
      }
      let p = {};
      params.map(o => {
        p[o.paramName] = o.paramValue
      })
      this.listQuery = {...this.listQuery, ...p}
    }
  }
};
</script>

<style lang="scss" scoped></style>
