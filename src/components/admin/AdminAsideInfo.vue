<template>
  <div class="aside-info">
    <h3 class="aside-info-title">Анна Афанасьева</h3>
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
  border-radius: 10px;
  height: 100%;
  box-shadow: $shadow-big;
  padding: 20px;

  &-title {
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    margin: 0;
  }
}
</style>