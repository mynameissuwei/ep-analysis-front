<template>
  <div class="card-container">
    <bread-text name="流程分析明细" />
    <el-row class="filter-container">
      <!-- left search -->
      <el-col :span="16">
        <el-row :gutter="20">
          <el-col :span="6">
            <filter-item>
              <template v-slot:left><span>归属部门</span></template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.createOrgCode"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in selectDepartmentData"
                    :key="item.orgCode"
                    :label="item.orgName"
                    :value="item.orgCode"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="6">
            <filter-item>
              <template v-slot:left><span>模板类别</span></template>
              <template v-slot:right>
                <el-select
                  v-model="listQuery.appKey"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, key) in selectTemplateData"
                    :key="item.key"
                    :label="`${item.appName} (${item.appKey})`"
                    :value="item.appKey"
                  />
                </el-select>
              </template>
            </filter-item>
          </el-col>
          <el-col :span="6">
            <filter-item>
              <template v-slot:left><span>发起人</span></template>
              <template v-slot:right>
                <el-input
                  v-model="listQuery.startUserName"
                  placeholder="请输入"
                />
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
      <!-- right button -->
      <el-col :span="8">
        <div style="float: right">
          <el-button type="primary" @click="handleSearch"> 查询 </el-button>
          <el-button style="margin-left: 10px" @click="handleReset">
            重置
          </el-button>
          <el-button
            icon="el-icon-circle-plus"
            style="margin-left: 10px"
            @click="open()"
          >
            保存为快捷视图
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="app_name" label="模板名称"></el-table-column>
      <el-table-column prop="start_user_name" label="发起人"></el-table-column>
      <el-table-column prop="start_time" label="发起时间" sortable>
      </el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <span>{{ scope.row.proc_over === 0 ? "未结束" : "结束" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="task_part_num"
        label="审批参与人数"
        sortable
        width="150px"
      >
      </el-table-column>
      <el-table-column prop="proc_pass_time" label="耗时总长(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_pass_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_over_time" label="超时总长(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_over_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ratio" label="人均耗时(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.ratio) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_cost_time" label="最长耗时(小时)" sortable>
        <template slot-scope="scope">
          <span>{{ getDuration(scope.row.proc_cost_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="proc_approve_user" label="最长耗时审批人">
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <el-dialog title="添加视图" :visible.sync="dialogVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="150px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="视图名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()"> 确认 </el-button>
        <el-button @click="close()"> 取消 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import { fetchList } from "@/api/flow";
import { fetchSelectDepartment, fetchSelectTemplate } from "@/api/rule";
import Pagination from "@/components/Pagination";
import getDuration from "@/utils/getDuration";

import { addQuickView } from "@/api/workbench";

export default {
  components: { Pagination, FilterItem, BreadText },
  data() {
    return {
      dialogVisible: false,
      total: 0,
      list: null,
      listLoading: false,
      selectDepartmentData: [],
      selectTemplateData: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        createOrgCode: undefined,
        appKey: undefined,
        startUserName: undefined,
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5()（）]+$/,
            message: "只能输入汉字、数字、字母、括号",
            trigger: "blur",
          },
        ],
      },
      form: {
        name: "",
      },
      getDuration,
    };
  },
  created() {
    this.getList();
    this.getSelectDepartment();
    this.getSelectTemplate();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data, totalCount } = await fetchList({
        condition: {
          extParam: {
            createOrgCode: this.listQuery.createOrgCode,
            appKey: this.listQuery.appKey,
            startUserName: this.listQuery.startUserName,
          },
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "procAnalyPage",
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
      this.selectTemplateData = data;
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
        pageSize: 10,
        createOrgCode: "",
        appKey: "",
        startUserName: "",
      };
      this.getList();
    },
    close() {
      this.dialogVisible = false;
    },
    open() {
      this.dialogVisible = true;
    },
    confirm() {
      this.validateAndSubmit();
    },
    async addView() {
      let param = {
        viewName: this.form.name,
        viewType: "process",
        definitionList: [
          {
            paramName: "createOrgCode",
            paramValue: this.listQuery.createOrgCode,
          },
          {
            paramName: "appKey",
            paramValue: this.listQuery.appKey,
          },
          {
            paramName: "startUserName",
            paramValue: this.listQuery.startUserName,
          },
        ],
      };
      await addQuickView(param);
      this.$message({
        type: "success",
        message: "创建成功!",
      });
    },
    validateAndSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.close();
          this.addView();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
