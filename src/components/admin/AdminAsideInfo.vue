<template>
  <div class="aside-info">
    <h1 class="aside-info-title">Анна Афанасьева</h1>
    <admin-aside-user-info></admin-aside-user-info>
    <admin-aside-links></admin-aside-links>
  </div>
</template>

<script>
import AdminAsideUserInfo from "@/components/admin/AdminAsideUserInfo.vue";
import AdminAsideLinks from "@/components/admin/AdminAsideLinks.vue";

export default {
  components: {
    AdminAsideUserInfo,
    AdminAsideLinks,
  },
};
</script>

<style lang="scss" scoped>
.aside-info {
  background: $white;
  width: 100%;
  border-radius: 20px;
  height: 100%;
  box-shadow: $shadow-big;
  margin-left: 20px;
  padding: 20px;

  &-title {
        font-weight: 400;
    font-size: 18px;
    text-align: center;
  }
}
</style>