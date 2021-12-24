<template>
  <div class="diaModal">
    <el-dialog
      title="里程碑及诶单执行力分析因子设置"
      :visible.sync="visible"
      :before-close="handleClose"
      width="800px"
    >
      <add-node-modal
        :innerVisible="innerVisible"
        :handleCloseInner="handleCloseInner"
      />
      <add-mile-stone
        :visible="mileStoneVisible"
        :handleCloseInner="handleCloseMileStone"
      />
      <div class="container">
        <div class="left-container">
          <div class="left-container-title">
            <span class="mileMan">里程碑管理</span>
            <span
              style="float: right; cursor: pointer"
              @click="mileStoneVisible = true"
            >
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
                  <i class="el-icon-edit" style="cursor: pointer"></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 10px; cursor: pointer"
                    @click="deleteMile"
                  ></i>
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
                <el-button type="primary" @click="handleOpenInner" size="small"
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
                    @click.native.prevent="removeNode"
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
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddNodeModal from "./AddNodeModal";
import AddMileStone from "./AddMileStone";

export default {
  props: ["visible", "handleClose"],
  components: {
    AddNodeModal,
    AddMileStone,
  },
  data() {
    return {
      dialogVisible: false,
      input: "",
      innerVisible: false,
      mileStoneVisible: false,
      dengmiQueryForm: "",
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
    handleCloseInner() {
      this.innerVisible = false;
    },
    handleCloseMileStone() {
      this.mileStoneVisible = false;
    },
    handleOpenInner() {
      console.log(123, "123123");
      this.innerVisible = true;
    },
    deleteMile() {
      this.$msgbox({
        title: "删除里程碑",
        message: "请先移除该里程碑中所有节点，再进行删除里程碑操作",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    removeNode() {
      this.$msgbox({
        title: "移除节点",
        message:
          "是否确认将“产业公司经办人撰写文件/提交”节点移出里程碑“撰写文件”？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
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
