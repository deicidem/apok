<template>
  <page-base :show-menu="false">
    <div class="main">
      <admin-sidebar></admin-sidebar>
      <admin-aside></admin-aside>
    </div>
  </page-base>
</template>

<script>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminAside from "@/components/admin/AdminAside.vue";
import PageBase from "@/components/PageBase.vue";

export default {
  components: {
    AdminSidebar,
    AdminAside,
    PageBase,
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  padding: 20px;
}
</style>