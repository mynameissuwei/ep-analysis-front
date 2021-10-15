<template>
  <el-dialog title="配置角色" :visible.sync="dialogVisible" width="670px">
    <div class="diag-container">
      <div>
        <span>用户姓名:</span>
        <span class="text-right">123</span>
      </div>
      <div class="user-text">
        <span>用户账号:</span>
        <span class="text-right">123</span>
      </div>
      <div>
        <span>itcode:</span>
        <span class="text-right">123</span>
      </div>
      <div class="checkGroup">
        <div class="checkbox-left">选择角色:</div>
        <div class="checkbox-right">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用"></el-checkbox>
            <el-checkbox label="选中且禁用"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      checkList: []
    };
  }
};
</script>

<style lang="scss" scoped>
.user-text {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-checkbox {
  display: block;
}
.text-right {
  margin-left: 16px;
}
.checkGroup {
  margin-top: 41px;
  margin-bottom: 41px;
  display: inline-flex;
  width: 100%;
  .checkbox-right {
    margin-left: 15px;
    width: 491px;
    border-radius: 2px;
    border: 1px solid #e0e3e5;
    padding: 10px;
  }
}
.el-checkbox-group {
  display: inline-block;
  margin-left: 16px;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
</style>
