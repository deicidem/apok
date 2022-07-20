<template>
  <admin-content>
    <admin-content-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></admin-content-search>
    <admin-files-content-table
      :files="getFiles"
      @select="setActiveFile"
      :activeFile="getActiveFile"
    ></admin-files-content-table>
    <app-pagination
      :page-count="getPagination.last"
      @changePage="fetchFiles"
      :current-page="getPagination.currentPage"
    ></app-pagination>
   
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminFilesContentTable from "@/components/admin/files/AdminFilesContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import AppPagination from "@/components/controls/AppPagination";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AdminContent,
    AdminFilesContentTable,
    AdminContentSearch,
    AppPagination,
  },
  computed: {
    ...mapGetters("admin/files", ["getFiles", "getActiveFile", "getPagination", "isPending", "getSearchOptions", "getSortOptions"]),
  },
  methods: {
    ...mapActions("admin/files", ["fetchFiles", "filterBySearch", "setActiveFile", "fetchAll", "sortBy"]),
    
  },
};
</script>

<style lang="scss" scoped>
</style>