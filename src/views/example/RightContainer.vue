<template>
  <div class="right-container">
    <div v-if="procFactorDetail">
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
              content: `${procFactorDetail.partRadio}%`,
              text: '总',
              textData: `${procFactorDetail.total}条`,
              showButton: false,
            }"
          >
            <template v-slot:right>
              <el-progress
                type="circle"
                :percentage="
                  procFactorDetail.partRadio &&
                  Number(procFactorDetail.partRadio)
                "
                :width="60"
              ></el-progress>
            </template>
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '线上率',
              content: '--',
              text: '比率',
              textData: '0.00%',
              showButton: false,
            }"
          >
            <template v-slot:right>
              <div style="width: 60%">
                <el-progress :percentage="0"></el-progress>
              </div>
            </template>
          </process-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="center-row">
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '流效率',
              content: `${procFactorDetail.flowRadio}%`,
              expect: `${procFactorRuleData.rule.flowEffic.expect}`,
              redLine: `${procFactorRuleData.rule.flowEffic.expect}`,
              redLineText: '流效红线',
              expectText: '流效期望',
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
              content: `${procFactorDetail.timeLimit}人天`,
              expect: `${procFactorRuleData.rule.timeEffic.expect}`,
              redLine: `${procFactorRuleData.rule.timeEffic.expect}`,
              redLineText: '时效红线',
              expectText: '时效期望',
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
          <process-card
            v-bind="{
              title: '流程平均干系人',
              content: `${procFactorDetail.avgHolder}人`,
              redLineText: '主线干系',
              expectText: '分支干系',
              expect: '0人',
              redLine: '0人',
            }"
          >
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '人效',
              content: `${procFactorDetail.personLimit}人天`,
              expect: `${procFactorRuleData.rule.personEffic.expect}`,
              redLine: `${procFactorRuleData.rule.personEffic.redLine}`,
              redLineText: '人效红线',
              expectText: '人效期望',
            }"
          >
            <template v-slot:right>
              <img src="@/assets/warn.svg" class="warnClass" alt="" />
            </template>
          </process-card>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20" class="bottomRow">
        <el-col :span="12">
          <process-chart
            v-bind="{
              title: '节点价值分布',
            }"
          >
          </process-chart>
        </el-col>
      </el-row> -->
    </div>
    <div v-else class="right-without-container">
      <div>
        <img class="pic-404__parent" src="@/assets/withoutData.png" alt="404" />
      </div>
    </div>
    <!-- 弹框 -->
    <process-modal
      :dialogVisible="dialogVisible"
      :handleClose="handleClose"
      :procFactorRuleData="procFactorRuleData"
      :getProcIndexRule="getProcIndexRule"
      :getProcFactor="getProcFactor"
    />
  </div>
</template>

<script>
import ProcessCard from "./components/ProcessCard";
import ProcessChart from "./components/ProcessChart";
import ProcessModal from "./components/ProcessModal";

export default {
  props: [
    "procFactorDetail",
    "procFactorRuleData",
    "getProcIndexRule",
    "getProcFactor",
  ],
  components: {
    ProcessCard,
    ProcessModal,
    ProcessChart,
  },
  data() {
    return {
      dialogVisible: false,
    };
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
