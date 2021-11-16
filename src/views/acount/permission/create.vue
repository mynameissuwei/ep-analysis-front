<template>
  <el-container>
    <el-container class="app-container">
      <el-aside width="400px" class="aside-container">
        <bread-text :name="id ? '编辑权限' : '添加权限'"></bread-text>
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="权限名称" prop="authName">
            <el-input v-model="form.authName"></el-input>
          </el-form-item>
          <el-form-item label="权限编码" prop="authId">
            <el-input
              v-model="form.authId"
              :disabled="id ? true : false"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input type="textarea" v-model="form.authDesc"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="form.audit"></el-switch>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main>
        <bread-text name="资源配置"> </bread-text>
        <el-tree
          :check-strictly="checkStrictly"
          ref="tree"
          node-key="resId"
          :props="props"
          :data="sourceList"
          show-checkbox
        >
        </el-tree>
      </el-main>
    </el-container>
    <el-footer class="footerContainer">
      <div>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="createData" :loading="submitLoading"
          >保存</el-button
        >
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import BreadText from "@/components/Breadtext";
import {
  createList,
  editList,
  fetchSourceList,
  fetchEditData
} from "@/api/permission";

export default {
  props: ["id"],
  components: { BreadText },
  created() {
    this.getSourceList();

    if (this.id) {
      this.getEditData();
    }
  },
  data() {
    return {
      form: {
        authName: "",
        authId: "",
        authDesc: "",
        audit: true
      },
      checkStrictly: false,
      submitLoading: false,
      sourceList: [],
      rules: {
        authName: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: "只能输入中文字符",
            trigger: "blur"
          }
        ],
        authId: [
          { required: true, message: "请输入权限编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z_]+$/,
            message: "只能输入英文字符和下划线",
            trigger: "blur"
          }
        ],
        authDesc: [
          {
            min: 0,
            max: 100,
            message: "最大长度100字符",
            trigger: "blur"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: "只能输入中文字符",
            trigger: "blur"
          }
        ]
      },
      props: {
        label: "resName",
        children: "children"
      }
    };
  },
  methods: {
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const data = {
            ...this.form,
            audit: this.form.audit ? "1" : "0",
            resIdList: this.$refs.tree
              .getCheckedKeys()
              .concat(this.$refs.tree.getHalfCheckedKeys()),
            authType: "1002"
          };
          (this.id ? editList(data) : createList(data)).then(() => {
            this.$router.push("/acount/permission");
            this.$store.dispatch("user/changeRoles");
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
    onCancel() {
      this.$router.push("/acount/permission");
    },
    getEditData() {
      const id = this.id;
      fetchEditData(id).then(res => {
        const { authName, authId, authDesc, audit, resIdList } = res.data;
        let status = audit === "1" ? true : false;

        this.form = {
          authName,
          authId,
          authDesc,
          audit: status
        };
        this.checkStrictly = true;

        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(resIdList);
          setTimeout(() => {
            this.checkStrictly = false;
          }, 1.5 * 1000);
        });
      });
    },
    async getSourceList() {
      const res = await fetchSourceList();
      this.sourceList = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0px;
  padding-left: 40px;
}
.aside-container {
  padding-right: 40px;
  border-right: 1px solid #eeeeee;
}

.el-container {
  min-height: calc(100vh - 240px);
}
</style>
