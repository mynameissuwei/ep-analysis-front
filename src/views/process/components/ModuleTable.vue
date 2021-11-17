<template>
  <div class="card-container">
    <bread-text name="模板分析明细" />
    <el-row class="filter-container">
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
              <template v-slot:left> <span>模板名称</span> </template>
              <template v-slot:right>
                <el-input
                  v-model="listQuery.procDefName"
                  placeholder="请输入"
                />
              </template>
            </filter-item>
          </el-col>
        </el-row>
      </el-col>
      <!-- right button -->
      <el-col :span="6">
        <div style="float: right">
          <el-button type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button style="margin-left: 10px;" @click="handleReset">
            重置
          </el-button>
          <el-button
            icon="el-icon-circle-plus"
            style="margin-left: 10px;"
            @click="open()"
          >
            保存为快捷视图
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
      <el-table-column label="模版类别">
        <template slot-scope="scope">
          <span
            style="color: #0F55FA; cursor: pointer"
            @click="
              textClick({
                source: scope.row.source,
                procDefKey: scope.row.procDefKey
              })
            "
            >{{ scope.row.appName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="defName" label="模板名称" />
      <el-table-column prop="orgName" label="归属部门" />
      <el-table-column prop="taskNum" label="节点长度" />
      <el-table-column prop="partNum" label="审批总人数" />
      <el-table-column prop="totalPassTime" label="超时总长" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.totalOverTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalCnt" label="流程总数" sortable />
      <el-table-column prop="totalPassTime" label="耗时总长" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.totalPassTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="finishRatio" label="完成率" sortable>
        <template slot-scope="scope">
          {{ toPercent(scope.row.finishRatio) }}
        </template>
      </el-table-column>
      <el-table-column label="平均超时(小时)" prop="processOverTime" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.processOverTime) }}
        </template>
      </el-table-column>
      <el-table-column label="人均耗时" prop="personPassTime" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.personPassTime) }}
        </template>
      </el-table-column>
      <el-table-column label="平均超时率" prop="finishRatio" sortable>
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
    <el-dialog title="添加视图" :visible.sync="dialogVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="150px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="视图名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()">
          确认
        </el-button>
        <el-button @click="close()">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchSelectDepartment, fetchSelectTemplate } from "@/api/rule";
import { fetchList } from "@/api/module";
import Pagination from "@/components/Pagination";
import FilterItem from "@/components/FilterItem";
import BreadText from "@/components/Breadtext";
import rangeNumber from "@/utils/numberRange";
import getDuration from "@/utils/getDuration";
import toPercent from "@/utils/toPercent";
import { addQuickView } from "@/api/workbench";

export default {
  components: { Pagination, FilterItem, BreadText },
  data() {
    return {
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      checkList: [],
      getDuration,
      toPercent,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        orgCode: undefined,
        appKey: undefined,
        procDefName: undefined
      },
      value: 0,
      selectDepartmentData: [],
      selectTemplateData: [],
      rangeNumber: rangeNumber(),
      isSelected: false,
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5()（）]+$/,
            message: "只能输入汉字、数字、字母、括号",
            trigger: "blur"
          }
        ]
      },
      form: {
        name: ""
      }
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
            createOrgCode: this.listQuery.orgCode,
            appKey: this.listQuery.appKey,
            procDefName: this.listQuery.procDefName
          },
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "procDefDetailPage"
        }
      });
      this.total = totalCount;
      console.log(data, "listData");
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
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        orgCode: undefined,
        appKey: undefined,
        procDefName: undefined
      };
      this.getList();
    },

    overTimeDeploy(row) {
      this.$router.push({
        name: "createRule",
        params: { id: row.procDefKey }
      });
    },
    textClick(query) {
      this.$router.push({
        name: "moduleFlow",
        query
      });
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
        viewType: "template",
        definitionList: [
          {
            paramName: "orgCode",
            paramValue: this.listQuery.orgCode
          },
          {
            paramName: "appKey",
            paramValue: this.listQuery.appKey
          },
          {
            paramName: "procDefName",
            paramValue: this.listQuery.procDefName
          }
        ]
      };
      await addQuickView(param);
      this.$message({
        type: "success",
        message: "创建成功!"
      });
    },
    validateAndSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.close();
          this.addView();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  display: block;
  margin-bottom: 22px;
}
.content {
  margin: 20px 0px;
}
.content-text {
  margin-right: 20px;
}
.content {
  .el-select {
    width: 100px;
    margin-right: 10px;
  }
}
.deployText {
  margin-left: 10px;
}
</style>
