<template>
  <admin-content>
      <admin-users-content-table></admin-users-content-table>
      <admin-content-search></admin-content-search>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminUsersContentTable from "@/components/admin/users/AdminUsersContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
export default {
  components: {
    AdminContent,
    AdminUsersContentTable,
    AdminContentSearch,
  },
};
</script>

<style lang="scss" scoped>
</style>