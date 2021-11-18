<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的消息</span>
          </div>
          <el-row class="filter-container">
            <!-- left search -->
            <el-col :span="18">
              <el-row :gutter="20">
                <el-col :span="10">
                  <filter-item>
                    <template v-slot:left><span>搜索</span></template>
                    <template v-slot:right>
                      <el-input size="small"
                        v-model="messageListQuery.noticeTitle"
                        placeholder="请输入"
                      />
                    </template>
                  </filter-item>
                </el-col>
                <el-col :span="10">
                  <filter-item>
                    <template v-slot:left><span>状态</span></template>
                    <template v-slot:right>
                      <el-select size="small"
                        v-model="messageListQuery.processed"
                        clearable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in [
                            { value: 0, name: '已阅' },
                            { value: 1, name: '未阅' },
                            { value: undefined, name: '全部' }
                          ]"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        />
                      </el-select>
                    </template>
                  </filter-item>
                </el-col>
              </el-row>
            </el-col>
            <!-- right button -->
            <el-col :span="6">
              <div style="float: right">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleSearch('message')"
                >
                  查询
                </el-button>
                <el-button
                  size="small"
                  style="margin-left: 10px;"
                  @click="handleReset('message')"
                >
                  重置
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-table
            :data="messageList"
            style="width: 100%"
            v-loading="messageListLoading"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column prop="noticeTitle" label="通知标题">
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间" sortable>
            </el-table-column>
          </el-table>
          <pagination
            v-show="messageTotal > 0"
            :total="messageTotal"
            :page-sizes="[5,10]"
            :page.sync="messageListQuery.pageNum"
            :limit.sync="messageListQuery.pageSize"
            @pagination="getMessageList"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的事项</span>
          </div>
          <el-row class="filter-container">
            <!-- left search -->
            <el-col :span="18">
              <el-row>
                <el-col :span="10">
                  <filter-item>
                    <template v-slot:left><span>状态</span></template>
                    <template v-slot:right>
                      <el-select size="small"
                        v-model="matterListQuery.processed"
                        clearable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in [
                            { value: 0, name: '待办' },
                            { value: 1, name: '已办' },
                            { value: undefined, name: '全部' }
                          ]"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        />
                      </el-select>
                    </template>
                  </filter-item>
                </el-col>
              </el-row>
            </el-col>
            <!-- right button -->
            <el-col :span="6">
              <div style="float: right">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleSearch('matter')"
                >
                  查询
                </el-button>
                <el-button
                  size="small"
                  style="margin-left: 10px;"
                  @click="handleReset('matter')"
                >
                  重置
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-table
            :data="matterList"
            style="width: 100%"
            v-loading="matterListLoading"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column prop="noticeTitle" label="通知标题">
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间" sortable>
            </el-table-column>
          </el-table>
          <pagination
            v-show="matterTotal > 0"
            :total="matterTotal"
            :page-sizes="[5,10]"
            :page.sync="matterListQuery.pageNum"
            :limit.sync="matterListQuery.pageSize"
            @pagination="getMatterList"
          />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>快捷入口</span>
          </div>
          <!--          <div class="text-container">-->
          <!--            <svg-icon icon-class="password" fill="#0F55FA"/>-->
          <!--            <div>报表设计</div>-->
          <!--          </div>-->
          <div class="text-container">
            <!-- <router-link :to="{name:'createUser'}"> -->
              <svg-icon icon-class="password" fill="#0F55FA"/>
              <div>添加用户</div>
            <!-- </router-link> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import Pagination from "@/components/Pagination";
import { fetchList } from "@/api/workbench";

export default {
  components: {Pagination, FilterItem},
  data() {
    return {
      isAdmin: true,
      messageTotal: 0,
      messageList: null,
      messageListLoading: true,
      messageListQuery: {
        pageNum: 1,
        pageSize: 5,
        processed: undefined,
        noticeTitle: undefined
      },
      matterList: null,
      matterListLoading: true,
      matterListQuery: {
        pageNum: 1,
        pageSize: 5,
        processed: undefined
      },
      matterTotal: 0,
    };
  },
  created() {
    this.getMessageList();
    this.getMatterList();
  },
  methods: {
    async getMessageList() {
      let params = {
        noticeType: 1,
        systemType: 2
      }
      this.messageListLoading = true;
      const {data, totalCount} = await fetchList({
        ...this.messageListQuery,
        ...params
      });
      this.messageTotal = totalCount;
      this.messageList = data;
      this.messageListLoading = false;
    },
    async getMatterList() {
      let params = {
        noticeType: 2,
        systemType: 2
      }
      this.matterListLoading = true;
      const {data, totalCount} = await fetchList({
        ...this.matterListQuery,
        ...params
      });
      this.matterTotal = totalCount;
      this.matterList = data;
      this.matterListLoading = false;
    },
    handleSearch(type) {
      if (type === "message") {
        this.getMessageList()
      } else if (type === "matter") {
        this.getMatterList();
      }
    },
    handleReset(type) {
      if (type === "message") {
        this.messageListQuery = {
          pageNum: 1,
          pageSize: 5,
          processed: undefined,
          noticeTitle: undefined
        };
        this.getMessageList({
          noticeType: 1,
          systemType: 2
        });
      } else {
        this.matterListQuery = {
          pageNum: 1,
          pageSize: 5,
          processed: undefined
        };
        this.getMatterList({
          noticeType: 2,
          systemType: 2
        });
      }
    },
    handleEdit() {
    }
  }
};
</script>

<style lang="scss" scoped>
.template-container {
  width: 100%;
  height: 46px;
  background: linear-gradient(360deg, #dbf4ff 0%, #f1fbff 100%);
  opacity: 0.64;
  text-align: center;
  line-height: 46px;
}

.process-container {
  width: 100%;
  height: 46px;
  background: linear-gradient(360deg, #dbf4ff 0%, #f1fbff 100%);
  border-radius: 2px;
  text-align: center;
  line-height: 46px;
}

.text-container {
  margin-right: 40px;
  display: inline-block;
  text-align: center;

  div {
    margin-top: 10px;
  }
}
</style>
