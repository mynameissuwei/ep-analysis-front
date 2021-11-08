<template>
  <div class="people">
    <el-row :gutter="20" style="height:276px">
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            效率榜
          </div>
          <div
            v-loading="effLoading"
            :class="effData.length ? 'card-body' : 'card-body noData-body'"
          >
            <div v-if="effData.length" style="height:100%">
              <el-row class="card-row">
                <el-col
                  class="col-flex"
                  :span="8"
                  v-for="(item, index) in effData.slice(0, 3)"
                  :key="index"
                >
                  <el-avatar
                    :src="
                      item.user_head_image
                        ? item.user_head_image
                        : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                    "
                  ></el-avatar>
                  <div style="margin-top:10px">
                    {{ item.user_name ? item.user_name : "新奥新智用户" }}
                  </div>
                </el-col>
              </el-row>
              <el-row class="card-row">
                <el-col
                  class="col-flex"
                  :span="8"
                  v-for="(item, index) in effData.slice(3, 6)"
                  :key="index"
                >
                  <el-avatar
                    :src="
                      item.user_head_image
                        ? item.user_head_image
                        : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                    "
                  ></el-avatar>
                  <div style="margin-top:10px">
                    {{ item.user_name ? item.user_name : "新奥新智用户" }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <img
              v-else
              src="@/assets/notRank.svg"
              alt="LOGO"
              class="img-people"
            />
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            劳模榜
          </div>
          <div
            v-loading="workerLoading"
            :class="workerData.length ? 'card-body' : 'card-body noData-body'"
          >
            <div v-if="workerData.length" style="height:100%">
              <el-row class="card-row">
                <el-col
                  class="col-flex"
                  :span="8"
                  v-for="(item, index) in workerData.slice(0, 3)"
                  :key="index"
                >
                  <el-avatar
                    :src="
                      item.user_head_image
                        ? item.user_head_image
                        : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                    "
                  ></el-avatar>
                  <div style="margin-top:10px">
                    {{ item.user_name ? item.user_name : "新奥新智用户" }}
                  </div>
                </el-col>
              </el-row>
              <el-row class="card-row">
                <el-col
                  class="col-flex"
                  :span="8"
                  v-for="(item, index) in workerData.slice(3, 6)"
                  :key="index"
                >
                  <el-avatar
                    :src="
                      item.user_head_image
                        ? item.user_head_image
                        : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                    "
                  ></el-avatar>
                  <div style="margin-top:10px">
                    {{ item.user_name ? item.user_name : "新奥新智用户" }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <img
              v-else
              src="@/assets/notRank.svg"
              alt="LOGO"
              class="img-people"
            />
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            催办榜
          </div>
          <div class="card-body noData-body">
            <img src="@/assets/notRank.svg" alt="LOGO" class="img-people" />
          </div>
        </card-container>
      </el-col>
      <el-col :span="6">
        <card-container height="276px">
          <div class="card-header">
            耗时榜
          </div>
          <div
            v-loading="overTimeLoading"
            :class="overTimeData.length ? 'card-body' : 'card-body noData-body'"
          >
            <div v-if="overTimeData.length" style="height:100%">
              <el-row class="card-row">
                <el-col
                  class="col-flex"
                  :span="8"
                  v-for="(item, index) in overTimeData.slice(0, 3)"
                  :key="index"
                >
                  <el-avatar
                    :src="
                      item.user_head_image
                        ? item.user_head_image
                        : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                    "
                  ></el-avatar>
                  <div style="margin-top:10px">
                    {{ item.user_name ? item.user_name : "新奥新智用户" }}
                  </div>
                </el-col>
              </el-row>
              <el-row class="card-row">
                <el-col
                  class="col-flex"
                  :span="8"
                  v-for="(item, index) in overTimeData.slice(3, 6)"
                  :key="index"
                >
                  <el-avatar
                    :src="
                      item.user_head_image
                        ? item.user_head_image
                        : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                    "
                  ></el-avatar>
                  <div style="margin-top:10px">
                    {{ item.user_name ? item.user_name : "新奥新智用户" }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <img
              v-else
              src="@/assets/notRank.svg"
              alt="LOGO"
              class="img-people"
            />
          </div>
        </card-container>
      </el-col>
    </el-row>
    <people-table
      :tableData="list"
      :listLoading="listLoading"
      :handleSearch="handleSearch"
      :username="username"
      @onEmitUsername="onEmitUsername"
      @onResetUsername="onResetUsername"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import BarChart from "./components/BarChart";
import CardContainer from "@/components/CardContainer";
import PeopleTable from "./components/PeopleTable.vue";
import Pagination from "@/components/Pagination";
import {
  fetchList,
  fetchEffTopList,
  fetchWorkerTopList,
  fetchOverTimeList
} from "@/api/people";

export default {
  components: { Pagination, BarChart, CardContainer, PeopleTable },
  data() {
    return {
      list: null,
      effData: [],
      effLoading: false,
      workerData: [],
      workerLoading: false,
      overTimeData: [],
      overTimeLoading: false,
      listLoading: false,
      total: 0,
      username: "",
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        sqlKey: "personPage"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
      this.getEffTopList();
      this.getWorkerTopList();
      this.getOverTimeList();
    },
    async getList() {
      this.listLoading = true;
      const { data, totalCount } = await fetchList({
        condition: {
          ...this.listQuery,
          extParam: {
            userName: this.username
          }
        }
      });
      this.total = totalCount;
      this.list = data;
      this.listLoading = false;
    },
    async getEffTopList() {
      this.effLoading = true;
      const { data } = await fetchEffTopList({
        condition: {
          sqlKey: "effTopList"
        }
      });
      this.effData = data;
      this.effLoading = false;
    },
    async getWorkerTopList() {
      this.workerLoading = true;
      const { data } = await fetchWorkerTopList({
        condition: {
          sqlKey: "workerTopList"
        }
      });
      this.workerData = data;
      this.workerLoading = false;
    },
    async getOverTimeList() {
      this.overTimeLoading = true;
      const { data } = await fetchOverTimeList({
        condition: {
          sqlKey: "overTimeList"
        }
      });
      this.overTimeData = data;
      this.overTimeLoading = false;
    },
    handleSearch() {
      this.getList();
    },
    onEmitUsername(username) {
      this.username = username;
    },
    onResetUsername() {
      this.username = "";
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        sqlKey: "personPage"
      };
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.people {
  .card-header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  .col-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .card-row {
    height: 50%;
    display: flex;
    align-items: center;
  }
  .card-body {
    height: calc(100% - 55px);
    position: relative;
  }
  .noData-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
