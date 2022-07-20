<template>
  <admin-content>
     <admin-content-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></admin-content-search>
    <admin-tasks-content-table
      :tasks="getTasks"
      @select="setActiveTask"
      :activeTask="getActiveTask"
    ></admin-tasks-content-table>
    <app-pagination
      :page-count="getPagination.last"
      @changePage="fetchTasks"
      :current-page="getPagination.currentPage"
    ></app-pagination>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminTasksContentTable from "@/components/admin/tasks/AdminTasksContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import AppPagination from "@/components/controls/AppPagination";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminContent,
    AdminTasksContentTable,
    AdminContentSearch,
    AppPagination,
  },

  computed: {
    ...mapGetters("admin/tasks", ["getTasks", "getActiveTask", "getPagination", "isPending","getSearchOptions", "getSortOptions"]),
  },

  methods: {
    ...mapActions("admin/tasks", ["fetchTasks", "filterBySearch", "setActiveTask", "fetchAll", "sortBy"]),
  },
 
};
</script>

<style lang="scss" scoped>
</style>