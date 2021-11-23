<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row :gutter="20" class="filter-container">
      <el-col :span="5">
        <filter-item>
          <template v-slot:left> <span>工单状态</span> </template>
          <template v-slot:right>
            <el-select
              v-model="listQueryBody.orderStatus"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in alertDevice"
                :key="item.orderStatus"
                :label="item.orderStatus"
                :value="item.orderStatus"
              />
            </el-select>
          </template>
        </filter-item>
      </el-col>
      <el-col :span="5">
        <filter-item>
          <template v-slot:left> <span>班组</span> </template>
          <template v-slot:right>
            <el-select
              v-model="listQueryBody.team"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in alertFac"
                :key="item.team"
                :label="item.team"
                :value="item.team"
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
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="datePick"
            >
            </el-date-picker>
          </template>
        </filter-item>
      </el-col>
      <el-col :span="6">
        <div style="float: right">
          <el-button size="small" type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button
            size="small"
            style="margin-left: 10px"
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
      <el-table-column label="任务单号">
        <template slot-scope="scope">
          {{ scope.row.taskOrderId }}
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="巡检人姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.inspectorName }}
        </template>
      </el-table-column>
      <el-table-column label="工单状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.taskStatus }}
        </template>
      </el-table-column>

      <el-table-column label="班组" align="center">
        <template slot-scope="scope">
          {{ scope.row.team }}
        </template>
      </el-table-column>

      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>

      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQueryBody.page"
      :limit.sync="listQueryBody.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  fetchInspectionsList,
  fetchInspectionsOrderStatuses,
  fetchInspectionsTeams,
} from "@/api/task";

import BreadText from "@/components/Breadtext";
import FilterItem from "@/components/FilterItem"; // secondary package based on el-pagination
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  components: { Pagination, BreadText, FilterItem },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQueryBody: {
        page: 1,
        size: 10,
        type: "inspections",
        orderStatus: "",
        team: "",
        startTime: null,
        endTime: null,
      },
      alertFac: [],
      alertDevice: [],
      dateValue: [],
    };
  },
  created() {
    this.getList();
    this.getAlertFac();
    this.getAlertDevice();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data, totalCount } = await fetchInspectionsList(
        {
          page: this.listQueryBody.page,
          size: this.listQueryBody.size,
        },
        this.listQueryBody
      );
      this.total = Number(totalCount);
      this.list = data;
      this.listLoading = false;
    },
    getAlertFac() {
      fetchInspectionsTeams().then((res) => {
        const { data } = res;
        this.alertFac = data;
      });
    },
    getAlertDevice() {
      fetchInspectionsOrderStatuses().then((res) => {
        const { data } = res;
        this.alertDevice = data;
      });
    },
    datePick(value) {
      if (value == null) {
        this.listQueryBody.startTime = null;
        this.listQueryBody.endTime = null;
      } else {
        this.listQueryBody.startTime = new Date(value[0]).getTime();
        this.listQueryBody.endTime = new Date(value[1]).getTime();
      }
    },
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQueryBody = {
        page: 1,
        size: 10,
        type: "inspections",
        orderStatus: "",
        team: "",
        startTime: null,
        endTime: null,
      };
      this.dateValue = [];
      this.getList();
    },
  },
};
</script>
