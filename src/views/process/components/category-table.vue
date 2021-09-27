<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-row class="filter-container">
          <!-- left search -->
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="6">
                <filter-item>
                  <template v-slot:left> <span>名称</span> </template>
                  <template v-slot:right>
                    <el-input
                      v-model="listQuery.title"
                      placeholder="搜索名称"
                    />
                  </template>
                </filter-item>
              </el-col>
              <el-col :span="6">
                <filter-item>
                  <template v-slot:left> <span>名称</span> </template>
                  <template v-slot:right>
                    <el-input
                      v-model="listQuery.title"
                      placeholder="搜索名称"
                    />
                  </template>
                </filter-item>
              </el-col>
            </el-row>
          </el-col>
          <!-- right button -->
          <el-col :span="6">
            <div style="float: right">
              <el-button size="small" type="primary" @click="handleSearch">
                查询
              </el-button>
              <el-button
                size="small"
                style="margin-left: 10px;"
                @click="handleCreate"
              >
                重置
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <el-row class="filter-container">
          <!-- left search -->
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="6">
                <filter-item>
                  <template v-slot:left> <span>名称</span> </template>
                  <template v-slot:right>
                    <el-input
                      v-model="listQuery.title"
                      placeholder="搜索名称"
                    />
                  </template>
                </filter-item>
              </el-col>
              <el-col :span="6">
                <filter-item>
                  <template v-slot:left> <span>名称</span> </template>
                  <template v-slot:right>
                    <el-input
                      v-model="listQuery.title"
                      placeholder="搜索名称"
                    />
                  </template>
                </filter-item>
              </el-col>
            </el-row>
          </el-col>
          <!-- right button -->
          <el-col :span="6">
            <div style="float: right">
              <el-button size="small" type="primary" @click="handleSearch">
                查询
              </el-button>
              <el-button
                size="small"
                style="margin-left: 10px;"
                @click="handleCreate"
              >
                重置
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";

export default {
  components: { FilterItem },
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      listQuery: {
        title: "",
        limit: 20
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSearch() {
      console.log("search");
    },
    handleCreate() {
      console.log("create");
    }
  }
};
</script>

<style lang="scss" scoped></style>
