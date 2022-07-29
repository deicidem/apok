<template>
  <admin-aside-content :title="title">
    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    </template>

    <admin-tasks-aside-content-info
      v-if="getActiveTask != null"
      :task="getActiveTask"
      @update="updateTask"
      @delete="onDelete"
    ></admin-tasks-aside-content-info>
    <admin-tasks-aside-content-links v-if="getActiveTask != null" 
    @filterByUser="filterByUser(getActiveTask.user.id)"></admin-tasks-aside-content-links>
  </admin-aside-content>
</template>

<script>
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AdminTasksAsideContentInfo from "@/components/admin/tasks/AdminTasksAsideContentInfo.vue";
import AdminTasksAsideContentLinks from "@/components/admin/tasks/AdminTasksAsideContentLinks.vue";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminAsideContent,
    AdminTasksAsideContentInfo,
    AdminTasksAsideContentLinks,
    AppDeleteConfirmation,
  },

  computed: {
    ...mapGetters("admin/tasks", ["getActiveTask"]),
    title() {
      if (this.getActiveTask != null) {
        return `Задача: ${this.getActiveTask.title}`;
      }
      return "Задача не выбрана";
    },
  },

  methods: {
    ...mapActions("admin/tasks", ["updateTask", "deleteTask", "filterByUser"]),
    async onDelete(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эту задачу?",
        message:
          "Удаление этой задачи приведет к потере всех связанных с ней данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteTask(id);
        this.pending = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>