<template>
  <el-container>
    <div class="app-container createRole-container">
      <el-row :gutter="80">
        <el-col :span="5">
          <bread-text :name='id ? "编辑角色" : "创建角色" '></bread-text>
          <el-form
            ref="dataForm"
            :model="form"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色编码" prop="roleId">
              <el-input
                v-model="form.roleId"
                :disabled="this.id ? true : false"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
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
            ref="multipleTable"
            v-loading="permissionListLoading"
            :data="permissionList"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="角色名称">
              <template slot-scope="scope">
                {{ scope.row.authName }}
              </template>
            </el-table-column>
            <el-table-column label="角色编码" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.authId }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="10">
          <bread-text name="配置角色用户"></bread-text>
          <el-autocomplete
            v-model="inputRoleUserValue"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          >
            <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
            <template slot-scope="{ item }">
              <div class="name">
                <span class="accountText" style="margin-right: 15px">用户ID: {{ item.accountId }}</span>
                <span>用户名称: {{ item.nickname }}</span>
              </div>
            </template>
          </el-autocomplete>
          <el-table :data="userList" style="width: 100%">
            <el-table-column label="用户ID">
              <template slot-scope="scope">
                <span>{{ scope.row.accountId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户名称">
              <template slot-scope="scope">
                <span>{{ scope.row.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户电话">
              <template slot-scope="scope">
                {{ scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column label="用户登录名称">
              <template slot-scope="scope">
                {{ scope.row.loginName }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row, $index }">
                <span class="actionStyle" @click="handleDelete(row, $index)">
                  删除
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-footer class="footerContainer">
      <div>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="buttonLoading"
          >保存</el-button
        >
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadText from "@/components/Breadtext";
import { fetchList } from "@/api/permission";
import * as userApi from "@/api/user";
import {
  fetchRoleAuth,
  fetchRoleUser,
  createList,
  updateList,
  createUserole,
  createAuthRole,
  deleteAuthRole
} from "@/api/role";
import deepClone from "@/utils/deep-clone";

export default {
  props: ["id"],
  computed: {
    ...mapGetters([
      'buttonLoading',
    ]),
  },
  components: { BreadText },
  data() {
    return {
      form: {
        roleName: "",
        roleId: "",
        roleDesc: "",
        status: false
      },
      editUserList: [],
      permissionList: [],
      permissionListLoading: false,
      multipleSelection: [],
      inputRoleUserValue: "",
      roleUserData: [],
      roleEditUserData: [],
      userList: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          },
          // {
          //   pattern: /^[\u4e00-\u9fa5]+$/,
          //   message: "只能输入中文字符",
          //   trigger: "blur"
          // }
        ],
        roleId: [
          { required: true, message: "请输入角色编码", trigger: "blur" },
          // {
          //   min: 1,
          //   max: 20,
          //   message: "长度在 1 到 120 个字符",
          //   trigger: "blur"
          // },
          {
            pattern: /^[5A-Za-z0-9-\_]+$/,
            // message: "只能输入英文字符和下划线",
            message: "只能输入英文，数字，下划线，横线",
            trigger: "blur"
          }
        ],
        roleDesc: [
          {
            min: 0,
            max: 100,
            message: "最大长度100字符",
            trigger: "blur"
          },
          // {
          //   pattern: /^[\u4e00-\u9fa5]+$/,
          //   message: "只能输入中文字符",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  created() {
    this.init();
    if (this.id) {
      const { roleName, roleId, roleDesc, status } = this.$route.params.row;
      this.form = {
        roleName,
        roleId,
        roleDesc,
        status: status ? true : false
      };
      this.getEditRoleUser();
    }
  },
  mounted() {
    this.getRoleUser();
  },
  methods: {
    onCancel() {
      this.$router.push("/acount/role");
    },
    onSubmit() {
      this.$refs["dataForm"].validate(async valid => {
        console.log(this.editUserList, this.userList, "userList");
        let deleteArray = [];
        this.editUserList.forEach(item => {
          if (!this.userList.find(l => l.accountId === item.accountId)) {
            deleteArray.push(item);
          }
        });
        let deleteResult = deleteArray.map(item => ({
          accountId: item.accountId,
          roleId: this.form.roleId
        }));
        if (valid) {
          const data = {
            ...this.form,
            roleType: "1001",
            status: this.form.status ? 1 : 0
          };
          this.$store.dispatch('loading/setLoading')
          const userResult = this.userList.map(item => ({
            accountId: item.accountId,
            roleId: this.form.roleId
          }));
          const authResult = {
            roleId: this.form.roleId,
            authIds: this.multipleSelection.map(item => item.authId).join(",")
          };

          this.id ? await updateList(data) : await createList(data);
          deleteArray.length && (await deleteAuthRole(deleteResult));

          await Promise.all([
            createUserole(userResult),
            createAuthRole(authResult)
          ]).then(result => {
            this.$store.dispatch('loading/cancelLoading')
            this.$router.push("/acount/role");
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    async init() {
      await this.getPermissionList();
    },
    async getPermissionList() {
      this.permissionListLoading = true;
      const res = await fetchList();
      this.permissionList = res.data;
      this.permissionListLoading = false;
      this.$nextTick(() => {
        if (this.id) {
          this.getRoleAuth();
        }
      });
    },
    async getRoleAuth() {
      const id = this.id;
      const { data } = await fetchRoleAuth(id);
      const rows = data;
      this.toggleSelection(rows, this.permissionList, "multipleTable");
    },
    toggleSelection(selectRows, totalRows, tablename) {
      this.$refs[tablename].clearSelection();
      if (selectRows.length > 0) {
        this.$nextTick(() => {
          totalRows.forEach(row => {
            selectRows.forEach(item => {
              //判断条件
              if (item.authId == row.authId) {
                this.$refs[tablename].toggleRowSelection(row);
              }
            });
          });
        });
      }
    },
    async getRoleUser() {
      const response = await userApi.fetchList({ page: 1, size: 10 });
      const total = response.data.total;
      const res = await userApi.fetchList({
        page: 1,
        size: total
      });
      this.roleUserData = res.data.records;
    },
    getEditRoleUser() {
      const id = this.id;
      fetchRoleUser({ roleId: id }).then(res => {
        this.editUserList = deepClone(res.data);
        this.userList = res.data;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    querySearchAsync(queryString, cb) {
      var roleUserData = this.roleUserData;

      var results = queryString
        ? roleUserData.filter(this.createStateFilter(queryString))
        : roleUserData;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return item => {
        console.log(item.nickname,item.accountId,'itemitme')
        if (item.nickname && item.accountId) {
          return (
            item.nickname.toLowerCase().indexOf(queryString.toLowerCase()) != -1 || item.accountId.toLowerCase().indexOf(queryString.toLowerCase()) != -1
          );
        } else {
          return false;
        }
      };
    },
    handleSelect(item) {
      let array = this.userList;
      array.push(item);
      this.userList = array;
    },
    handleDelete(row, index) {
      let array = this.userList;
      array.splice(index, 1);
      this.userList = array;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .role-border {
    border-right: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
    min-height: calc(100vh - 440px);
  }
  .el-autocomplete {
    width: 100%;
  }
}
.createRole-container {
  min-height: calc(100vh - 240px);
}
</style>
