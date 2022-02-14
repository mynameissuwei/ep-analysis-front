<template>
  <div class="process-modal-container">
    <el-dialog
      title="流程指数因子设置"
      :visible.sync="dialogVisible"
      width="640px"
      :before-close="handleClose"
    >
      <div class="alert-container">
        <div class="alert-item">
          1.高预警是红灯,中预警黄灯,低预警是绿灯,初始化默认是灰色灯
        </div>
        <div class="alert-item">
          2.流效率设置规则:
          流效期望≥流效红线≥低预警>中预警>高预警,流效率期望一般设置≥10%的数字
        </div>
        <div class="alert-item">
          3.时效设置规则: 时效红线≥高预警>中预警>低预警>时效期望
        </div>
        <div class="alert-item">
          4.人效设置规则: 人效红线≥高预警>中预警>低预警>人效期望
        </div>
      </div>
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
                :step="0.5"
                :min="0.1"
              ></el-input-number>
              <span class="unit">%</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >流效红线 <span style="color: #333333"><</span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.flowEffic.redLine"
                @change="(val) => handleRedLineInputChange(val, 'flowEffic')"
              ></el-input-number>
              <span class="unit">%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333"><</span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.flowEffic.high"
                @change="(val) => handleHighInputChange(val, 'flowEffic')"
              ></el-input-number>
              <span class="unit">%</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333"><</span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.flowEffic.middle"
                @change="(val) => handleMediumInputChange(val, 'flowEffic')"
              ></el-input-number>
              <span class="unit">%</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333"><</span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.flowEffic.low"
              ></el-input-number>
              <span class="unit">%</span>
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
                >时效期望 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.timeEffic.expect"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >时效红线 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.timeEffic.redLine"
                @change="(val) => handleRedLineInputChange(val, 'timeEffic')"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.timeEffic.high"
                @change="(val) => handleHighInputChange(val, 'timeEffic')"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                v-model="form.rule.timeEffic.middle"
                @change="(val) => handleMediumInputChange(val, 'timeEffic')"
                :min="0.1"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                v-model="form.rule.timeEffic.low"
                :min="0.1"
              ></el-input-number>
              <span class="unit">人天</span>
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
                >人效期望 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.personEffic.expect"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >人效红线 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.personEffic.redLine"
                @change="(val) => handleRedLineInputChange(val, 'personEffic')"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.personEffic.high"
                @change="(val) => handleHighInputChange(val, 'personEffic')"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.personEffic.middle"
                @change="(val) => handleMediumInputChange(val, 'personEffic')"
              ></el-input-number>
              <span class="unit">人天</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333">></span>
              </label>
              <el-input-number
                :step="0.5"
                :min="0.1"
                v-model="form.rule.personEffic.low"
              ></el-input-number>
              <span class="unit">人天</span>
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
    "driver",
  ],
  created() {
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
      if (this.procFactorRuleData) {
        this.form = this.procFactorRuleData;
      }
    },
    handleRedLineInputChange(val, type) {
      // if (type === "timeEffic" || type === "personEffic") {
      //   if (this.form.rule[type].high > val) {
      //     this.form.rule[type].high = val;
      //
      //     this.form.rule[type].middle = val - 0.5;
      //     this.form.rule[type].low = val - 1;
      //     this.form.rule[type].expect = val - 1.5;
      //   }
      // } else {
      //   if (this.form.rule[type].high > val) {
      //     this.form.rule[type].high = val;
      //     this.form.rule[type].middle = val;
      //     this.form.rule[type].low = val;
      //   }
      // }
    },
    handleHighInputChange(val, type) {
      // if (type === "timeEffect" || type === "personEffic") {
      //   if (this.form.rule[type].middle > val) {
      //     this.form.rule[type].middle = val - 0.5;
      //     this.form.rule[type].low = val - 1;
      //     this.form.rule[type].expect = val - 1.5;
      //   }
      // } else {
      //   if (this.form.rule[type].middle > val) {
      //     this.form.rule[type].middle = val;
      //     this.form.rule[type].low = val;
      //   }
      // }
    },
    handleMediumInputChange(val, type) {
      // if (type === "timeEffect" || type === "personEffect") {
      //   if (this.form.rule[type].low > val) {
      //     this.form.rule[type].low = val - 0.5;
      //     this.form.rule[type].expect = val - 1;
      //   }
      // } else {
      //   if (this.form.rule[type].low > val) {
      //     this.form.rule[type].low = val;
      //   }
      // }
    },
    onSubmit() {
      this.buttonLoading = true;
      addProcIndexRule({
        tenantId: this.$store.state.user.tenantId,
        procDefKey: this.listQuery.procDefValue,
        type: "TYPE_PROC_INDEX",
        ...this.form,
      })
        .then(async () => {
          await this.getProcIndexRule();
          await this.getProcFactor();
          await this.handleClose();
          this.buttonLoading = false;
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          this.$nextTick(() => {
            this.driver.reset();
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
.unit {
  margin-left: 10px;
}
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
  margin-right: 70px;
}
.alert-container {
  background-color: #f4f4f5;
  color: #909399;
  padding: 10px;
  margin-bottom: 20px;
  .alert-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
