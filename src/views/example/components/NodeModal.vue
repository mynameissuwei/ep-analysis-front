<template>
  <div class="node-modal">
    <el-dialog
      title="节点执行事件明细因子设置"
      :visible.sync="visible"
      :before-close="handleClose"
      width="900px"
    >
      <span class="modal-title">秒批建议自动化值设置</span>
      <el-form :model="form" ref="form" label-width="100px" size="mini">
        <el-row style="margin-top: 29px">
          <el-col :span="8">
            <el-form-item>
              <label slot="label">强度建议 </label>
              <el-input-number
                v-model="form.strongRecommend"
                controls-position="right"
              ></el-input-number>
              <div class="ant-input-number-group-addon">$</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <label slot="label">中度建议 </label>
              <el-input-number
                v-model="form.mediumRecommend"
                controls-position="right"
              ></el-input-number>
              <div class="ant-input-number-group-addon">$</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <label slot="label">建议 </label>
              <el-input-number
                v-model="form.recommend"
                controls-position="right"
              ></el-input-number>
              <div class="ant-input-number-group-addon">$</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="onSubmit"
          size="small"
          >确 定</el-button
        >
        <el-button @click="handleClose" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchEvent, createEvent } from "@/api/example";
import { Message } from "element-ui";

export default {
  props: ["visible", "handleClose", "listQuery"],
  data() {
    return {
      form: {
        strongRecommend: 0,
        mediumRecommend: 0,
        recommend: 0,
      },
      buttonLoading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await fetchEvent({
        appKey: this.listQuery.templateTypesValue,
        procDefKey: this.listQuery.procDefValue,
      });
      this.form = data ? data : this.form;
    },
    onSubmit() {
      this.buttonLoading = true;
      createEvent({
        ...this.form,
        appKey: this.listQuery.templateTypesValue,
        procDefKey: this.listQuery.procDefValue,
      })
        .then(() => {
          this.buttonLoading = false;
          this.handleClose();
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .catch((err) => {
          this.buttonLoading = false;
        });
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
