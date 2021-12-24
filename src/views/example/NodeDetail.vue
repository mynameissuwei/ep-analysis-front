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
      <div>this is chart</div>
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
        <div>环比至 2015-08-02 ～ 201</div>
      </div>

      <div class="conclusion">
        <div class="conclusion-title">分析结论：</div>
        <div>
          耗时上升节点出现4个。平均耗时中5个节点在上升；平均处理中1个节点在上升，平均等待中3个节点在上升；该流程审批效率环比降低5/人天。
        </div>
      </div>
      <el-divider></el-divider>
    </div>

    <dia-modal :visible="dialogVisible" :handleClose="handleClose" />
  </div>
</template>

<script>
import DiaModal from "./components/DiaModal";

export default {
  data() {
    return {
      dialogVisible: false,
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
  components: {
    DiaModal,
  },
  methods: {
    handleShow() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
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
