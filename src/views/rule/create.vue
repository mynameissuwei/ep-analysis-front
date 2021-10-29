<template>
  <el-container>
    <div class="createRule app-container">
      <bread-text name="模板超时配置"></bread-text>
      <el-radio-group v-model="radio">
        <el-radio :label="0">以模板平台内部配置规则计算</el-radio>
        <el-radio :label="1">自定义超时规则</el-radio>
        <el-radio :label="2">不配置超时规则</el-radio>
      </el-radio-group>

      <div class="content">
        <span class="template-class">模板名称:</span>
        <span>{{ data.procDefName }}</span>
        <span class="content-text">模板超时:</span>
        <span v-if="!isSelected">{{ value }}</span>
        <el-select v-else v-model="value" placeholder="请选择" size="mini">
          <el-option
            v-for="item in rangeNumber"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <span
          v-if="!isSelected"
          class="actionStyle deployText"
          @click="isSelected = true"
          >配置</span
        >
        <span v-else>
          <span @click="isSelected = false" class="actionStyle ">保存</span>
          <span @click="isSelected = false" class="actionStyle ">取消</span>
        </span>
        <div class="title">模板节点</div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="taskDefKey" label="节点编号" width="180">
        </el-table-column>
        <el-table-column prop="taskDefName" label="节点名称" width="180">
        </el-table-column>
        <el-table-column width="350px" label="节点超时">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-select
                v-model="row.overTime"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in rangeNumber"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                取消
              </el-button>
            </template>
            <span v-else>{{ row.overTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="{ row, $index }">
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              确定
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit = !row.edit"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-footer class="footerContainer">
      <div>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="createData">保存</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import BreadText from "@/components/Breadtext";
import { fetchTimeConfig, postTimeConfig } from "@/api/rule";
import rangeNumber from "@/utils/numberRange";

export default {
  components: { BreadText },
  data() {
    return {
      data: {},
      radio: 0,
      isSelected: false,
      value: 0,
      rangeNumber: rangeNumber(),
      tableData: []
    };
  },
  created() {
    this.getEditData();
  },
  methods: {
    getEditData() {
      const query = this.$route.query;
      fetchTimeConfig({
        condition: {
          appKey: "multiTenant",
          procDefKey: "process_890183536603914240:1:2964640"
        }
      }).then(res => {
        this.data = res.data;
        this.value = res.data.procOverTime;
        this.radio = Number(res.data.configType);

        let tableData = JSON.parse(res.data.taskOverConfig);
        this.tableData = tableData.map(v => {
          this.$set(v, "edit", false);
          v.originalTitle = v.overTime;
          return v;
        });
      });
    },
    onCancel() {
      this.$router.push("/rule/index");
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.overTime;
    },
    cancelEdit(row) {
      row.overTime = row.originalTitle;
      row.edit = false;
    },
    createData() {
      const data = {
        ...this.data,
        ...this.$route.query,
        configType: this.radio,
        procOverTime: this.value,
        taskOverConfig: JSON.stringify(this.tableData)
      };
      postTimeConfig(data).then(() => {
        this.$router.push("/rule/index");
        this.$notify({
          title: "Success",
          message: "Created Successfully",
          type: "success",
          duration: 2000
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.createRule {
  min-height: calc(100vh - 240px);
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .template-class {
    margin-right: 20px;
  }
  .el-checkbox {
    display: block;
    margin-bottom: 22px;
  }
  .content {
    margin-top: 30px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #343a40;
    line-height: 22px;
    .el-select {
      width: 100px;
      margin-right: 10px;
    }
    .content-text {
      margin-left: 76px;
      margin-right: 20px;
    }
  }
  .title {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .deployText {
    margin-left: 15px;
  }
}
// .el-container {
//   min-height: calc(100vh - 240px);
// }
</style>
