<template>
  <admin-content>
    <app-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></app-search>
    <admin-users-content-table
      :users="getUsers"
      @select="setActiveUser"
      @exclude="exclude"
      :activeUser="getActiveUser"
      @check="selectUser"
      :pending="isPending"
      :isGroupUsers="getUsersGroup != null"
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
import AppSearch from "@/components/AppSearch.vue";
import AppPagination from "@/components/controls/AppPagination";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminContent,
    AdminUsersContentTable,
    AppSearch,
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
      "getUsersGroup"
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
      "exclude"
    ]),
  },
};
</script>

<style lang="scss">
</style>