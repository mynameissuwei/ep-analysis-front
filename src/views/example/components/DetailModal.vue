<template>
  <div class="detail-modal">
    <el-dialog
      title="查看明细"
      :visible.sync="visible"
      :before-close="handleClose"
      width="800px"
    >
      <el-row
        :gutter="22"
        type="flex"
        justify="space-between"
        style="line-height: 32px"
      >
        <el-col :span="12">
          <el-row :gutter="5">
            <el-col :span="4">
              <span>里程碑</span>
            </el-col>
            <el-col :span="20">
              <el-select
                v-model="value"
                placeholder="请选择"
                class="my-el-select"
              >
                <el-option
                  v-for="item in nodeChartData.list"
                  :key="item.id"
                  :label="item.taskName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <div class="text-container">
            <span style="margin-right: 8px">里程碑回退耗时</span>
            <span>{{ nodeChartDataDetail.milestoneRollBackTime }}</span>
            <span>人天</span>
          </div>
        </el-col>
      </el-row>
      <div class="without-container">
        <div>
          <img
            class="pic-404__parent"
            src="@/assets/withoutData.png"
            alt="404"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose" size="small"
          >确 定</el-button
        >
        <el-button @click="handleClose" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible", "handleClose", "nodeChartData", "nodeChartDataDetail"],
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
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
.detail-modal {
  .my-el-select {
    width: 100%;
    ::v-deep {
      .el-input__inner {
        height: 32px;
      }

      .el-input__prefix,
      .el-input__suffix {
        height: 32px;
      }

      .el-input__icon {
        line-height: inherit;
      }

      .el-input__suffix-inner {
        display: inline-block;
      }
    }
  }
  .text-container {
    text-align: right;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #0f55fa;
    line-height: 22px;
    height: 100%;
    line-height: 32px;
  }
  .without-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  // ::v-deep {
  //   .el-dialog__header {
  //     border-bottom: 1px solid #e0e3e5;
  //   }
  // }
}
</style>
