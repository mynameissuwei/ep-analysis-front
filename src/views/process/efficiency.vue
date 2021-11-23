<template>
  <div>
    <card-container>
      <el-row :gutter="20">
        <el-col :span="4">
          <display-card
            :cardTitle="displayCardData.templateTotalAmount"
            cardText="模板总数"
            svgText="template"
          />
          <el-tooltip
            class="item"
            effect="dark"
            :disabled="tooltipShow(displayCardData.templateTimeConsuming)"
            :content="convertTimeFormat(displayCardData.templateTimeConsuming)"
            placement="top-end"
          >
            <display-card
              :cardTitle="
                convertHourUnit(displayCardData.templateTimeConsuming)
              "
              cardText="模板总耗时"
              svgText="timeConsume"
            />
          </el-tooltip>
        </el-col>
        <el-col :span="4">
          <display-card
            :cardTitle="displayCardData.completeRate"
            cardText="完成率"
            svgText="complete"
          />
          <el-tooltip
            class="item"
            effect="dark"
            :disabled="tooltipShow(displayCardData.averageTimeConsuming)"
            :content="convertTimeFormat(displayCardData.averageTimeConsuming)"
            placement="top-end"
          >
            <display-card
              :cardTitle="convertHourUnit(displayCardData.averageTimeConsuming)"
              cardText="平均耗时"
              svgText="timeConsume"
            />
          </el-tooltip>
        </el-col>
        <el-col :span="8" class="chart-container">
          <card-chart title="效能评分" :score="efficiencyScore" />
        </el-col>
        <el-col :span="4">
          <el-tooltip
            class="item"
            effect="dark"
            :disabled="tooltipShow(displayCardData.templateTotalExpiredTime)"
            :content="
              convertTimeFormat(displayCardData.templateTotalExpiredTime)
            "
            placement="top-end"
          >
            <display-card
              :cardTitle="
                convertHourUnit(displayCardData.templateTotalExpiredTime)
              "
              cardText="模板总超时"
              svgText="overtime"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :disabled="tooltipShow(displayCardData.averageTimeExpired)"
            :content="convertTimeFormat(displayCardData.averageTimeExpired)"
            placement="top-end"
          >
            <display-card
              :cardTitle="convertHourUnit(displayCardData.averageTimeExpired)"
              cardText="平均超时"
              svgText="overtime"
            />
          </el-tooltip>
        </el-col>
        <el-col :span="4">
          <display-card
            :cardTitle="displayCardData.approveTotalAmount"
            cardText="参与审批总人数"
            svgText="people"
          />
          <el-tooltip
            class="item"
            effect="dark"
            :disabled="tooltipShow(displayCardData.humanPerTimeConsuming)"
            :content="convertTimeFormat(displayCardData.humanPerTimeConsuming)"
            placement="top-end"
          >
            <display-card
              :cardTitle="
                convertHourUnit(displayCardData.humanPerTimeConsuming)
              "
              cardText="人均耗时"
              svgText="timeConsume"
            />
          </el-tooltip>
        </el-col>
      </el-row>
    </card-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <card-container height="478px">
          <number-card title="流程总数实时统计" :num="processTotalAmountData" />
          <event-card :events="eventsData" />
        </card-container>
      </el-col>
      <el-col :span="16">
        <card-container height="478px" style="padding-top: 24px">
          <line-chart
            :chart-data="lineChartData.charData"
            :legend-data="lineChartData.legendData"
            :x-axis-data="lineChartData.xAxisData"
          />
        </card-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DisplayCard from "@/components/DisplayCard";
import CardContainer from "@/components/CardContainer";
import CardChart from "./components/CardChart";
import LineChart from "./components/LineChart";
import NumberCard from "./components/NumberCard";
import EventCard from "./components/EventCard";
import { getEfficiencyData } from "@/api/efficiencyDashboard";
import NOTICE_TYPE from "@/utils/noticeType";

