<template>
  <div class="card-container">
    <bread-text name="平台效能词典" />

    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in [
          { name: '指标', value: '0' },
          { name: '非指标', value: '1' }
        ]"
        :key="item.value"
        :label="item.name"
        :name="item.value"
      >
        <keep-alive>
          <div v-if="activeName == item.value">
            <plat-dict :type="activeName" />
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BreadText from "@/components/Breadtext";
import PlatDict from "./PlatDict";

export default {
  components: {
    PlatDict,
    BreadText
  },
  data() {
    return {
      activeName: "0"
    };
  }
};
</script>

<style lang="scss" scoped></style>
