<template>
  <admin-aside-content title="Анна Афанасьева">
    <admin-users-aside-info></admin-users-aside-info>
    <admin-users-aside-links></admin-users-aside-links>
  </admin-aside-content>
</template>

<script>
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AdminUsersAsideInfo from "@/components/admin/users/AdminUsersAsideInfo.vue";
import AdminUsersAsideLinks from "@/components/admin/users/AdminUsersAsideLinks.vue";

export default {
  components: {
    AdminAsideContent,
    AdminUsersAsideInfo,
    AdminUsersAsideLinks,
  },
};
</script>

<style lang="scss" scoped>
</style>