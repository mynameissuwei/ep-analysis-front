<template>
  <div class="card-container">
    <bread-text name="模版分析明细"/>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
            <el-table-column label="模版类别">
        <template slot-scope="scope">
          <span
            style="color: #0F55FA; cursor: pointer"
            @click="
              textClick({
                source: scope.row.source,
                procDefKey: scope.row.procDefKey
              })
            "
            >{{ scope.row.appName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="defName" label="模板名称" />
      <el-table-column prop="orgName" label="归属部门" />
      <el-table-column prop="taskNum" label="节点长度" />
      <el-table-column prop="partNum" label="审批总人数" />
      <el-table-column prop="totalPassTime" label="超时总长" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.totalOverTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalCnt" label="流程总数" sortable />
      <el-table-column prop="totalPassTime" label="耗时总长" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.totalPassTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="finishRatio" label="完成率" sortable>
        <template slot-scope="scope">
          {{ toPercent(scope.row.finishRatio) }}
        </template>
      </el-table-column>
      <el-table-column label="平均超时(小时)" prop="processOverTime" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.processOverTime) }}
        </template>
      </el-table-column>
      <el-table-column label="人均耗时" prop="personPassTime" sortable>
        <template slot-scope="scope">
          {{ getDuration(scope.row.personPassTime) }}
        </template>
      </el-table-column>
      <el-table-column label="平均超时率" prop="finishRatio" sortable>
        <template slot-scope="scope">
          {{ toPercent(scope.row.finishRatio) }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {fetchList} from "@/api/module";
import Pagination from "@/components/Pagination";
import BreadText from "@/components/Breadtext";
import getDuration from "@/utils/getDuration";
import toPercent from "@/utils/toPercent";

export default {
  components: {Pagination, BreadText},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      getDuration,
      toPercent,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        orgCode: undefined,
        appKey: undefined,
        procDefName: undefined
      }
    };
  },
  created() {
    this.getParams();
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const {data, totalCount} = await fetchList({
        condition: {
          extParam: {
            createOrgCode: this.listQuery.orgCode,
            appKey: this.listQuery.appKey,
            procDefName: this.listQuery.procDefName
          },
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          sqlKey: "procDefDetailPage"
        }
      });
      this.total = totalCount;

      this.list = data;
      this.listLoading = false;
    },
    getParams() {
      let params = this.$route.params.definitionList;
      if (!params) {
        return;
      }
      let p = {};
      params.map(o => {
        p[o.paramName] = o.paramValue
      })
      this.listQuery = {...this.listQuery, ...p}
    }
  }
};
</script>

<style lang="scss" scoped></style>
