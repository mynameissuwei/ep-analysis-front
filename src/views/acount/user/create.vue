<template>
  <el-container>
    <el-container class="app-container">
      <el-main>
        <bread-text name="添加用户"> </bread-text>
        <el-tabs v-model="activeName" style="margin-top:15px;">
          <el-tab-pane
            v-for="item in tabMapOptions"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          >
            <keep-alive>
              <tab-pane v-if="activeName == item.key" :type="item.key" />
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
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
import TabPane from "../components/TabPane";
import BreadText from "@/components/Breadtext";

export default {
  components: { TabPane, BreadText },
  data() {
    return {
      tabMapOptions: [
        { label: "China", key: "CN" },
        { label: "USA", key: "US" },
        { label: "Japan", key: "JP" },
        { label: "Eurozone", key: "EU" }
      ],
      activeName: "CN"
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onCancel() {
      this.$router.push("/acount/user");
    }
  }
};
</script>

<style lang="scss" scoped></style>
