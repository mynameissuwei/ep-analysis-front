<template>
  <div class="detail-modal">
    <el-dialog
      title="回退明细"
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
                @change="handleSelectChange"
              >
                <el-option
                  v-for="item in nodeChartData.list"
                  :key="item.id"
                  :label="item.name"
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
      <el-table
        :data="nodeChartDataDetail.list"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="taskName" label="节点名称" width="180">
        </el-table-column>
        <el-table-column prop="normalOperation" label="应操作(次)" width="180">
        </el-table-column>
        <el-table-column prop="backOperation" label="回退操作(次)">
          <template slot-scope="{ row }">
            <span style="color: red">{{ row.backOperation }}</span>
          </template>
        </el-table-column>
      </el-table>
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
  props: [
    "visible",
    "handleClose",
    "nodeChartData",
    "nodeChartDataDetail",
    "getNodeChartDetail",
  ],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handleSelectChange(val) {
      let taskDefKey = this.nodeChartData.list.find(
        (item) => item.id === val
      ).taskDefKeys;
      this.getNodeChartDetail(taskDefKey);
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
