<template>
  <div>
    <el-row class="filter-container" style="margin-top:10px">
      <!-- left search -->
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>模板名称</span> </template>
              <template v-slot:right>
                <el-input v-model="listQuery.name" placeholder="请输入" />
              </template>
            </filter-item>
          </el-col>
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>计算状态</span> </template>
              <template v-slot:right>
                <el-select v-model="listQuery.calcStatus" clearable filterable>
                  <el-option
                    v-for="item in [
                      { name: '已计算', value: 1 },
                      { name: '未计算', value: 0 }
                    ]"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="8">
            <filter-item>
              <template v-slot:left> <span>查询时间</span> </template>
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
    <el-button
      size="small"
      type="primary"
      style="margin-bottom:16px"
      @click="handleCreate"
    >
      添加
    </el-button>
    <el-button
      size="small"
      type="primary"
      style="margin-bottom:16px"
      @click="handleCheckBoxDelete"
    >
      删除
    </el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="definition" label="定义" />
      <el-table-column prop="maintainer" label="维护人" />
      <el-table-column label="计算状态">
        <template slot-scope="scope">
          {{ scope.row.calcStatus === 0 ? "未计算" : "已计算" }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="维护时间" />
      <el-table-column label="操作" width="230">
        <template slot-scope="{ row, $index }">
          <span class="actionStyle" @click="handleUpdate(row)">
            编辑
          </span>
          <span class="actionStyle" @click="handleDelete(row, $index)">
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog title="添加词典" :visible.sync="dialogVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="定义">
          <el-input
            v-model="temp.definition"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="temp.type">
            <el-radio :label="0">指标</el-radio>
            <el-radio :label="1">非指标</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="计算公式">
          <el-input v-model="temp.formula" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { fetchList, createList, deleteList } from "@/api/dashboard";
import FilterItem from "@/components/FilterItem";
import moment from "moment";

export default {
  props: ["type"],
  components: { Pagination, FilterItem },
  created() {
    this.getList();
  },
  data() {
    return {
      listLoading: false,
      total: 10,
      list: [],
      dateValue: [],
      temp: {
        name: "",
        definition: "",
        type: 0,
        formula: ""
      },
      dialogVisible: false,
      listQuery: {
        page: 1,
        size: 10,
        name: "",
        calcStatus: "",
        startTime: null,
        endTime: null
      },
      multipleSelection: [],
      tabMapOptions: [
        { label: "指标", key: "indicator" },
        { label: "非指标", key: "other" }
      ],
      activeName: "indicator",
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }]
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList({
        ...this.listQuery,
        type: this.type === "0" ? 0 : 1,
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
      }).then(response => {
        this.list = response.data.records;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
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
        page: 1,
        size: 10,
        name: ""
      };
      this.dateValue = [];
      this.multipleSelection = [];
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCheckBoxDelete() {
      this.$confirm("你确定要删除该数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const auIdarray = this.multipleSelection.map(item => item.id);
        await deleteList(auIdarray);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createList(this.temp).then(() => {
            this.getList();
            this.dialogVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleCreate() {
      this.dialogVisible = true;
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$confirm("你确定要删除该数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await deleteList([row.id]);
        this.getList();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
