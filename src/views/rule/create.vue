<template>
  <el-container>
    <div class="createRule app-container">
      <bread-text name="模板超时配置"></bread-text>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="以模板平台内部配置规则计算"></el-checkbox>
        <el-checkbox label="不配置超时规则"></el-checkbox>
        <el-checkbox label="自定义超时规则"></el-checkbox>
      </el-checkbox-group>
      <div class="content">
        <span>模板名称: 请假模板</span>
        <span class="content-text ">模板超时: 72h</span>
        <span class="actionStyle deployText">配置</span>
        <div class="title">模板节点</div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="{ row, $index }">
            <span class="actionStyle" @click="handleUpdate(row)">
              编辑
            </span>
          </template>
        </el-table-column>
      </el-table>
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
import { fetchTimeConfig } from "@/api/rule";

export default {
  props: ["id"],
  components: { BreadText },
  data() {
    return {
      data: {},
      checkList: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {
    if (this.id) {
      this.getEditData();
    }
  },
  methods: {
    getEditData() {
      const id = this.id;
      fetchTimeConfig(id).then(res => {
        this.data = res.data;
        console.log(res, "resss");
      });
    },
    onCancel() {
      this.$router.push("/rule/index");
    },
    createData() {
      // this.$refs["dataForm"].validate(valid => {
      //   if (valid) {
      //     const data = {
      //       ...this.form,
      //       audit: this.form.audit ? "1" : "0",
      //       resIdList: this.$refs.tree.getCheckedKeys()
      //     };
      //     createList(data).then(() => {
      //       this.$router.push("/acount/permission");
      //       this.$route.params.getList();
      //       this.$notify({
      //         title: "Success",
      //         message: "Created Successfully",
      //         type: "success",
      //         duration: 2000
      //       });
      //     });
      //   }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.createRule {
  min-height: calc(100vh - 240px);

  .el-checkbox {
    display: block;
    margin-bottom: 22px;
  }
  .content {
    margin-top: 30px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #343a40;
    line-height: 22px;
    .content-text {
      margin-left: 76px;
    }
  }
  .title {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .deployText {
    margin-left: 15px;
  }
}
// .el-container {
//   min-height: calc(100vh - 240px);
// }
</style>
