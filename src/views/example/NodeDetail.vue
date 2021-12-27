<template>
  <div class="nodeDetail">
    <div class="iconContainer">
      <div>里程碑节点执行力分析</div>
      <div class="iconClass" @click="handleShow">
        <i class="el-icon-setting"></i>
      </div>
    </div>

    <div class="nodeDetailContainer">
      <div class="iconContainer">
        <div>节点审批效率分析</div>
        <div>环比至 2015-08-02 ～ 201</div>
      </div>
      <div id="histogram" style="width: 100%; height: 190px" />
      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          耗时上升节点出现4个。平均耗时中5个节点在上升；平均处理中1个节点在上升，平均等待中3个节点在上升；该流程审批效率环比降低5/人天。
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="nodeDetailContainer">
      <div class="iconContainer">
        <div>节点审批效率分析</div>
        <div>环比至 2015-08-02 ～ 201</div>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="150" fixed>
        </el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
        </el-table-column>
      </el-table>

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          耗时上升节点出现4个。平均耗时中5个节点在上升；平均处理中1个节点在上升，平均等待中3个节点在上升；该流程审批效率环比降低5/人天。
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="nodeDetailContainer">
      <div class="iconContainer">
        <div>审批耗时区间分布</div>
        <div>环比至 2015-08-02 ～ 201</div>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="150" fixed>
        </el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
        </el-table-column>
      </el-table>

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          耗时上升节点出现4个。平均耗时中5个节点在上升；平均处理中1个节点在上升，平均等待中3个节点在上升；该流程审批效率环比降低5/人天。
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="nodeDetailContainer">
      <div class="iconContainer">
        <div>节点执行事件明细</div>
        <div class="iconClass" @click="showNode">
          <i class="el-icon-setting"></i>
        </div>
      </div>

      <el-row
        type="flex"
        justify="space-between"
        class="row-container"
        :gutter="44"
      >
        <el-col :span="12">
          <el-row :gutter="4">
            <el-col :span="6">
              <span>选择占比类型</span>
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="input"
                placeholder="123"
                size="small"
                clearable
                @change="handleChange"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="4">
            <el-col :span="6">
              <span>选择占比类型</span>
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="input"
                placeholder="123"
                size="small"
                clearable
                @change="handleChange"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          耗时上升节点出现4个。平均耗时中5个节点在上升；平均处理中1个节点在上升，平均等待中3个节点在上升；该流程审批效率环比降低5/人天。
        </div>
      </div>

      <el-divider></el-divider>
    </div>

    <dia-modal :visible="dialogVisible" :handleClose="handleClose" />
    <node-modal :visible="nodeVisible" :handleClose="closeNode" />
  </div>
</template>

<script>
import DiaModal from "./components/DiaModal";
import NodeModal from "./components/NodeModal";
import * as echarts from "echarts";
import resize from "@/components/mixins/resize.js";

export default {
  mixins: [resize],
  components: {
    DiaModal,
    NodeModal,
  },
  data() {
    return {
      input: "",
      dialogVisible: false,
      nodeVisible: false,
      chart: null,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    handleChange() {
      console.log("handleChange");
    },
    handleShow() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    showNode() {
      this.nodeVisible = true;
    },
    closeNode() {
      this.nodeVisible = false;
    },
    initChart() {
      console.log(document.getElementById("histogram"), "node");
      this.chart = echarts.init(document.getElementById("histogram"));
      this.chart.setOption(this.getOption());
    },
    getOption() {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nodeDetail {
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  background: #ffffff;
  box-shadow: 1px 0px 1px 0px #eeeeee;
  border: 1px solid #e9ecf3;
  overflow: scroll;
  .row-container {
    line-height: 40px;
  }
  .iconContainer {
    width: 100%;
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .iconClass {
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #e0e3e5;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .conclusion {
    .conclusion-title {
      padding: 10px 0px 6px 0px;
    }
    width: 100%;
    height: 78px;
    background: #f8f9fa;
    border-radius: 4px;
    margin-top: 12px;
    margin-bottom: 20px;
    padding: 9px 9px 9px 13px;
  }
}
</style>
