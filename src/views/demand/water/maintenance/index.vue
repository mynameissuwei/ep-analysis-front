<template>
  <div class="app-container">
    <bread-text></bread-text>
    <el-row :gutter="20" class="filter-container">
      <el-col :span="5">
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
      <el-col :span="5">
        <filter-item>
          <template v-slot:left> <span>所属厂区</span> </template>
          <template v-slot:right>
            <el-select
              v-model="listQueryBody.affiliatedName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in alertFac"
                :key="item.affiliatedName"
                :label="item.affiliatedName"
                :value="item.affiliatedName"
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
      <el-table-column label="设备名称">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="养护名称">
        <template slot-scope="scope">
          {{ scope.row.maintenanceName }}
        </template>
      </el-table-column>
      <el-table-column label="养护部件">
        <template slot-scope="scope">
          {{ scope.row.maintenancePart }}
        </template>
      </el-table-column>

      <el-table-column label="养护方式">
        <template slot-scope="scope">
          {{ scope.row.maintenanceMethod }}
        </template>
      </el-table-column>

      <el-table-column label="养护标准">
        <template slot-scope="scope">
          {{ scope.row.maintenanceStandard }}
        </template>
      </el-table-column>

      <el-table-column label="维修人">
        <template slot-scope="scope">
          {{ scope.row.maintenanceManName }}
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
  fetchConservationsList,
  fetchConservationsDevice,
  fetchConservationsFac,
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
        affiliatedName: "",
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
      const { data, totalCount } = await fetchConservationsList(
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
      fetchConservationsFac().then((res) => {
        const { data } = res;
        this.alertFac = data;
      });
    },
    getAlertDevice() {
      fetchConservationsDevice().then((res) => {
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
        type: "alerts",
        deviceName: "",
        affiliatedName: "",
        startTime: null,
        endTime: null,
      };
      this.dateValue = [];
      this.getList();
    },
  },
};
</script>
