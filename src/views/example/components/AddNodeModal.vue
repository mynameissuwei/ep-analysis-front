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
            <span class="mileMan">主席决策流程共16个节点</span>
          </div>
          <el-input
            v-model="input"
            placeholder="请输入文字"
            prefix-icon="el-icon-search"
            style="margin: 13px 0px"
            size="small"
          ></el-input>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >

          <el-checkbox-group
            v-model="checkedCities"
            class="el-transfer-panel__list"
          >
            <el-checkbox
              class="el-transfer-panel__item"
              v-for="city in cities"
              :label="city"
              :key="city"
              >{{ city }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div class="right-container">
          <div class="right-container-title">
            <span class="mileMan">已选: 5个节点</span>
            <span class="actionStyle">清空</span>
          </div>
          <div class="right-container-content">
            <div
              v-for="item in checkedCities"
              class="right-container-list-content"
            >
              <div class="right-container-list-item">
                <span>{{ item }}</span>
                <span class="actionStyle actionClose">
                  <i class="el-icon-close"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseInner" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];

export default {
  props: ["innerVisible", "handleCloseInner"],
  data() {
    return {
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      checkAll: false,
      input: "",
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      console.log(this.checkedCities, "checkedCities");
      this.isIndeterminate = false;
    },
    confirm() {
      console.log(this.checkedCities, "checkedCities");
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
