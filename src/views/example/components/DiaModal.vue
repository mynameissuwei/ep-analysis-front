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
        :processNodeData="processNodeData"
        :addRow="addRow"
      />
      <add-mile-stone
        :visible="mileStoneVisible"
        :handleCloseInner="handleCloseMileStone"
        :processNodeData="processNodeData"
        :getMilestone="getMilestone"
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
            <el-table
              ref="dragTable"
              :data="mileStoneData"
              :show-header="false"
              row-key="id"
              highlight-current-row
              @current-change="handleCurrentChange"
            >
              <el-table-column prop="name" label="日期" width="180">
              </el-table-column>
              <el-table-column label="操作" width="230">
                <template slot-scope="{ row, $index }">
                  <i class="el-icon-edit" style="cursor: pointer"></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 10px; cursor: pointer"
                    @click="deleteMile(row)"
                  ></i>
                  <i
                    class="el-icon-rank"
                    style="margin-left: 10px; cursor: pointer"
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
              v-model="inputValue"
              placeholder="搜索渠道名称"
              prefix-icon="el-icon-search"
              style="margin: 13px 0px"
              size="small"
              @input="querySearchAsync"
            ></el-input>
            <el-table :data="nodeTableData" max-height="220" :border="true">
              <el-table-column prop="taskDefName" label="节点名称" width="315">
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="
                      deleteRow(scope.$index, nodeTableData)
                    "
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
          :model="standardForm"
          ref="standardForm"
          label-width="100px"
          size="mini"
        >
          <el-row style="margin-top: 15px" :gutter="44">
            <el-col :span="12">
              <el-form-item>
                <label slot="label">标准节点数</label>
                <el-input
                  v-model="standardForm.taskNumLine"
                  placeholder="请输入文字"
                  size="small"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <label slot="label">里程碑耗时</label>
                <el-input
                  v-model="standardForm.timeConsumingLine"
                  placeholder="请输入文字"
                  size="small"
                  clearable
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
import { fetchProcessNode, fetchMilestone, deleteMile } from "@/api/example";
import Sortable from "sortablejs";

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
      inputValue: "",
      innerVisible: false,
      mileStoneVisible: false,
      standardForm: {
        taskNumLine: "",
        timeConsumingLine: "",
      },
      processNodeData: [],
      mileStoneData: [],
      nodeData: [],
      nodeTableData: [],
      currentRow: null,
    };
  },
  created() {
    this.getProcessNode();
    this.getMilestone();
  },

  methods: {
    handleCurrentChange(item) {
      console.log(item.tasks, "valval");
      this.currentRow = item;
      this.nodeTableData = item.tasks;
      this.standardForm = {
        taskNumLine: item.taskNumLine,
        timeConsumingLine: item.timeConsumingLine,
      };
    },
    setCurrent(row) {
      console.log(row, "rowLength");
      this.$refs.dragTable.setCurrentRow(row);
      if (Object.keys(row).length) {
        this.standardForm = {
          taskNumLine: row.taskNumLine,
          timeConsumingLine: row.timeConsumingLine,
        };
      }
    },
    handleCloseInner() {
      this.innerVisible = false;
    },
    handleCloseMileStone() {
      this.mileStoneVisible = false;
    },
    handleOpenInner() {
      this.innerVisible = true;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRow(data) {
      let result = this.nodeTableData;
      let array = data.map((item) => {
        let result = this.processNodeData.find((d) => d.taskDefKey === item);
        return result;
      });
      console.log(
        array,
        data,
        this.processNodeData,
        result.concat(array),
        "datata"
      );
      this.nodeTableData = result.concat(array);
      this.innerVisible = false;
    },
    querySearchAsync(queryString) {
      let nodeList = this.nodeData;

      let results = queryString
        ? nodeList.filter(this.createStateFilter(queryString))
        : nodeList;

      this.processNodeData = results;
    },
    createStateFilter(queryString) {
      return (item) => {
        if (item.taskDefName) {
          return (
            item.taskDefName.toLowerCase().indexOf(queryString.toLowerCase()) !=
            -1
          );
        } else {
          return false;
        }
      };
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: (evt) => {
          const targetRow = this.mileStoneData.splice(evt.oldIndex, 1)[0];
          this.mileStoneData.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
    async getProcessNode() {
      // const { data } = await fetchProcessNode({
      //   appKey: "data_asset",
      //   procDefKey: "DMD_REPAIR_NEW_WORKFLOW",
      // });
      // this.processNodeData = data;
      this.processNodeData = [
        {
          taskDefName: "节点名称",
          taskDefKey: "节点唯一标识",
          milestoneId: 123,
          milestoneName: "撰写文件",
        },
        {
          taskDefName: "节点",
          taskDefKey: "节点唯一",
          milestoneId: null,
          milestoneName: "撰写文件",
        },
        {
          taskDefName: "节点",
          taskDefKey: "节点",
          milestoneId: 456,
          milestoneName: "撰写文件",
        },
      ];
    },
    async getMilestone() {
      const { data } = await fetchMilestone({
        appKey: "data_asset",
        procDefKey: "DMD_REPAIR_NEW_WORKFLOW",
      });
      // this.mileStoneData = data;
      this.mileStoneData = [
        {
          id: 1231,
          name: "撰写文件",
          taskNumLine: 10,
          timeConsumingLine: 15,
          tasks: [
            {
              taskDefKey: "asdfqwdeq",
              taskDefName: "节点名称",
            },
          ],
        },
        {
          id: 121,
          name: "撰文件",
          taskNumLine: 1,
          timeConsumingLine: 1,
          tasks: [
            {
              taskDefKey: "asdfwdeq",
              taskDefName: "节名称",
            },
          ],
        },
      ];

      this.$nextTick(() => {
        this.setSort();
        this.setCurrent(this.mileStoneData ? this.mileStoneData[0] : []);
      });
    },
    deleteMile(row) {
      this.$msgbox({
        title: "删除里程碑",
        message: "请先移除该里程碑中所有节点，再进行删除里程碑操作",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        await deleteMile([row.id]);
        await this.getMilestone();
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
::v-deep .el-table__empty-block {
  width: 100% !important;
}
</style>
