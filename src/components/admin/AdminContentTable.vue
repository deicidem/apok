<template>
  <app-table class="user-table" :disabled="disabled">
    <slot></slot>
  </app-table>
</template>

<script>
import AppTable from "@/components/table/AppTable";
export default {
  components: {
    AppTable,
  },
  props: ['disabled']
};
</script>

<style lang="scss" scoped>
.user-table {
  width: 100%;
  overflow: hidden;
}
</style>