<template>
  <div class="right-container scroll-container">
    <div>
      <el-row :gutter="20" style="position: relative">
        <el-col :span="18">
          <el-alert
            v-if="procFactorDetail.hasOldData"
            title="本次因历史数据未采集系统操作时间，结论存在偏差"
            type="info"
            show-icon
            :closable="false"
            class="alert-container"
          >
          </el-alert>
        </el-col>
        <el-col :span="4">
          <div class="iconContainer" v-if="showSettingButton">
            <div class="iconClass" @click="handleShow" v-if="true">
              <i class="el-icon-setting"></i>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 5px">
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
            <template v-slot:topTip>
              <span>
                <div>参与本次本次数据样本在总量中的占比</div>
                <div>理论上数据样本量越大分析值偏差越小。</div>
              </span>
            </template>
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
            <template v-slot:topTip>
              <span>
                <div>参与流程样本中，线上化节点在总节点中的平均占比，</div>
                <div>小图是可视化线上率进程水平以及差距。</div>
              </span>
            </template>
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
              expect: `≥ ${procFactorRuleData.rule.flowEffic.expect}%`,
              redLine: `< ${procFactorRuleData.rule.flowEffic.redLine}%`,
              redLineText: '流效红线',
              expectText: '流效期望',
              isInit: isInit,
            }"
          >
            <template v-slot:leftTip>
              <div>该流程期望的流效率是大于等于多少，依业务自行定义。</div>
            </template>
            <template v-slot:rightTip>
              <div>该流程流效红线是小于多少，依业务自行定义。</div>
            </template>
            <template v-slot:topTip>
              <span>
                <div>
                  流效率既流程效率，流效率=实际处理时间/实际处理时间+等待时间
                </div>
                <div>实际处理时间及干系人进入平台操作时间。</div>
              </span>
            </template>
            <template v-slot:right>
              <div v-if="isInit">
                <img src="@/assets/initWarn.svg" class="warnClass" alt="" />
              </div>
              <div v-else>
                <img
                  src="@/assets/warn.svg"
                  class="warnClass"
                  alt=""
                  v-if="procFactorDetail.flowRadio <= 10"
                />
                <img
                  src="@/assets/greenWarn.svg"
                  class="warnClass"
                  alt=""
                  v-else-if="procFactorDetail.flowRadio <= 30"
                />
                <img
                  src="@/assets/yellowWarn.svg"
                  class="warnClass"
                  alt=""
                  v-else
                />
              </div>
            </template>
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '时效',
              content: `${procFactorDetail.timeLimit}`,
              expect: `≤ ${procFactorRuleData.rule.timeEffic.expect}人天`,
              redLine: `> ${procFactorRuleData.rule.timeEffic.redLine}人天`,
              redLineText: '时效红线',
              expectText: '时效期望',
              unit: '人天',
              isInit: isInit,
            }"
          >
            <template v-slot:leftTip>
              <div>该流程期望的流效率是小于等于多少，依业务自行定义。</div>
            </template>
            <template v-slot:rightTip>
              <div>该流程流效红线是大于多少，依业务自行定义。</div>
            </template>
            <template v-slot:topTip>
              时效是指每条流程平均用时，时效=流程总耗时/流程总数量/8h。
            </template>
            <template v-slot:right>
              <div v-if="isInit">
                <img src="@/assets/initWarn.svg" class="warnClass" alt="" />
              </div>
              <div v-else>
                <img
                  src="@/assets/warn.svg"
                  class="warnClass"
                  alt=""
                  v-if="procFactorDetail.timeLimit >= 20"
                />
                <img
                  src="@/assets/greenWarn.svg"
                  class="warnClass"
                  alt=""
                  v-else-if="procFactorDetail.timeLimit >= 10"
                />
                <img
                  src="@/assets/yellowWarn.svg"
                  class="warnClass"
                  alt=""
                  v-else
                />
              </div>
            </template>
          </process-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bottomRow">
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '流程平均干系人',
              content: `${procFactorDetail.avgHolder}`,
              redLineText: '主线干系',
              expectText: '分支干系',
              expect: '0人',
              redLine: '0人',
              unit: '人',
              isInit: isInit,
            }"
          >
            <template v-slot:leftTip>
              在流程分支节点上的干系人，包含在分支上添加的审批节点、填写节点和抄送节点，子分支节点。
            </template>
            <template v-slot:rightTip>
              在流程主线节点上的干系人，包含审批节点、填写节点和抄送节点。
            </template>
            <template v-slot:topTip>
              平均干系人=总人数/流程总数量，其中，总人数=主线干系人+分支干系人，是指实际操作流程的人。
            </template>
          </process-card>
        </el-col>
        <el-col :span="12">
          <process-card
            v-bind="{
              title: '人效',
              content: `${procFactorDetail.personLimit}`,
              expect: `≤ ${procFactorRuleData.rule.personEffic.expect}人天`,
              redLine: `> ${procFactorRuleData.rule.personEffic.redLine}人天`,
              redLineText: '人效红线',
              expectText: '人效期望',
              unit: '人天',
              isInit: isInit,
            }"
          >
            <template v-slot:leftTip>
              该流程期望的人效是小于等于多少，依业务自行定义。
            </template>
            <template v-slot:rightTip>
              该流程人效红线是大于多少，业务可自行定义
            </template>
            <template v-slot:topTip>
              人效即人的效率，单人在流程的平均用时，人效＝流程总耗/总干系人数/8h。
            </template>
            <template v-slot:right>
              <div v-if="isInit">
                <img src="@/assets/initWarn.svg" class="warnClass" alt="" />
              </div>
              <div v-else>
                <img
                  src="@/assets/warn.svg"
                  class="warnClass"
                  alt=""
                  v-if="procFactorDetail.timeLimit >= 3"
                />
                <img
                  src="@/assets/greenWarn.svg"
                  class="warnClass"
                  alt=""
                  v-else-if="procFactorDetail.timeLimit >= 2"
                />
                <img
                  src="@/assets/yellowWarn.svg"
                  class="warnClass"
                  alt=""
                  v-else
                />
              </div>
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
    <!-- 弹框 -->
    <process-modal
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :handleClose="handleClose"
      :procFactorRuleData="procFactorRuleData"
      :getProcIndexRule="getProcIndexRule"
      :getProcFactor="getProcFactor"
      :listQuery="listQuery"
    />
  </div>
</template>

<script>
import ProcessCard from "./components/ProcessCard";
import ProcessChart from "./components/ProcessChart";
import ProcessModal from "./components/ProcessModal";

export default {
  props: {
    procFactorDetail: {
      type: Object,
      require: true,
    },
    procFactorRuleData: {
      type: Object,
      require: true,
    },
    getProcIndexRule: {
      type: Function,
      require: true,
    },
    getProcFactor: {
      type: Function,
      require: true,
    },
    listQuery: {
      type: Object,
      require: true,
    },
    showSettingButton: {
      type: Boolean,
      default: true,
    },
    isInit: {
      type: Boolean,
      default: true,
    },
    driver: {
      type: Object,
      default: {},
    },
  },
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
      this.driver.reset();
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
  // overflow: scroll;
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
    position: absolute;
    right: 10px;
    margin-bottom: 16px;
    margin-top: 16px;
  }
}
.right-without-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
}
.warnClass {
  position: relative;
  bottom: 10px;
}
.alert-container {
  margin-top: 10px;
  background: #e6f3fe;
}
</style>
