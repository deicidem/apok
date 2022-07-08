<template>
  <admin-aside>
    <template v-slot:content>
      <admin-tasks-aside-content></admin-tasks-aside-content>
    </template>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
import AdminTasksAsideContent from "@/components/admin/tasks/AdminTasksAsideContent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminAside,
    AdminTasksAsideContent,
  },

  computed: {
    ...mapGetters("admin/tasks", ["getActiveTask"]),
  },

  methods: {
    ...mapActions("admin/tasks", ["setActiveTask"]),
  },
};
</script>

<style lang="scss" scoped>
</style>

