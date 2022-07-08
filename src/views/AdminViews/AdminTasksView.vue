<template>
  <admin-main :title="title" :loading="loading">
    <template v-slot:content>
      <admin-tasks-content></admin-tasks-content>
    </template>
    <template v-slot:aside>
      <admin-tasks-aside></admin-tasks-aside>
    </template>
  </admin-main>
</template>

<script>
import AdminMain from "@/components/admin/AdminMain.vue";
import AdminTasksContent from "@/components/admin/tasks/AdminTasksContent.vue";
import AdminTasksAside from "@/components/admin/tasks/AdminTasksAside.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminMain,
    AdminTasksContent,
    AdminTasksAside,
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('admin/tasks', ['getTasksUser']),
    title() {
      if (this.getTasksUser != null) {
        return `Задачи (Пользователь - ${this.getTasksUser.name})`
      } else {
        return `Задачи`
      }
    }
  },
  methods: {
    ...mapActions('admin/tasks', ['loadTasks', 'loadTasksByUser'])
  },
  async mounted() {
    if (this.$route.query?.userId) {
      await this.loadTasksByUser(this.$route.query?.userId);
    } else {
      await this.loadTasks();
    }
    this.loading = false;
  },
};
</script>

<style>
</style>