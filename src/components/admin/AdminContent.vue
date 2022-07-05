<template>
  <div class="users-wrapper">
    <admin-content-table></admin-content-table>
    <admin-content-search></admin-content-search>
  </div>
</template>

<script>
import AdminContentTable from "@/components/admin/AdminContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
export default {
  components: {
    AdminContentTable,
    AdminContentSearch,
  },
};
</script>

<style lang="scss" scoped>
.users-wrapper {
  width: 700px;
  display: flex;
  flex-direction: column;
}
</style>