<template>
  <admin-aside>
    <!-- <admin-users-aside-content></admin-users-aside-content> -->
    <admin-users-aside-form></admin-users-aside-form>
    <admin-aside-actions></admin-aside-actions>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
// import AdminUsersAsideContent from "@/components/admin/users/AdminUsersAsideContent.vue";
import AdminUsersAsideForm from "@/components/admin/users/AdminUsersAsideForm.vue";
import AdminAsideActions from "@/components/admin/AdminAsideActions.vue";

export default {
  components: {
    AdminAside,
    // AdminUsersAsideContent,
    AdminUsersAsideForm,
    AdminAsideActions,
  },
};
</script>

<style lang="scss" scoped>
</style>