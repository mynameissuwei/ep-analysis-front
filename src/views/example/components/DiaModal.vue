<template>
  <div class="diaModal">
    <el-dialog
      title="里程碑节点执行力分析因子设置"
      :visible.sync="visible"
      :before-close="handleClose"
      width="800px"
    >
      <add-node-modal
        :innerVisible="innerVisible"
        :handleCloseInner="handleCloseInner"
        :processNodeData="processNodeData"
        :addRow="addRow"
        :currentRow="currentRow"
      />
      <add-mile-stone
        v-if="mileStoneVisible"
        :visible="mileStoneVisible"
        :handleCloseInner="handleCloseMileStone"
        :processNodeData="processNodeData"
        :getMilestone="getMilestone"
        :appKey="this.listQuery.templateTypesValue"
        :procDefKey="this.listQuery.procDefValue"
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
              max-height="300"
              @current-change="handleCurrentChange"
            >
              <el-table-column prop="name" label="日期" width="180">
                <template slot-scope="{ row }">
                  <template v-if="row.edit">
                    <el-input
                      v-model="row.name"
                      class="edit-input"
                      size="small"
                    />
                  </template>
                  <span v-else>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="230">
                <template slot-scope="{ row, $index }">
                  <img
                    src="@/assets/editIcon.svg"
                    v-if="row.edit"
                    style="cursor: pointer"
                    @click="confirmEdit(row)"
                    alt=""
                  />
                  <img
                    v-else
                    style="cursor: pointer"
                    @click="row.edit = !row.edit"
                    src="@/assets/editBlueIcon.svg"
                    alt=""
                  />
                  <img
                    style="margin-left: 10px; cursor: pointer"
                    @click="deleteMile(row)"
                    src="@/assets/deleteIcon.svg"
                    alt=""
                  />
                  <img
                    src="@/assets/dragIcon.svg"
                    style="margin-left: 10px; cursor: pointer"
                    alt=""
                  />

                  <!-- <i
                    v-if="row.edit"
                    class="el-icon-share"
                    style="cursor: pointer"
                    @click="confirmEdit(row)"
                  ></i>
                  <i
                    v-else
                    class="el-icon-edit"
                    style="cursor: pointer"
                    @click="row.edit = !row.edit"
                  ></i> -->
                  <!-- <i
                    class="el-icon-delete"
                    style="margin-left: 10px; cursor: pointer"
                    @click="deleteMile(row)"
                  ></i>
                  <i
                    class="el-icon-rank"
                    style="margin-left: 10px; cursor: pointer"
                  ></i> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right-container">
          <div>
            <div class="right-container-title">
              <span class="mileMan">撰写文件</span>
              <span>
                <span>
                  <el-button
                    type="primary"
                    @click="handleOpenInner"
                    size="small"
                    :disabled="!this.currentRow"
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
              <el-table
                :data="nodeTableData"
                max-height="220"
                :border="true"
                :header-cell-style="{ background: '#EEF4FC' }"
              >
                <el-table-column
                  prop="taskDefName"
                  label="节点名称"
                  width="315"
                >
                </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="
                        deleteRow(scope.$index, nodeTableData, searchTableData)
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
      </div>

      <div class="bottom-container">
        <div class="mileMan">标准值设置</div>
        <el-form
          :model="standardForm"
          :rules="rules"
          ref="standardForm"
          label-width="100px"
          size="mini"
        >
          <el-row style="margin-top: 15px" :gutter="44">
            <el-col :span="12">
              <el-form-item label="标准节点数" prop="taskNumLine">
                <el-input
                  v-model="standardForm.taskNumLine"
                  placeholder="请输入文字"
                  size="small"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="里程碑耗时" prop="timeConsumingLine">
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
        <el-button
          type="primary"
          @click="onSubmit"
          size="small"
          :loading="buttonLoading"
          :disabled="!this.currentRow"
          >确 定</el-button
        >
        <el-button @click="handleClose" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddNodeModal from "./AddNodeModal";
import AddMileStone from "./AddMileStone";
import {
  fetchProcessNode,
  fetchMilestone,
  deleteMile,
  editMile,
} from "@/api/example";
import Sortable from "sortablejs";
import { Message } from "element-ui";

