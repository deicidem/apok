<template>
  <admin-content>
    <admin-users-content-table
      :users="getUsers"
      @select="setActiveUser"
      :activeUser="getActiveUser"
      @check="selectUser"
    ></admin-users-content-table>
    <app-pagination
      :page-count="getPagination.last"
      @changePage="loadUsers"
      :current-page="getPagination.currentPage"
    >
    </app-pagination>
    <admin-content-search
      @submit="searchUsers($event)"
      @all="loadUsers()"
    ></admin-content-search>
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
    ...mapGetters("admin/users", ["getUsers", "getActiveUser", "getPagination"]),
  },

  methods: {
    ...mapActions("admin/users", [
      "loadUsers",
      "searchUsers",
      "setActiveUser",
      "selectUser",
    ]),
    onPageChanged(currentPage) {
      this.pageNo = currentPage;
    },
  },
};
</script>

<style lang="scss">

</style>