<template>
  <admin-content>
    <admin-tasks-content-table
      :tasks="getTasks"
      @select="setActiveTask"
      :activeTask="getActiveTask"
    ></admin-tasks-content-table>
    <admin-content-search
      @submit="searchTasks($event)"
      @all="loadTasks()"
    ></admin-content-search>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminTasksContentTable from "@/components/admin/tasks/AdminTasksContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminContent,
    AdminTasksContentTable,
    AdminContentSearch,
  },

  computed: {
    ...mapGetters("admin/tasks", ["getTasks", "getActiveTask"]),
  },

  methods: {
    ...mapActions("admin/tasks", ["loadTasks", "searchTasks", "setActiveTask"]),
  },
 
};
</script>

<style lang="scss" scoped>
</style>