export default {
  props: ["visible", "handleClose", "listQuery"],
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
      rules: {
        taskNumLine: [
          { required: true, message: "请输入标准节点数", trigger: "blur" },
          {
            pattern: /^\d{1,}$/,
            message: "只能输入数字",
            trigger: "blur",
          },
        ],
        timeConsumingLine: [
          { required: true, message: "请输入里程碑耗时", trigger: "blur" },
          {
            pattern: /^\d{1,}$/,
            message: "只能输入数字",
            trigger: "blur",
          },
        ],
      },
      processNodeData: [],
      mileStoneData: [],
      nodeData: [],
      nodeTableData: [],
      oldNodeTableData: [],
      searchTableData: [],
      currentRow: {},
      buttonLoading: false,
    };
  },
  created() {
    this.getProcessNode();
    this.getMilestone();
  },

  methods: {
    confirmEdit(row) {
      row.edit = false;
      this.currentRow = row;
    },
    handleCurrentChange(item, oldItem) {
      // this.$set(oldItem, "edit", false);
      if (oldItem) oldItem.edit = false;
      this.currentRow = item;
      this.nodeTableData = item.tasks || [];
      this.searchTableData = item.tasks || [];
      this.oldNodeTableData = item.tasks ? item.tasks.slice() : [];
      this.standardForm = {
        taskNumLine: item.taskNumLine,
        timeConsumingLine: item.timeConsumingLine,
      };
      // 回退名字
      this.mileStoneData = this.mileStoneData.map((item) => ({
        ...item,
        name: item.originName,
      }));
    },
    setCurrent(row) {
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
    deleteRow(index, rows, searchRows) {
      rows.splice(index, 1);
      searchRows.splice(index, 1);
    },
    addRow(data) {
      let result = this.nodeTableData;
      let resultKeys = this.nodeTableData.map((item) => item.taskDefKey);
      let array = data
        .filter((d) => {
          if (resultKeys.includes(d)) return false;
          return true;
        })
        .map((item) => {
          let result = this.processNodeData.find((d) => d.taskDefKey === item);
          return result;
        });
      this.nodeTableData = result.concat(array);
      this.searchTableData = result.concat(array);
      this.innerVisible = false;
    },
    querySearchAsync(queryString) {
      let nodeList = this.searchTableData;
      let results = queryString
        ? nodeList.filter(this.createStateFilter(queryString))
        : nodeList;
      this.nodeTableData = results;
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
      const { data } = await fetchProcessNode({
        appKey: this.listQuery.templateTypesValue,
        procDefKey: this.listQuery.procDefValue,
      });
      this.processNodeData = data;
    },
    async getMilestone() {
      const { data } = await fetchMilestone({
        appKey: this.listQuery.templateTypesValue,
        procDefKey: this.listQuery.procDefValue,
      });
      let result = data.map((v) => {
        this.$set(v, "edit", false);
        v.originName = v.name;
        return v;
      });
      this.mileStoneData = result;
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
    onSubmit() {
      this.$refs["standardForm"].validate((valid) => {
        if (valid) {
          this.buttonLoading = true;

          let addedTasks = [];
          let removedTasks = [];
          let oldNodeTableDef = this.oldNodeTableData.map(
            (item) => item.taskDefKey
          );
          let nodeTableDef = this.nodeTableData.map((item) => item.taskDefKey);
          nodeTableDef.forEach((item) => {
            if (!oldNodeTableDef.includes(item)) {
              let result = this.nodeTableData.find(
                (d) => d.taskDefKey === item
              );
              addedTasks.push(result);
            }
          });
          oldNodeTableDef.forEach((item) => {
            if (!nodeTableDef.includes(item)) {
              removedTasks.push(item);
            }
          });

          editMile({
            ...this.standardForm,
            timeConsumingLine: Number(this.standardForm.timeConsumingLine),
            addedTasks,
            removedTasks,
            id: this.currentRow.id,
            name: this.currentRow.name,
          })
            .then(() => {
              this.buttonLoading = false;
              this.handleClose();
              this.$message({
                type: "success",
                message: "保存成功",
              });
            })
            .catch((err) => {
              this.buttonLoading = false;
            });
        } else {
          return false;
        }
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
    font-size: 16px;
  }
}
::v-deep {
  .el-table__empty-block {
    width: 100% !important;
  }
}
</style>
