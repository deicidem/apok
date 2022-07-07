<template>
  <admin-content>
    <admin-files-content-table
      :files="getFiles"
      @select="setActiveFile"
      :activeFile="getActiveFile"
    ></admin-files-content-table>
    <admin-content-search @submit="searchFiles($event)"></admin-content-search>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminFilesContentTable from "@/components/admin/files/AdminFilesContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AdminContent,
    AdminFilesContentTable,
    AdminContentSearch,
  },
  computed: {
    ...mapGetters("admin/files", ["getFiles", "getActiveFile"]),
  },
  methods: {
    ...mapActions("admin/files", ["loadFiles", "searchFiles", "setActiveFile"]),
  },
  mounted() {
    this.loadFiles();
  },
};
</script>

<style lang="scss" scoped>
</style>