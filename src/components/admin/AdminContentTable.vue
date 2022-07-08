<template>
  <app-table class="user-table">
    <slot></slot>
  </app-table>
</template>

<script>
import AppTable from "@/components/table/AppTable";
export default {
  components: {
    AppTable,
  },
};
</script>

<style lang="scss" scoped>
.user-table {
  width: 100%;
  overflow: hidden;
}
</style>