<template>
  <div class="tenant">
    <el-row :gutter="20" style="height:276px">
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            租户总数
          </div>
          <div class="card-body">
            <histogram
              id="tenantMonthGrowth"
              :chartData="tenantDailyGrowth"
              :title="dataRes.totalTenantNum"/>
          </div>
          <div class="card-bottom">
            本月添加 {{ dataRes.tenantCurrentMonthGrowth }}
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            用户总数
          </div>
          <div class="card-body">
            <histogram
              id="accountDailyGrowth"
              :chartData="accountDailyGrowth"
              :title="dataRes.totalAccountNum"/>
          </div>
          <div class="card-bottom">
            本月添加 {{ dataRes.accountCurrentMonthGrowth }}
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            模板总数
          </div>
          <div class="card-body">
            <histogram
              id="templateMonthGrowth"
              :chartData="templateDailyGrowth"
              :title="dataRes.totalTemplateNum"/>
          </div>
          <div class="card-bottom">
            本月添加 {{ dataRes.templateCurrentMonthGrowth }}
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            流程总数
          </div>
          <div class="card-body">
            <histogram
              id="processDailyGrowth"
              :chartData="processDailyGrowth"
              :title="dataRes.totalProcessNum"/>
          </div>
          <div class="card-bottom">
            本月添加 {{ dataRes.processCurrentMonthGrowth }}
          </div>
        </card-container>
      </el-col>
    </el-row>

    <tenant-table
      :tableData="list"
      :listLoading="listLoading"
      :handleSearch="handleSearch"/>
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
import Pagination from "@/components/Pagination";
import {fetchList, getList} from "@/api/operate";
import TenantTable from "@/views/process/components/TenantTable";
import CardContainer from "@/components/CardContainer";
import Histogram from "@/views/process/components/Histogram";

export default {
  components: {Histogram, TenantTable, Pagination, CardContainer},
  data() {
    return {
      tenantDailyGrowth: {},
      templateDailyGrowth: {},
      processDailyGrowth: {},
      accountDailyGrowth: {},
      dataRes: {},
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
      }
    };
  },
  async created() {
    await this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const data = await getList({
        currentPage: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize
      });
      this.list = data.data.tenantStatisticsList;
      this.total = data.data.totalTenantNum;
      this.dataRes = data.data;
      this.listLoading = false;
      this.tenantDailyGrowth = this.getGrowth(this.dataRes.tenantDailyGrowth)
      this.templateDailyGrowth = this.getGrowth(this.dataRes.templateDailyGrowth)
      this.processDailyGrowth = this.getGrowth(this.dataRes.processDailyGrowth)
      this.accountDailyGrowth = this.getGrowth(this.dataRes.accountDailyGrowth)
    },
    getGrowth(list) {
      return {
        xAxis: list.map(item => item.day),
        yAxis: list.map(item => item.growth)
      }
    },
    handleSearch() {
      this.getList();
    },
  }
}
</script>

<style lang="scss" scoped>
.tenant {
  .card-header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  .card-bottom {
    padding: 18px 20px;
    border-top: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  .col-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .card-row {
    height: 50%;
    display: flex;
    align-items: center;
  }

  .card-body {
    height: calc(100% - 110px);
    position: relative;
  }
}
</style>
