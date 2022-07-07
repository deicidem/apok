<template>
  <admin-main title="Задачи">
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
export default {
  components: {
    AdminMain,
    AdminTasksContent,
    AdminTasksAside,
  },
};
</script>

<style>
</style>