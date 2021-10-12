<template>
  <el-container>
    <div class="app-container createRole-container">
      <el-row :gutter="80">
        <el-col :span="5">
          <bread-text></bread-text>
          <el-form
            ref="dataForm"
            :model="form"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="权限名称" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="权限编码" prop="roleType">
              <el-input v-model="form.roleType"></el-input>
            </el-form-item>
            <el-form-item label="权限描述">
              <el-input type="textarea" v-model="form.roleDesc"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model="form.status"></el-switch>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" class="role-border">
          <bread-text name="配置角色权限"></bread-text>
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
        <el-col :span="10">
          <bread-text name="配置角色用户"></bread-text>
          <el-input
            placeholder="请输入内容"
            v-model="content"
            style="margin-bottom: 10px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-footer class="footerContainer">
      <div>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="createData">保存</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import BreadText from "@/components/Breadtext";
import { fetchList } from "@/api/permission";
import { fetchEditData } from "@/api/role";

export default {
  props: ["id"],
  components: { BreadText },
  created() {
    // if (this.id) {
    //   this.getEditData();
    // }
    // this.getPermissionList();
  },
  data() {
    return {
      form: {
        roleName: "",
        roleType: "",
        roleDesc: "",
        status: false
      },
      content: "",
      permissionList: [],
      permissionListLoading: false,
      multipleSelection: [],
      rules: {
        authName: [
          { required: true, message: "请输入权限名称", trigger: "blur" }
        ],
        roleType: [
          { required: true, message: "请输入权限编码", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  methods: {
    onCancel() {
      this.$router.push("/acount/role");
    },
    getPermissionList() {
      this.permissionListLoading = true;
      fetchList().then(res => {
        this.permissionList = res.data;
        setTimeout(() => {
          this.permissionListLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getEditData() {
      const id = this.id;
      fetchEditData(id).then(res => {
        const { roleName, roleType, roleDesc, status, authIds } = res.data;
        this.multipleSelection = authIds;
        this.form = {
          roleName,
          roleType,
          roleDesc,
          status
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.createRole-container {
  min-height: calc(100vh - 240px);
}
.role-border {
  border-right: 1px solid #eeeeee;
  border-left: 1px solid #eeeeee;
  min-height: calc(100vh - 440px);
}
</style>
