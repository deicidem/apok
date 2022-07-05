<template>
  <div class="admin-aside">
    <h1 class="admin-aside-title">Пользователи</h1>

    <div class="admin-aside-wrapper">
      <admin-content></admin-content>

      <div class="admin-aside-left">
        <admin-aside-info></admin-aside-info>
        <admin-aside-actions></admin-aside-actions>
      </div>
    </div>
  </div>
</template>

<script>
import AdminContent from "@/components/admin/AdminContent.vue";
import AdminAsideInfo from "@/components/admin/AdminAsideInfo.vue";
import AdminAsideActions from "@/components/admin/AdminAsideActions.vue";

export default {
  components: {
    AdminContent,
    AdminAsideInfo,
    AdminAsideActions,
  },
};
</script>

<style lang="scss" scoped>
.admin-aside {
  background: $gradient-w;
  margin-left: 30px;
  width: 100%;
  border-radius: 20px;
  box-shadow: $shadow-big;
  height: 100%;
  padding: 30px;

  &-title {
    margin: 0;
    font-size: 22px;
    font-weight: 400;
    text-align: center;
  }

  &-wrapper {
    margin-top: 30px;
    display: flex;
    width: 100%;
  }

  &-left {
    width: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>