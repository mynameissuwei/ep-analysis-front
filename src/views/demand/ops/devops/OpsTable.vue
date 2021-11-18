<template>
  <div class="card-container">
    <bread-text name="流程分析明细" />
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>工单类型</span> </template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.orderType"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in orderTypeData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>创建时间</span> </template>
              <template v-slot:right>
                <el-date-picker
                  v-model="dateValue"
                  type="datetimerange"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="datePick"
                >
                </el-date-picker>
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
      <el-table-column prop="start_user_name" label="发起人" />
      <el-table-column prop="order_type" label="工单类型">
        <template slot-scope="scope">
          <span>{{
            orderTypeData.find(item => item.value === scope.row.order_type).name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="manual_work" label="耗费天数" />
      <el-table-column prop="order_dispatch_time" label="发生时间" />
      <el-table-column prop="order_pick_up_time" label="响应时间" />
      <el-table-column prop="order_finish_time" label="完成时间" />
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
import Pagination from "@/components/Pagination";
import { fetchList } from "@/api/ops";
import moment from "moment";

export default {
  components: { Pagination, FilterItem, BreadText },
  data() {
    return {
      total: 0,
      orderTypeData: [
        { value: "6", name: "巡检" },
        { value: "8", name: "抢修" },
        { value: "10", name: "消缺" }
      ],
      list: [],
      listLoading: false,
      dateValue: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        orderType: undefined,
        startTime: null,
        endTime: null
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data, totalCount } = await fetchList({
        condition: {
          extParam: {
            orderType: this.listQuery.orderType,
            startTime: this.listQuery.startTime
              ? moment(parseInt(this.listQuery.startTime)).format(
                  "YYYY-MM-DD hh:mm:ss"
                )
              : this.listQuery.startTime,
            endTime: this.listQuery.endTime
              ? moment(parseInt(this.listQuery.endTime)).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : this.listQuery.endTime
          },
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "fnwTenantProcPage"
        }
      });
      this.total = totalCount;
      this.list = data;
      this.listLoading = false;
    },
    datePick(value) {
      if (value == null) {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      } else {
        this.listQuery.startTime = new Date(value[0]).getTime();
        this.listQuery.endTime = new Date(value[1]).getTime();
        console.log(
          this.listQuery.startTime,
          this.listQuery.endTime,
          "endTime"
        );
      }
    },
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        orderType: undefined,
        startTime: null,
        endTime: null
      };
      this.dateValue = [];
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
