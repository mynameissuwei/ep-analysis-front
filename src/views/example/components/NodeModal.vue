<template>
  <div class="node-modal">
    <el-dialog
      title="节点执行事件明细因子设置"
      :visible.sync="visible"
      :before-close="handleClose"
      width="900px"
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
              <div class="ant-input-number-group-addon">$</div>
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
              <div class="ant-input-number-group-addon">$</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="small"
          >确 定</el-button
        >
        <el-button @click="handleClose" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible", "handleClose"],
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
};
</script>

<style lang="scss" scoped>
.node-modal {
  .modal-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }
  ::v-deep {
    .el-input-number__decrease,
    .el-input-number__increase {
      background-color: white;
    }
    .el-form-item__label {
      color: #999999;
    }
    .el-form-item__label {
      color: #999999;
    }
    .el-input__inner {
      border-radius: 0px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    input {
      border-right: 0px;
    }
  }
  .ant-input-number-group-addon {
    display: inline-block;
    width: 30px;
    height: 28px;
    position: relative;
    top: 2px;
    border-left: 0px;
    border: 1px solid #d9d9d9;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    background-color: #fafafa;
    color: #000000d9;
  }
}
</style>