export default {
  name: "Efficiency",
  components: {
    DisplayCard,
    CardChart,
    LineChart,
    NumberCard,
    EventCard,
    CardContainer,
  },
  data() {
    return {
      lineChartData: {
        charData: [
          [100, 150, 271, 400, 201, 248, 124],
          [200, 300, 400, 800, 400, 500, 300],
          [300, 450, 610, 1200, 600, 600, 300],
          [400, 600, 800, 1600, 800, 900, 400],
        ],
        // legendData: [
        //   "每小时完成流程数",
        //   "每小时超时流程数量",
        //   "每小时流程超时数",
        //   "每小时流程数"
        // ],
        legendData: ["完成流程数", "超时流程数", "流程超时数", "流程数"],
        // xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        xAxisData: [
          "2021-11-15 8",
          "2021-11-15 9",
          "2021-11-15 10",
          "2021-11-15 11",
          "2021-11-15 12",
          "2021-11-15 13",
          "2021-11-15 14dasdas12121",
        ],
      },
      displayCardData: {
        templateTotalAmount: 250,
        templateTimeConsuming: 250,
        completeRate: "98%",
        averageTimeConsuming: 123,
        templateTotalExpiredTime: 2131,
        averageTimeExpired: 123,
        approveTotalAmount: 897,
        humanPerTimeConsuming: 348,
      },
      efficiencyScore: 0.89,
      eventsData: [
        {
          operateName: "吴雷",
          noticeType: "发起",
          processName: "流程名称",
          operateTime: "2021-10-29",
        },
        {
          operateName: "吴雷",
          noticeType: "发起",
          processName: "流程名称",
          operateTime: "2021-10-29",
        },
        {
          operateName: "吴雷",
          noticeType: "发起",
          processName: "流程名称",
          operateTime: "2021-10-29",
        },
        {
          operateName: "吴雷",
          noticeType: "发起",
          processName: "流程名称",
          operateTime: "2021-10-29",
        },
      ],
      pollingST: null,
      processTotalAmountData: 1897,
      queryParam: {
        tenantId: "ep-analysis-flink",
        senderId: this.$store.state.user.tenantId,
        pageNum: 1,
        pageSize: 1,
      },
    };
  },
  methods: {
    // 小于1个人天则不展示
    tooltipShow(hourTime) {
      return parseFloat(hourTime) < 8;
    },
    // 转换为人天
    convertTimeFormat(hourTime) {
      return (parseFloat(hourTime) / 8).toFixed(2) + "人天";
    },
    convertHourUnit(hourTime) {
      if (parseInt(hourTime) > 10000)
        return (hourTime = hourTime.substring(0, 4) + "...h");
      return hourTime + "h";
    },
    // 轮询方法
    polling() {
      this.getEfficiencyDashboardData().then((res) => {
        console.log("getEfficiencyDashboardData start");
        this.pollingST = setTimeout(() => {
          clearTimeout(this.pollingST);
          this.polling();
        }, 100000);
      });
    },
    async getEfficiencyDashboardData() {
      getEfficiencyData(this.queryParam).then((response) => {
        let extra = response.data[0].extra;
        if (extra) extra = JSON.parse(extra);
        // 获取分时图数据
        console.log("/interMsg/list extra:", extra);
        let timeQuantumStatistics = JSON.parse(extra.timeQuantumStatistics);
        console.log(
          "/interMsg/list timeQuantumStatistics:",
          timeQuantumStatistics
        );

        this.lineChartData.xAxisData = this.convertToXAxisData(
          timeQuantumStatistics
        );
        console.log(
          "this.lineChartData.xAxisData ",
          this.lineChartData.xAxisData
        );
        // this.lineChartData.legendData = this.convertToLegendData(timeQuantumStatistics);
        this.lineChartData.charData = this.convertToChartData(
          timeQuantumStatistics
        );

        // 获取卡片数据
        this.displayCardData = { ...extra };
        this.displayCardData.completeRate =
          parseInt(
            parseFloat(this.displayCardData.completeRate).toFixed(2) * 100
          ) + "%";

        // 获取效能评分
        this.efficiencyScore = extra.efficiencyScore / 100;

        // 获取流程总数
        this.processTotalAmountData = parseInt(extra.processTotalAmount);

        // 获取实时事件
        this.eventsData = this.convertToEventData(JSON.parse(extra.cacheEvent));
        console.log("convertToEventData ", this.eventsData);
      });
    },
    convertToEventData(origin) {
      return origin.map((event) => {
        event.noticeText =
          NOTICE_TYPE[event.noticeType] + ":" + event.processName;
        if (!event.operateName) event.operateName = "xxx";
        return event;
      });
    },
    convertToXAxisData(timeQuantumStatistics) {
      return Object.values(timeQuantumStatistics)
        .sort((a, b) => {
          return (
            Date.parse(a.timeQuantum + ":00:00") -
            Date.parse(b.timeQuantum + ":00:00")
          );
        })
        .map((timeQuantumStatistic) => timeQuantumStatistic.timeQuantum);
    },
    convertToLegendData(timeQuantumStatistics) {
      console.log(
        "convertToLegendData timeQuantumStatistics:",
        timeQuantumStatistics
      );
      // return Object.values(timeQuantumStatistics).map(timeQuantumStatistic => )
    },
    convertToChartData(timeQuantumStatistics) {
      return [
        Object.values(timeQuantumStatistics)
          .sort((a, b) => {
            return (
              Date.parse(a.timeQuantum + ":00:00") -
              Date.parse(b.timeQuantum + ":00:00")
            );
          })
          .map(
            (timeQuantumStatistic) => timeQuantumStatistic.hourPerCompleteAmount
          ), //每小时完成流程数
        Object.values(timeQuantumStatistics)
          .sort((a, b) => {
            return (
              Date.parse(a.timeQuantum + ":00:00") -
              Date.parse(b.timeQuantum + ":00:00")
            );
          })
          .map(
            (timeQuantumStatistic) =>
              timeQuantumStatistic.hourPerExpiredProcessAmount
          ), //每小时超时流程数量
        Object.values(timeQuantumStatistics)
          .sort((a, b) => {
            return (
              Date.parse(a.timeQuantum + ":00:00") -
              Date.parse(b.timeQuantum + ":00:00")
            );
          })
          .map(
            (timeQuantumStatistic) => timeQuantumStatistic.hourPerExpiredTime
          ), // 每小时流程超时数
        Object.values(timeQuantumStatistics)
          .sort((a, b) => {
            return (
              Date.parse(a.timeQuantum + ":00:00") -
              Date.parse(b.timeQuantum + ":00:00")
            );
          })
          .map(
            (timeQuantumStatistic) => timeQuantumStatistic.hourPerProcessAmount
          ), // 每小时流程数
      ];
    },
  },
  created() {
    this.polling();
  },
  beforeDestroy() {
    clearInterval(this.pollingST); // 清除定时器
    this.pollingST = null;
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}
</style>
