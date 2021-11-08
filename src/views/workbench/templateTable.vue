<template>
  <div class="card-container">
    <bread-text name="模块分析明细"/>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="模版类别">
        <template slot-scope="scope">
          <span @click="textClick('process_890537162274856960:1:2964916')">{{
              scope.row.appName
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平均超时">
        <template slot-scope="scope">
          {{ scope.row.processOverTime }}
        </template>
      </el-table-column>
      <el-table-column label="平均耗时">
        <template slot-scope="scope">
          {{ scope.row.personPassTime }}
        </template>
      </el-table-column>
      <el-table-column label="平均超时率">
        <template slot-scope="scope">
          {{ scope.row.finishRatio }}
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

export default {
  components: {Pagination, BreadText},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
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
      if(!params){
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
