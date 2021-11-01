<template>
  <div>
    <bread-text name="平台租户统计" />

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>租户总数</span>
            <i
              style="float: right; padding: 3px 0"
              type="text"
              class="el-icon-warning-outline"
            ></i>
          </div>
          <bar-chart id="tenantChart" :execSqlToList="execSqlToList" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="card-container">
      <el-table :data="list">
        <el-table-column prop="app_name" label="模板名称"> </el-table-column>
        <el-table-column prop="start_user_name" label="发起人">
        </el-table-column>
        <el-table-column prop="proc_pass_time" label="耗时总长" sortable>
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
        </el-table-column>
        <el-table-column prop="proc_approve_user" label="最长耗时审批人">
        </el-table-column>
        <el-table-column prop="ratio" label="人均耗时" sortable>
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
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import { fetchList, fetchBar } from "@/api/operate";
import Pagination from "@/components/Pagination";
import BarChart from "@/components/BarChart";

export default {
  components: { Pagination, FilterItem, BreadText, BarChart },
  data() {
    return {
      total: 0,
      list: null,
      listLoading: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
      this.getExecSqlToList();
    },
    async getList() {
      this.listLoading = true;
      const { data, totalCount } = await fetchList({
        condition: {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "procAnalyPage"
        }
      });
      this.total = totalCount;
      this.list = data;
      this.listLoading = false;
    },
    async getExecSqlToList() {
      // const { data } = await fetchBar({
      //   length: 20,
      //   step: 2
      // });
      // let xAxis = data.map(item => item.range);
      // let yAxis = data.map(item => item.count);
      // this.execSqlToList = {
      //   xAxis,
      //   yAxis
      // };
      let xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      let yAxis = [120, 200, 150, 80, 70, 110, 130];
      this.execSqlToList = {
        xAxis,
        yAxis
      };
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
        pageSize: 10
      };
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  width: 100%;
  margin-top: 20px;
}
</style>
