<template>
  <div class="diaModal">
    <el-dialog
      title="新增里程碑"
      :visible="false"
      width="800px"
      :before-close="handleClose"
    >
      <div class="container">
        <div class="left-container">
          <div class="left-container-title">
            <span class="mileMan">里程碑管理</span>
            <span style="float: right">
              <i
                class="el-icon-circle-plus-outline"
                style="margin-right: 10px"
              ></i>
              <span>新增里程碑</span></span
            >
          </div>
          <div class="left-container-content">
            <el-table :data="tableData" :show-header="false">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column label="操作" width="230">
                <template slot-scope="{ row, $index }">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right-container">
          <div class="right-container-title">
            <span class="mileMan">撰写文件</span>
            <span>
              <span>
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                  size="small"
                  >添加节点</el-button
                ></span
              ></span
            >
          </div>
          <div class="right-container-content">
            <el-input
              v-model="input"
              placeholder="搜索渠道名称"
              prefix-icon="el-icon-search"
              style="margin: 13px 0px"
              size="small"
            ></el-input>
            <el-table :data="tableData" max-height="220" border="true">
              <el-table-column prop="date" label="日期" width="315">
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small"
                  >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="mileMan">标准值设置</div>
        <el-form
          :model="dengmiQueryForm"
          ref="dengmiQueryForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-row style="margin-top: 15px" :gutter="44">
            <el-col span="12">
              <el-form-item>
                <label slot="label">里程碑</label>
                <el-input
                  v-model="input"
                  placeholder=""
                  size="small"
                  clearable
                  @change=""
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px" :gutter="44">
            <el-col span="12">
              <el-form-item>
                <label slot="label">标准节点数</label>
                <el-input
                  v-model="input"
                  placeholder=""
                  size="small"
                  clearable
                  @change=""
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item>
                <label slot="label">里程碑耗时</label>
                <el-input
                  v-model="input"
                  placeholder=""
                  size="small"
                  clearable
                  @change=""
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {
      dialogVisible: false,
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.diaModal {
  ::v-deep .el-form-item__label {
    color: #999999;
  }
  .container {
    border-radius: 4px;
    height: 363px;
    border: 1px solid #e0e3e5;
    border-radius: 4px;
    display: flex;
    .left-container {
      width: 304px;
      padding: 20px;
      border-right: 1px solid #e0e3e5;
      .left-container-content {
        margin-top: 25px;
      }
    }
    .right-container {
      width: 455px;
      padding: 20px;
      .right-container-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .bottom-container {
    border: 1px solid #e0e3e5;
    border-radius: 4px;
    margin-top: 24px;
    padding: 20px;
  }
  .mileMan {
    font-weight: 500;
    color: #333333;
    line-height: 16px;
  }
}
</style>
