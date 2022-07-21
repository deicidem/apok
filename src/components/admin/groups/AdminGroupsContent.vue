<template>
  <admin-content>
    <app-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></app-search>
    <admin-groups-content-table
      :groups="getGroups"
      @select="setActiveGroup"
      :activeGroup="getActiveGroup"
    ></admin-groups-content-table>
    <app-pagination
      :page-count="getPagination.last"
      @changePage="fetchGroups"
      :current-page="getPagination.currentPage"
    ></app-pagination>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminGroupsContentTable from "@/components/admin/groups/AdminGroupsContentTable.vue";
import AppSearch from "@/components/AppSearch.vue";
import AppPagination from "@/components/controls/AppPagination";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AdminContent,
    AdminGroupsContentTable,
    AppSearch,
    AppPagination,
  },
  computed: {
    ...mapGetters("admin/groups", ["getGroups", "getActiveGroup", "getPagination", "isPending", "getSearchOptions", "getSortOptions"]),
  },
  methods: {
    ...mapActions("admin/groups", ["fetchGroups", "filterBySearch", "setActiveGroup", "fetchAll", "sortBy"]),
  },
};
</script>

<style lang="scss" scoped>
</style>