<template>
  <div class="export-detail">
    <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
      <el-form-item label="导出文件类型">
        <el-select
          v-model="sizeForm.name"
          placeholder="请选择"
          style="width: 320px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否水印">
        <el-radio-group v-model="radio">
          <el-radio :label="3">是</el-radio>
          <el-radio :label="6">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="waterMark">
        <span class="asteriskClass">*</span>
        <span style="margin-left: 10px"> 水印是操作人中文姓名+工号 </span>
      </div>

      <el-form-item label="导出范围">
        <el-radio-group v-model="radio">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">部分</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-tree
        class="tree-container"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      >
      </el-tree>

      <el-form-item size="large">
        <div style="float: right; margin-top: 5px">
          <el-button type="primary" @click="onSubmit" size="small"
            >导出</el-button
          >
          <el-button size="small">预览</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
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
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.export-detail {
  height: 100%;
  overflow: scroll;
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
}
</style>
