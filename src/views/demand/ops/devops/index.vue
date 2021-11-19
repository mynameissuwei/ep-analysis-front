<template>
  <div>
    <card-container>
      <el-row :gutter="20" style="padding: 16px 16px">
        <el-col :span="4" v-for="(item, index) in rightMap" :key="index">
          <div class="ops-card" :class="item.className">
            <div class="ops-card-left">
              <div class="ops-card-num">{{ item.num }}</div>
              <div class="ops-card-text">{{ item.text }}</div>
            </div>
            <div class="ops-card-right">
              <img :src="item.imgName" class="ops-card-img" alt="" />
            </div>
          </div>
        </el-col>
      </el-row>
    </card-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <card-container>
          <pie-chart
            id="opsPie"
            :data="opsPieData"
            height="316px"
            v-if="opsPieData.length"
          />
          <el-empty v-else style="height: 316px"></el-empty>
        </card-container>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card" style="height: 314px">
          <div class="bar-container">
            <el-tabs v-model="paneValue" @tab-click="tabChange">
              <el-tab-pane
                v-for="item in panes"
                :key="item.key"
                :label="item.label"
                :name="item.key"
              >
              </el-tab-pane>
            </el-tabs>
            <bar-chart
              id="opsChart"
              text="工单增长趋势"
              :execSqlToList="execSqlToList"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ops-table />
  </div>
</template>

<script>
import BarChart from "@/views/process/components/BarChart";
import { fetchExecSqlToList, fetchExecSqlToMap } from "@/api/ops";
import PieChart from "@/views/process/components/PieChart";
import CardContainer from "@/components/CardContainer";
import OpsTable from "./OpsTable";
import addPng from "@/assets/add.png";
import finishTimePng from "@/assets/finishTime.png";
import responseTime from "@/assets/responseTime.png";
import orderCnt from "@/assets/orderCnt.png";
import totalPassTime from "@/assets/totalPassTime.png";
import getDuration from "@/utils/getDuration";
import toPercent from "@/utils/toPercent";

export default {
  components: { BarChart, PieChart, CardContainer, OpsTable },
  data() {
    return {
      paneValue: "day",
      execSqlToList: {},
      opsPieData: [],
      rightMap: [],
      panes: [
        { label: "本周", key: "day" },
        { label: "本月", key: "month" },
        { label: "本年", key: "year" },
      ],
      addPng,
      finishTimePng,
      responseTime,
      orderCnt,
      totalPassTime,
      getDuration,
      toPercent,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getExecSqlToList(this.paneValue);
      this.getPieData();
      this.getTopData();
    },
    async getTopData() {
      let rightData = await this.getEchartData("fnwRightMap");
      let leftData = await this.getEchartData("fnwTodayIncMap");
      let data = {
        ...rightData,
        ...leftData,
      };

      let changeData = Object.keys(data).map((item) =>
        this.changeRightMap(item, data)
      );

      this.rightMap = changeData;
    },
    async getEchartData(sqlKey) {
      const { data } = await fetchExecSqlToMap({
        condition: {
          sqlKey,
        },
      });
      return data;
    },
    async getExecSqlToList(panValue) {
      const { data } = await fetchExecSqlToList({
        condition: {
          extParam: {
            target: panValue,
          },
          sqlKey: "orderIncTrendList",
        },
      });
      let xAxis = data.map((item) => item.dayTime);
      let yAxis = data.map((item) => item.num);
      this.execSqlToList = {
        xAxis,
        yAxis,
      };
    },
    async getPieData() {
      const { data } = await fetchExecSqlToList({
        condition: {
          sqlKey: "procTypePieList",
        },
      });
      this.opsPieData = data.map((item) => ({
        value: item.cnt,
        name: item.type,
      }));
    },
    changeRightMap(value, data) {
      switch (value) {
        case "cnt":
          return {
            num: data[value],
            imgName: this.addPng,
            text: "今日新增",
            className: "cnt",
          };
        case "finishTime":
          return {
            num: this.getDuration(data[value]),
            imgName: this.finishTimePng,
            text: "平均完成时间",
            className: "finishTime",
          };
        case "responseTime":
          return {
            num: this.getDuration(data[value]),
            imgName: this.responseTime,
            text: "平均响应时间",
            className: "responseTime",
          };
        case "orderCnt":
          return {
            num: data[value],
            imgName: this.orderCnt,
            text: "工单总数",
            className: "orderCnt",
          };
        case "totalPassTime":
          return {
            num: this.getDuration(data[value]),
            imgName: this.totalPassTime,
            text: "处理总耗时",
            className: "cnt",
          };
        case "sum(fault_time)":
          return {
            num: this.toPercent(data[value]),
            imgName: this.finishTimePng,
            text: "工单完结率",
            className: "finishTime",
          };
        default:
          return {};
      }
    },
    tabChange(value) {
      this.getExecSqlToList(value.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-container {
  position: relative;
  .el-tabs {
    width: 180px;
    position: absolute;
    right: 0px;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background-color: #fff !important;
  }
}
.ops-card {
  width: 100%;
  height: 92px;
  position: relative;
  border-radius: 2px;
  // display: inline-block;
  .ops-card-num {
    font-size: 32px;
    font-weight: 500;
    color: #333333;
    line-height: 45px;
  }
  .ops-card-text {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }
  // .ops-card-img {
  //   float: right;
  // }
  .ops-card-left {
    display: inline-block;
    padding-left: 30px;
    padding-top: 8px;
    padding-bottom: 11px;
  }
  .ops-card-right {
    display: inline-block;
  }
  .ops-card-img {
    position: absolute;
    right: 0px;
    top: 22px;
  }
}
.cnt {
  background: linear-gradient(148deg, #e8fff8 0%, #eefffa 100%);
  opacity: 0.64;
}
.finishTime {
  background: linear-gradient(148deg, #eef0ff 0%, #f7f9ff 100%);
}
.responseTime {
  background: linear-gradient(148deg, #dbf4ff 0%, #f1fbff 100%);
}
.orderCnt {
  background: linear-gradient(148deg, #eef0ff 0%, #f7f9ff 100%);
  opacity: 0.64;
}
.totalPassTime {
  background: linear-gradient(148deg, #eef0ff 0%, #f7f9ff 100%);
}
</style>
