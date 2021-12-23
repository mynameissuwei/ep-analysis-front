<template>
  <div class="node-modal">
    <el-dialog
      title="节点执行事件明细因子设置"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="800px"
    >
      <span class="modal-title">秒批建议自动化值设置</span>
      <el-form
        :model="dengmiQueryForm"
        ref="dengmiQueryForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-row style="margin-top: 29px">
          <el-col span="8">
            <el-form-item>
              <label slot="label">强度建议 </label>
              <el-input-number
                v-model="num"
                controls-position="right"
                @change="handleChange"
                :min="1"
                :max="10"
              ></el-input-number>
              <div class="ant-input-number-group-addon">$</div>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item>
              <label slot="label">中度建议 </label>
              <el-input-number
                v-model="num"
                controls-position="right"
                @change="handleChange"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item>
              <label slot="label">建议 </label>
              <el-input-number
                v-model="num"
                controls-position="right"
                @change="handleChange"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="small"
          >确 定</el-button
        >
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      dengmiQueryForm: "",
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
  props: ["dialogVisible"],
};
</script>

<style lang="scss" scoped>
.node-modal {
  .modal-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }
  ::v-deep .el-form-item__label {
    color: #999999;
  }
  .ant-input-number-group-addon {
    display: inline-block;
    width: 31.67px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
}
</style>
