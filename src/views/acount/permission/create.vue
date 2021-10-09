<template>
  <el-container>
    <el-container class="app-container">
      <el-aside width="400px" class="aside-container">
        <bread-text></bread-text>
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="权限名称" prop="authName">
            <el-input v-model="form.authName"></el-input>
          </el-form-item>
          <el-form-item label="权限编码" prop="authId">
            <el-input v-model="form.authId"></el-input>
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
          ref="tree"
          node-key="resId"
          :props="props"
          :data="sourceList"
          show-checkbox
          @check-change="handleCheckChange"
        >
        </el-tree>
      </el-main>
    </el-container>
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
import { addList, fetchSourceList } from "@/api/permission";

export default {
  components: { BreadText },
  data() {
    return {
      form: {
        authName: "",
        authId: "",
        authDesc: "",
        audit: false
      },
      rules: {
        authName: [
          { required: true, message: "请输入权限名称", trigger: "blur" }
        ],
        authId: [{ required: true, message: "请输入权限编码", trigger: "blur" }]
      },
      props: {
        label: "resName",
        children: "children"
      },
      count: 1,
      sourceList: []
    };
  },
  created() {
    this.getSourceList();
  },
  methods: {
    createData() {
      console.log(this.$refs.tree.getCheckedNodes(), "nodes");
      console.log(this.$refs.tree.getCheckedKeys(), "keys");
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          console.log(this.form, "form");
        }
      });
    },
    onCancel() {
      this.$router.push("/acount/permission");
    },
    async getSourceList() {
      const res = await fetchSourceList();
      this.sourceList = res.data;
      console.log(res, "resss");
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
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
