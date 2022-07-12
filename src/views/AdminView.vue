<template>
  <page-base :show-menu="false">
    <div class="c">
      <admin-sidebar></admin-sidebar>
      <router-view></router-view>
    </div>
  </page-base>
</template>

<script>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import PageBase from "@/components/PageBase.vue";

export default {
  components: {
    AdminSidebar,
    PageBase,
  },
};
</script>

<style lang="scss" scoped>

.c {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}
</style>