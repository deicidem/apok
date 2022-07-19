<template>
  <admin-content>
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
    <admin-content-search @submit="filterBySearch($event)" @all="fetchAll()"></admin-content-search>
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
    ...mapGetters("admin/files", ["getFiles", "getActiveFile", "getPagination", "isPending"]),
  },
  methods: {
    ...mapActions("admin/files", ["fetchFiles", "filterBySearch", "setActiveFile", "fetchAll"]),
    
  },
};
</script>

<style lang="scss" scoped>
</style>