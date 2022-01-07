<template>
  <div>
    <el-dialog
      width="800px"
      title="添加节点"
      :visible="innerVisible"
      :before-close="handleCloseInner"
      append-to-body
    >
      <div class="container">
        <div class="left-container">
          <div class="left-container-title">
            <span class="mileMan">
              <span>主席决策流程共</span>
              <span>{{ data.length }}</span>
              <span>个节点</span>
            </span>
          </div>
          <el-input
            v-model="input"
            placeholder="请输入文字"
            prefix-icon="el-icon-search"
            style="margin: 13px 0px"
            size="small"
            @input="handleInput"
          ></el-input>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >

          <el-checkbox-group
            v-model="checkedValue"
            class="el-transfer-panel__list"
            @change="handleCheckedValueChange"
          >
            <el-checkbox
              class="el-transfer-panel__item"
              v-for="item in processNodeData"
              :label="item.taskDefKey"
              :key="item.taskDefKey"
              :disabled="!item.milestoneId"
              >{{ item.taskDefName }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div class="right-container">
          <div class="right-container-title">
            <span class="mileMan">
              <span>已选:</span>
              <span>{{ checkedValue.length }}</span>
              <span>个节点</span>
            </span>
            <span class="actionStyle" @click="handleDeleteAll">清空</span>
          </div>
          <div class="right-container-content">
            <div
              v-for="(item, index) in checkedValue"
              class="right-container-list-content"
            >
              <div class="right-container-list-item">
                <span>{{ item }}</span>
                <span class="actionStyle actionClose">
                  <i
                    class="el-icon-close"
                    @click="handleDeleteCheckbox(index)"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseInner" size="small">取 消</el-button>
        <el-button type="primary" @click="addRow(checkedValue)" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["innerVisible", "handleCloseInner", "processNodeData", "addRow"],
  data() {
    return {
      checkedValue: [],
      isIndeterminate: true,
      checkAll: false,
      data: this.processNodeData,
      input: "",
    };
  },
  created() {
    this.checkedValue = [];
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedValue = val ? this.data.map((item) => item.taskDefName) : [];
      this.isIndeterminate = false;
    },
    handleDeleteCheckbox(index) {
      let result = this.checkedValue;
      result.splice(index, 1);
      this.checkedValue = result;
    },
    handleCheckedValueChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.data.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.data.length;
    },
    handleDeleteAll() {
      this.checkedValue = [];
      this.checkAll = false;
    },
    handleInput(queryString) {
      let nodeList = this.processNodeData;

      let results = queryString
        ? nodeList.filter(this.createStateFilter(queryString))
        : nodeList;

      this.data = results;
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  border-radius: 4px;
  height: 363px;
  border: 1px solid #e0e3e5;
  border-radius: 4px;
  display: flex;
  .left-container {
    width: 381px;
    padding: 20px;
    border-right: 1px solid #e0e3e5;
  }
  .right-container {
    width: 381px;
    .right-container-title {
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }
    .right-container-content {
      .right-container-list-content {
        .right-container-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 20px;
          height: 36px;
        }
        .actionClose {
          display: none;
        }
      }
      .right-container-list-content:hover {
        background: #eef4fc;
        .actionClose {
          display: block;
        }
      }
    }
  }
}

.mileMan {
  font-weight: 500;
  color: #333333;
  line-height: 16px;
}
.el-transfer-panel__list {
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
  .el-transfer-panel__item {
    padding-left: 0px;
    height: 30px;
    line-height: 30px;
    display: block !important;
  }
}

// ::v-deep {
// }
</style>
