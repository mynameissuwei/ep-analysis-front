<template>
  <div class="module">
    <div class="img-container">
      <img src="@/assets/module.svg" alt="LOGO" style="height: 308px" />
    </div>
    <div>
      <module-table />
    </div>
  </div>
</template>

<script>
import ModuleTable from "./components/ModuleTable";
export default {
  components: { ModuleTable }
};
</script>

<style lang="scss" scoped></style>
