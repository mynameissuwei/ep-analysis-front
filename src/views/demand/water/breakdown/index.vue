<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row :gutter="20" class="filter-container">
      <el-col :span="6">
        <filter-item>
          <template v-slot:left> <span>设备名称</span> </template>
          <template v-slot:right>
            <el-select
              v-model="listQueryBody.deviceName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in alertDevice"
                :key="item.deviceName"
                :label="item.deviceName"
                :value="item.deviceName"
              />
            </el-select>
          </template>
        </filter-item>
      </el-col>
      <el-col :span="6">
        <filter-item>
          <template v-slot:left> <span>所属厂区</span> </template>
          <template v-slot:right>
            <el-select
              v-model="listQueryBody.factoryName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in alertFac"
                :key="item.factoryName"
                :label="item.factoryName"
                :value="item.factoryName"
              />
            </el-select>
          </template>
        </filter-item>
      </el-col>
      <el-col :span="6">
        <filter-item>
          <template v-slot:left> <span>创建时间</span> </template>
          <template v-slot:right>
            <el-date-picker
              v-model="dateValue"
              type="daterange"
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
      <el-table-column label="任务单号">
        <template slot-scope="scope">
          {{ scope.row.taskOrderId }}
        </template>
      </el-table-column>
      <el-table-column label="设备名称">
        <template slot-scope="scope">
          {{ scope.row.deviceName }}
        </template>
      </el-table-column>
      <el-table-column label="故障发生位置" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.faultOccurrenceLocation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="厂站名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.factoryName }}
        </template>
      </el-table-column>
      <el-table-column label="故障类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.faultType }}
        </template>
      </el-table-column>

      <el-table-column label="故障等级" align="center">
        <template slot-scope="scope">
          {{ scope.row.faultLevel }}
        </template>
      </el-table-column>

      <el-table-column label="故障描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.faultDesc }}
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
  fetchRepairsList,
  fetchRepairsDevice,
  fetchRepairsFac
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
        type: "repairs",
        deviceName: "",
        factoryName: "",
        startTime: null,
        endTime: null
      },
      alertFac: [],
      alertDevice: [],
      dateValue: []
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
      const { data, totalCount } = await fetchRepairsList(
        {
          page: this.listQueryBody.page,
          size: this.listQueryBody.size
        },
        this.listQueryBody
      );
      this.total = Number(totalCount);
      this.list = data;
      this.listLoading = false;
    },
    getAlertFac() {
      fetchRepairsFac().then(res => {
        const { data } = res;
        this.alertFac = data;
      });
    },
    getAlertDevice() {
      fetchRepairsDevice().then(res => {
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
        type: "repairs",
        deviceName: "",
        factoryName: "",
        startTime: null,
        endTime: null
      };
      this.dateValue = [];
      this.getList();
    }
  }
};
</script>
