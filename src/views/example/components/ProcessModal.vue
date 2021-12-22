<template>
  <div class="process-modal-container">
    <el-dialog
      title="流程指数因子设置"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form
        :model="dengmiQueryForm"
        ref="dengmiQueryForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <bread-text name="流效率设置" style="color: #333333" />
        <el-row>
          <el-col span="12">
            <el-form-item>
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item>
              <label slot="label"
                >流效红线 <span style="color: #333333">≤</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item>
              <label slot="label"
                >高预警 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item>
              <label slot="label"
                >中预警 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item>
              <label slot="label"
                >低预警 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <bread-text name="时效设置" style="color: #333333" />
        <el-row>
          <el-col span="12">
            <el-form-item label="流效期望  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="流效红线  ≤  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="高预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="中预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="低预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <bread-text name="时效设置" style="color: #333333" />
        <el-row>
          <el-col span="12">
            <el-form-item label="流效期望  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="流效红线  ≤  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="高预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="中预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="低预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <bread-text name="节点价值分布设置" style="color: #333333" />
        <el-row>
          <el-col span="12">
            <el-form-item label="流效期望  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="流效红线  ≤  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="高预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="中预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="低预警  ≥  ">
              <label slot="label"
                >流效期望 <span style="color: #333333">≥</span>
              </label>
              <el-input-number
                v-model="dengmiQueryForm.mimian"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit" :loading="buttonLoading">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadText from "@/components/Breadtext";

export default {
  components: { BreadText },
  props: ["dialogVisible"],
  name: "dengmiQuery",
  data() {
    return {
      dengmiQueryForm: {
        mimian: "",
        mimu: "",
        mige: "",
        midi: "",
        zuozhe: "",
        midiLength: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.process-modal-container {
  ::v-deep .el-form-item__label {
    color: #999999;
  }
}
</style>
