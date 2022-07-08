<template>
  <admin-content>
    <admin-users-content-table
      :users="getUsers"
      @select="setActiveUser"
      :activeUser="getActiveUser"
    ></admin-users-content-table>
    <admin-content-search @submit="searchUsers($event)" @all="loadUsers()"></admin-content-search>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminUsersContentTable from "@/components/admin/users/AdminUsersContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminContent,
    AdminUsersContentTable,
    AdminContentSearch,
  },

  computed: {
    ...mapGetters("admin/users", ["getUsers", "getActiveUser"]),
  },

  methods: {
    ...mapActions("admin/users", ["loadUsers", "searchUsers", "setActiveUser"]),
  },
};
</script>

<style lang="scss" scoped>
</style>