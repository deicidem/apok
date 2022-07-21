<template>
  <admin-content>
    <admin-content-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></admin-content-search>
    <admin-users-content-table
      :users="getUsers"
      @select="setActiveUser"
      :activeUser="getActiveUser"
      @check="selectUser"
      :disabled="isPending"
    ></admin-users-content-table>

    <app-pagination
      :page-count="getPagination.last"
      @changePage="fetchUsers"
      :current-page="getPagination.currentPage"
    >
    </app-pagination>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminUsersContentTable from "@/components/admin/users/AdminUsersContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import AppPagination from "@/components/controls/AppPagination";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminContent,
    AdminUsersContentTable,
    AdminContentSearch,
    AppPagination,
  },

  computed: {
    ...mapGetters("admin/users", [
      "getUsers",
      "getActiveUser",
      "getPagination",
      "isPending",
      "getSearchOptions",
      "getSortOptions",
    ]),
  },

  methods: {
    ...mapActions("admin/users", [
      "fetchUsers",
      "filterBySearch",
      "setActiveUser",
      "selectUser",
      "fetchAll",
      "sortBy",
    ]),
  },
};
</script>

<style lang="scss">
</style>