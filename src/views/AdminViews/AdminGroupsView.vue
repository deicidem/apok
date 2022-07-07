<template>
  <admin-main title="Группы">
    <template v-slot:content>
      <admin-users-content></admin-users-content>
    </template>
    <template v-slot:aside>
      <admin-users-aside></admin-users-aside>
    </template>
  </admin-main>
</template>

<script>
import AdminMain from "@/components/admin/AdminMain.vue";
import AdminUsersContent from "@/components/admin/users/AdminUsersContent.vue";
import AdminUsersAside from "@/components/admin/users/AdminUsersAside.vue";
export default {
  components: {
    AdminMain,
    AdminUsersContent,
    AdminUsersAside,
  },
};
</script>

<style>
</style>