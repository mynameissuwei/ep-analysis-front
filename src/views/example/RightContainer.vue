<template>
  <div class="right-container">
    <div v-if="true">
      <div class="iconContainer">
        <div class="iconClass" @click="handleShow">
          <i class="el-icon-setting"></i>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '参与流程样本',
              content: '78%',
              text: '总',
              textData: '210条',
              showButton: false,
            }"
          >
            <template v-slot:right>
              <el-progress
                type="circle"
                :percentage="0"
                width="50"
              ></el-progress>
            </template>
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '线上率',
              content: 'B+',
              text: '比率',
              textData: '87%',
              showButton: false,
            }"
          >
            <template v-slot:right>
              <el-progress
                type="circle"
                :percentage="0"
                width="50"
              ></el-progress>
            </template>
          </process-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="center-row">
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '流效率',
              content: '9%',
            }"
          >
            <template v-slot:right>
              <img src="@/assets/warn.svg" class="warnClass" alt="" />
            </template>
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '时效',
              content: '23.3人天',
            }"
          >
            <template v-slot:right>
              <img src="@/assets/warn.svg" class="warnClass" alt="" />
            </template>
          </process-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '流程平均干系人',
              content: '23.3人',
            }"
          >
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '人效',
              content: '23.3人天',
            }"
          >
            <template v-slot:right>
              <img src="@/assets/warn.svg" class="warnClass" alt="" />
            </template>
          </process-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bottomRow">
        <el-col :span="12">
          <process-chart
            v-bind="{
              title: '节点价值分布',
            }"
          >
          </process-chart>
        </el-col>
      </el-row>
    </div>
    <div v-else class="right-without-container">
      <div>
        <img class="pic-404__parent" src="@/assets/withoutData.png" alt="404" />
      </div>
    </div>
    <dia-modal />
  </div>
</template>

<script>
import ProcessCard from "./components/ProcessCard";
import ProcessChart from "./components/ProcessChart";
import ProcessModal from "./components/ProcessModal";
import DiaModal from "./components/DiaModal";

export default {
  components: {
    ProcessCard,
    ProcessModal,
    ProcessChart,
    DiaModal,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleShow() {
      console.log(123);
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.center-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.bottomRow {
  margin-top: 20px;
  margin-bottom: 46px;
}
.right-container {
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  background: #ffffff;
  box-shadow: 1px 0px 1px 0px #eeeeee;
  border: 1px solid #e9ecf3;
  overflow: scroll;
}
.iconContainer {
  width: 100%;
  height: 54px;

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
}
.right-without-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.warnClass {
  position: relative;
  bottom: 10px;
}
</style>
