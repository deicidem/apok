<template>
  <admin-aside-content title="Анна Афанасьева">
    <admin-users-aside-content-info></admin-users-aside-content-info>
    <admin-users-aside-content-info></admin-users-aside-content-info>
    <admin-users-aside-content-info></admin-users-aside-content-info>
    <admin-users-aside-content-info></admin-users-aside-content-info>
    <admin-users-aside-content-info></admin-users-aside-content-info>
    <admin-users-aside-content-links></admin-users-aside-content-links>
  </admin-aside-content>
</template>

<script>
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AdminUsersAsideContentInfo from "@/components/admin/users/AdminUsersAsideContentInfo.vue";
import AdminUsersAsideContentLinks from "@/components/admin/users/AdminUsersAsideContentLinks.vue";

export default {
  components: {
    AdminAsideContent,
    AdminUsersAsideContentInfo,
    AdminUsersAsideContentLinks,
  },
};
</script>

<style lang="scss" scoped>
</style>