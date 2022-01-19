<template>
  <div class="export-detail">
    <el-form ref="form" :model="form" label-width="120px" size="mini">
      <el-form-item label="导出文件类型">
        <el-select
          v-model="form.appKey"
          placeholder="请选择"
          style="width: 320px"
        >
          <el-option
            v-for="item in ['pdf']"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否水印">
        <el-radio-group v-model="form.watermark">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="waterMark">
        <span class="asteriskClass">*</span>
        <span style="margin-left: 10px"> 水印是操作人中文姓名+工号 </span>
      </div>

      <el-form-item label="导出范围">
        <el-radio-group v-model="form.export" @change="handleRadioChange">
          <el-radio :label="true">全部</el-radio>
          <el-radio :label="false">部分</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-tree
        class="tree-container"
        :data="data"
        ref="tree"
        show-checkbox
        node-key="id"
        :props="defaultProps"
      >
      </el-tree>

      <el-form-item size="large">
        <div style="float: right; margin-top: 5px">
          <el-button type="primary" @click="onSubmit" size="small"
            >导出</el-button
          >
          <el-button size="small" @click="onPreview">预览</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    listQuery: {
      type: Object,
      require: true,
    },
    appName: {
      type: String,
      require: true,
    },
    procDefName: {
      type: String,
      require: true,
    },
    processName: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      watermark: false,
      radio: "",
      data: [
        {
          id: "PROCESS_INDEX",
          label: "流程指数",
        },
        {
          id: "NODE",
          label: "节点统计",
          children: [
            {
              id: "MILESTONE_TASK_EXECUTIVE_FORCE_ANALYSIS",
              label: "节点执行力分析",
            },
            {
              id: "MILESTONE_TASK_ROlLBACK_DETAIL",
              label: "里程碑所属节点回退明细",
            },
            {
              id: "TASK_APPROVAL_EFFICIENCY_ANALYSIS",
              label: "节点审批效率分析",
            },
            {
              id: "APPROVAL_TIME_CONSUMING_INTERVAL_DISTRIBUTION",
              label: "审批耗时区间分布",
            },
            {
              id: "TASK_EXECUTION_EVENT_DETAIL",
              label: "节点执行时间分布",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {
        appKey: "pdf",
        watermark: true,
        export: false,
      },
    };
  },
  methods: {
    onSubmit() {
      this.routerPush(true);
    },
    handleRadioChange(val) {
      if (val) {
        this.$refs.tree.setCheckedKeys(["PROCESS_INDEX", "NODE"]);
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    onPreview() {
      this.routerPush(false);
    },
    routerPush(isExport) {
      let routeUrl = this.$router.resolve({
        path: "/process/analysis/report",
        query: {
          ...this.form,
          ...this.listQuery,
          procDefKey: this.listQuery.procDefValue,
          appKey: this.listQuery.templateTypesValue,
          exportRanges: this.$refs.tree.getCheckedKeys(),
          startTime: moment(
            parseInt(this.listQuery.dateValue[0].getTime())
          ).format("YYYY-MM-DD"),
          endTime: moment(
            parseInt(this.listQuery.dateValue[1].getTime())
          ).format("YYYY-MM-DD"),
          export: isExport,
          procDefName: this.processName,
          appName: this.appName,
        },
      });
      window.open(routeUrl.href, "_blank");
      // this.$router.push({
      //   path: "/process/analysis/report",
      //   query: {
      //     ...this.form,
      //     ...this.listQuery,
      //     procDefKey: this.listQuery.procDefValue,
      //     appKey: this.listQuery.templateTypesValue,
      //     exportRanges: this.$refs.tree.getCheckedKeys(),
      //     startTime: moment(
      //       parseInt(this.listQuery.dateValue[0].getTime())
      //     ).format("YYYY-MM-DD"),
      //     endTime: moment(
      //       parseInt(this.listQuery.dateValue[1].getTime())
      //     ).format("YYYY-MM-DD"),
      //     export: isExport,
      //     procDefName: this.processName,
      //     appName: this.appName,
      //   },
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.export-detail {
  height: 100%;
  // overflow: scroll;
  margin-top: 20px;
}
.waterMark {
  font-size: 10px;
  font-weight: 400;
  color: #999999;
  line-height: 14px;
  margin-left: 120px;
  margin-bottom: 20px;
}
.tree-container {
  background: #f8f9fa;
  margin-left: 130px;
  height: 330px;
  padding-top: 12px;
  padding-left: 12px;
}
.waterMark {
  position: relative;
}
.asteriskClass {
  color: red;
  position: absolute;
  top: 3px;
  font-size: 20px;
}
::v-deep .el-checkbox {
  .el-checkbox__label {
    color: #0d54fc;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #0d54fc;
    border-color: #0d54fc;
  }

  .el-checkbox__input.is-focus .el-checkbox__inner,
  .el-checkbox__inner:hover {
    border-color: #0d54fc;
  }
}

::v-deep {
  .el-radio__input.is-checked + .el-radio__label {
    color: #0d54fc !important;
  }
  /* 选中后小圆点的颜色 */
  .el-radio__input.is-checked .el-radio__inner {
    background: #0d54fc !important;
    border-color: #0d54fc !important;
  }
}
</style>
