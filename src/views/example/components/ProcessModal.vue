<template>
  <div class="process-modal-container">
    <el-dialog
      title="流程指数因子设置"
      :visible.sync="dialogVisible"
      width="640px"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="100px" size="mini">
        <div class="bread-container">
          <bread-text
            name="流效率设置"
            :style="{ color: '#333333', fontSize: '16px', fontWeight: 500 }"
          />
          <div class="flex-container warntext-container">
            <img src="@/assets/yellowWarn.svg" class="warnClass" alt="" />
            <span>当前状态：中预警</span>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="form.rule.flowEffic.expect"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效红线 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.flowEffic.redLine"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.flowEffic.high"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.flowEffic.middle"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.flowEffic.low"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="bread-container">
          <bread-text
            name="时效设置"
            style="color: #333333; font-size: 16px; font-weight: 500"
          />
          <div class="flex-container warntext-container">
            <img src="@/assets/warn.svg" class="warnClass" alt="" />
            <span>当前状态：高预警</span>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="form.rule.timeEffic.expect"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效红线 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.timeEffic.redLine"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.timeEffic.high"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.timeEffic.middle"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.timeEffic.low"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="bread-container">
          <bread-text
            name="人效设置"
            style="color: #333333; font-size: 16px; font-weight: 500"
          />
          <div class="flex-container warntext-container">
            <img src="@/assets/warn.svg" class="warnClass" alt="" />
            <span>当前状态：高预警</span>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="form.rule.personEffic.expect"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效红线 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.personEffic.redLine"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.personEffic.high"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.personEffic.middle"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="form.rule.timeEffic.low"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="onSubmit"
          size="small"
          :loading="buttonLoading"
          >保存</el-button
        >
        <el-button @click="handleClose" size="small">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadText from "@/components/Breadtext";
import { addProcIndexRule } from "@/api/example";
import { Message } from "element-ui";

export default {
  components: { BreadText },
  props: [
    "dialogVisible",
    "handleClose",
    "procFactorRuleData",
    "getProcIndexRule",
    "getProcFactor",
    "listQuery",
  ],
  created() {
    console.log("initasdf");
    this.init();
  },
  data() {
    return {
      form: {},
      buttonLoading: false,
    };
  },
  methods: {
    init() {
      console.log(this.procFactorRuleData, "procFactorRuleData");
      if (this.procFactorRuleData) {
        this.form = this.procFactorRuleData;
      }
    },
    onSubmit() {
      this.buttonLoading = true;
      addProcIndexRule({
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefValue,
        type: "TYPE_PROC_INDEX",
        ...this.form,
      })
        .then(() => {
          this.getProcIndexRule();
          this.getProcFactor();
          this.handleClose();
          this.buttonLoading = false;
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
.process-modal-container {
  ::v-deep {
    .el-input-number__decrease,
    .el-input-number__increase {
      background-color: white;
    }
    .el-form-item__label {
      color: #999999;
    }
  }
}
.bread-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.warnClass {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.flex-container {
  display: flex;
  align-items: center;
}
.warntext-container {
  margin-bottom: 20px;
}
</style>
