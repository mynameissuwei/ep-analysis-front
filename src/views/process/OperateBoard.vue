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
              :chartData="tenantMonthGrowth"
              :title="data.totalTenantNum"
            />
          </div>
          <div class="card-bottom">
            本月添加 {{ data.tenantCurrentMonthGrowth }}
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
              id="accountMonthGrowth"
              :chartData="accountMonthGrowth"
              :title="data.totalAccountNum"
            />
          </div>
          <div class="card-bottom">
            本月添加 {{ data.accountCurrentMonthGrowth }}
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
              :chartData="templateMonthGrowth"
              :title="data.totalTemplateNum"
            />
          </div>
          <div class="card-bottom">
            本月添加 {{ data.templateCurrentMonthGrowth }}
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
              id="processMonthGrowth"
              :chartData="processMonthGrowth"
              :title="data.totalProcessNum"
            />
          </div>
          <div class="card-bottom">
            本月添加 {{ data.processCurrentMonthGrowth }}
          </div>
        </card-container>
      </el-col>
    </el-row>

    <tenant-table :tableData="list" :listLoading="listLoading" />
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
import { getBoard, getList } from "@/api/operate";
import TenantTable from "@/views/process/components/TenantTable";
import CardContainer from "@/components/CardContainer";
import Histogram from "@/views/process/components/Histogram";

export default {
  components: { Histogram, TenantTable, Pagination, CardContainer },
  data() {
    return {
      tenantMonthGrowth: {},
      templateMonthGrowth: {},
      processMonthGrowth: {},
      accountMonthGrowth: {},
      data: {},
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getList();
    this.getBoard();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const result = await getList({
        currentPage: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize
      });
      this.list = result.data.list;
      this.total = result.data.total;
      this.listLoading = false;
    },
    async getBoard() {
      const result = await getBoard();
      this.data = result.data;
      this.tenantMonthGrowth = this.getGrowth(this.data.tenantMonthGrowth);
      this.templateMonthGrowth = this.getGrowth(this.data.templateMonthGrowth);
      this.processMonthGrowth = this.getGrowth(this.data.processMonthGrowth);
      this.accountMonthGrowth = this.getGrowth(this.data.accountMonthGrowth);
    },
    getGrowth(list) {
      return {
        xAxis: list.map(item => item.month),
        yAxis: list.map(item => item.growth)
      };
    }
  }
};
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
