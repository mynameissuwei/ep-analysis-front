<template>
  <el-dialog title="配置角色" :visible.sync="dialogVisible" width="60%">
    <div class="diag-container">
      <div>
        <span class="text-container">
          <span>用户姓名:</span> <span>123</span></span
        >
        <span class="text-container">
          <span>用户账号:</span> <span>123</span></span
        >
        <span> <span>用户账号:</span> <span>123</span></span>
      </div>
      <el-row :gutter="40" style="margin-top: 38px">
        <el-col :span="12" style="border-right: 1px solid #EEEEEE">
          <div>配置角色权限</div>
          <el-table
            v-loading="permissionListLoading"
            :data="permissionList"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="权限名称">
              <template slot-scope="scope">
                {{ scope.row.authName }}
              </template>
            </el-table-column>
            <el-table-column label="权限编码" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.authType }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div>配置角色用户</div>
          <el-input
            placeholder="请输入内容"
            v-model="input4"
            style=" margin-top:30px"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-table :data="tableData" style="width: 100%; margin-top: 24px">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { fetchList } from "@/api/permission";

export default {
  props: ["dialogVisible", "temp"],
  data() {
    return {
      dialogVisible: false,
      permissionListLoading: false,
      permissionList: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        }
      ]
    };
  },
  created() {
    if (this.id) {
      // this.getEditData();
      // this.getEditRoleUser();
    }
    this.getPermissionList();
  },
  methods: {
    getPermissionList() {
      this.permissionListLoading = true;
      fetchList().then(res => {
        this.permissionList = res.data;
        setTimeout(() => {
          this.permissionListLoading = false;
        }, 1.5 * 1000);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.text-container {
  margin-right: 40px;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
</style>
