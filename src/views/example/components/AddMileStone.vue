<template>
  <el-dialog
    width="800px"
    title="新增里程碑"
    :visible="visible"
    :before-close="handleCloseInner"
    append-to-body
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="里程碑名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入文字"></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-select
          v-model="form.tasks"
          multiple
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in processNodeData"
            :key="item.taskDefKey"
            :label="item.taskDefName"
            :value="item.taskDefKey"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseInner" size="small">取 消</el-button>
      <el-button type="primary" @click="onSubmit" size="small">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createMile } from "@/api/example";

export default {
  props: ["visible", "handleCloseInner", "processNodeData", "getMilestone"],
  data() {
    return {
      form: {
        name: "",
        tasks: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入里程碑名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          createMile({
            ...this.form,
            tasks: this.processNodeData.filter((item) =>
              this.form.tasks.includes(item.taskDefKey)
            ),
            appKey: "data_asset",
            procDefKey: "DMD_REPAIR_NEW_WORKFLOW",
          }).then(() => {
            this.handleCloseInner();
            this.getMilestone();
            this.$message({
              type: "success",
              message: "创建成功!",
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
