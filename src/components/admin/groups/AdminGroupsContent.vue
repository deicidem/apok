<template>
  <admin-content>
    <admin-groups-content-table
      :groups="getGroups"
      @select="setActiveGroup"
      :activeGroup="getActiveGroup"
    ></admin-groups-content-table>
    <admin-content-search @submit="searchGroups($event)" @all="loadGroups()"></admin-content-search>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminGroupsContentTable from "@/components/admin/groups/AdminGroupsContentTable.vue";
import AdminContentSearch from "@/components/admin/AdminContentSearch.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AdminContent,
    AdminGroupsContentTable,
    AdminContentSearch,
  },
  computed: {
    ...mapGetters("admin/groups", ["getGroups", "getActiveGroup"]),
  },
  methods: {
    ...mapActions("admin/groups", ["loadGroups", "searchGroups", "setActiveGroup"]),
  },
};
</script>

<style lang="scss" scoped>
</style>