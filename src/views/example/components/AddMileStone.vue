<template>
  <el-dialog
    width="800px"
    title="新增里程碑"
    :visible="visible"
    :before-close="handleCloseInner"
    append-to-body
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="里程碑名称">
        <el-input v-model="form.name" placeholder="请输入文字"></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-select
          v-model="form.name"
          multiple
          placeholder="请选择"
          style="width: 100%"
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseInner" size="small">取 消</el-button>
      <el-button type="primary" @click="confirm" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible", "handleCloseInner"],
  data() {
    return {
      form: {
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
      value1: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
