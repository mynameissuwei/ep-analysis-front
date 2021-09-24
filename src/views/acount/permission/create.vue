<template>
  <el-container>
    <el-container class="app-container">
      <el-aside width="400px" class="aside-container">
        <bread-text></bread-text>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main>
        <bread-text name="资源配置"> </bread-text>
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        >
        </el-tree>
      </el-main>
    </el-container>
    <el-footer class="footerContainer">
      <div>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import BreadText from "@/components/Breadtext";

export default {
  components: { BreadText },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      props: {
        label: "name",
        children: "zones"
      },
      count: 1
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onCancel() {
      this.$router.push("/acount/permission");
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
.footerContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.08);
}
.el-container {
  min-height: calc(100vh - 240px);
}
</style>
