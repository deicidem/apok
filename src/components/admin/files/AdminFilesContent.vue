<template>
  <admin-content>
    <app-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></app-search>
    <admin-files-content-table
      :files="getFiles"
      @select="setActiveFile"
      :activeFile="getActiveFile"
      :pending="isPending"
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
import AppSearch from "@/components/AppSearch.vue";
import AppPagination from "@/components/controls/AppPagination";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AdminContent,
    AdminFilesContentTable,
    AppSearch,
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