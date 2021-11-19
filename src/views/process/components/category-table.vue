<template>
  <div>
    <bread-text name="类别分析明细" />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按部门" name="section">
        <el-row class="filter-container" style="margin-top: 10px">
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
                        :value="item.orgCode"
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
          loading
        >
          <el-table-column prop="orgName" label="部门名称" width="180" />
          <el-table-column prop="procDefNum" label="模版总数" sortable />
          <el-table-column prop="totalCnt" label="流程总数" sortable />
          <el-table-column
            prop="overRatio"
            label="平均超时率"
            width="180"
            sortable
          >
            <template slot-scope="scope">
              {{ toPercent(scope.row.overRatio) }}
            </template>
          </el-table-column>
          <el-table-column prop="finishRatio" label="完成率" sortable>
            <template slot-scope="scope">
              {{ toPercent(scope.row.finishRatio) }}
            </template>
          </el-table-column>
          <el-table-column prop="partNum" label="审批总人数" sortable />
          <el-table-column prop="personPassTime" label="人均耗时" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.personPassTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="totalOverTime" label="超时总长" sortable />
          <el-table-column prop="totalPassTime" label="耗时总长" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.totalPassTime) }}
            </template>
          </el-table-column>
          <el-table-column label="平均超时" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.processOverTime) }}
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
      </el-tab-pane>
      <el-tab-pane label="按类别" name="category">
        <el-row class="filter-container" style="margin-top: 10px">
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
          loading
        >
          <el-table-column prop="appName" label="模板类别" width="180" />
          <el-table-column prop="orgName" label="部门名称" width="180" />
          <el-table-column
            prop="overRatio"
            label="平均超时率"
            width="180"
            sortable
          >
            <template slot-scope="scope">
              {{ toPercent(scope.row.overRatio) }}
            </template>
          </el-table-column>
          <el-table-column prop="partNum" label="审批总人数" sortable>
          </el-table-column>
          <el-table-column prop="personPassTime" label="人均耗时" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.personPassTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="procDefNum" label="模版总数" sortable />
          <el-table-column label="平均超时" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.processOverTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="totalCnt" label="流程总数" sortable />
          <el-table-column prop="totalOverTime" label="超时总长" sortable />
          <el-table-column prop="totalPassTime" label="耗时总长" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.totalPassTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="processPassTime" label="平均耗时" sortable>
            <template slot-scope="scope">
              {{ getDuration(scope.row.processPassTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="finishRatio" label="完成率" sortable>
            <template slot-scope="scope">
              {{ toPercent(scope.row.finishRatio) }}
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchSelectTemplate, fetchSelectDepartment } from "@/api/rule";
import { fetchList } from "@/api/category";
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import Pagination from "@/components/Pagination";
import moment from "moment";
import toPercent from "@/utils/toPercent";
import getDuration from "@/utils/getDuration";

export default {
  components: { Pagination, FilterItem, BreadText },
  data() {
    return {
      listLoading: false,
      activeName: "section",
      list: [],
      selectDepartmentData: [],
      selectTemplateData: [],
      tableData: [],
      dateValue: [],
      total: 0,
      getDuration,
      toPercent,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        orgCode: undefined,
        appKey: undefined,
        startTime: null,
        endTime: null,
      },
    };
  },
  created() {
    this.getList("procOrgPage");
    this.getSelectDepartment();
    this.getSelectTemplate();
  },

  methods: {
    handleClick() {
      this.dateValue = [];
      this.getList();
    },
    async getList() {
      this.listLoading = true;
      const { data, totalCount } = await fetchList({
        condition: {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey:
            this.activeName === "section" ? "procOrgPage" : "procTypePage",
          extParam: {
            createOrgCode: this.listQuery.orgCode,
            appKey: this.listQuery.appKey,
            startTime: this.listQuery.startTime
              ? moment(parseInt(this.listQuery.startTime)).format(
                  "YYYY-MM-DD hh:mm:ss"
                )
              : this.listQuery.startTime,
            endTime: this.listQuery.endTime
              ? moment(parseInt(this.listQuery.endTime)).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : this.listQuery.endTime,
          },
        },
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
      console.log(data, "datadatadata");
      this.selectTemplateData = data;
    },
    datePick(value) {
      if (value == null) {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      } else {
        this.listQuery.startTime = new Date(value[0]).getTime();
        this.listQuery.endTime = new Date(value[1]).getTime();
      }
    },
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        orgCode: undefined,
        appKey: undefined,
        startTime: null,
        endTime: null,
      };
      this.dateValue = [];
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
