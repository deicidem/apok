<template>
  <div >
    <app-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></app-search>
    <groups-popup-users-table
    v-if="loaded"
      :users="getUsers"
      :pending="isPending"
      @select="selectUser"
    ></groups-popup-users-table>
    <app-pagination
      :page-count="getPagination.last"
      @changePage="fetchUsers"
      :current-page="getPagination.currentPage"
    ></app-pagination>
  </div>
</template>

<script>
import AppPagination from "@/components/controls/AppPagination.vue";
import AppSearch from "@/components/AppSearch.vue";
import { mapGetters, mapActions } from "vuex";
import GroupsPopupUsersTable from "@/components/groups/GroupsPopupUsersTable.vue";
export default {
  components: {
    GroupsPopupUsersTable,
    AppSearch,
    AppPagination,
  },
  data: () => ({
    loaded: false,
  }),
  async mounted() {
    await this.fetchUsers();
    this.loaded = true;
  },
  computed: {
    ...mapGetters("groupUsers", [
      "getUsers",
      "getPagination",
      "isPending",
      "getSortOptions",
      "getSearchOptions",
    ]),
    noItemsSelected() {
      let users = this.getUsers;
      let res = true;
      for (let i = 0; i < users.length; i++) {
        if (users[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
  },
  methods: {
    ...mapActions("groupUsers", [
      "fetchUsers",
      "fetchAll",
      "sortBy",
      "filterBySearch",
      "deleteGroups",
      "selectUser",
      "deleteGroup",
    ]),
  },
};
</script>

<style>
</style>