<template>
  <div class="admin-aside">
    <h1 class="admin-aside-title">Пользователи</h1>

    <div class="admin-aside-wrapper">
      <admin-table-users></admin-table-users>
      <admin-aside-info></admin-aside-info>
    </div>
  </div>
</template>

<script>
import AdminTableUsers from "@/components/admin/AdminTableUsers.vue";
import AdminAsideInfo from "@/components/admin/AdminAsideInfo.vue";

export default {
  components: {
    AdminTableUsers,
    AdminAsideInfo,
  },
};
</script>

<style lang="scss" scoped>
.admin-aside {
  background: $white;
  margin-left: 30px;
  width: 100%;
  border-radius: 20px;
  height: 100%;
  box-shadow: $shadow-big;
  height: auto;
  padding: 30px;

  &-title {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }

  &-wrapper {
    margin-top: 30px;
    display: flex;
    width: 100%;
  }
}
</style>