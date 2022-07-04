<template>
  <div class="users-wrapper">
    <admin-table-base></admin-table-base>
    
  </div>
</template>

<script>
import AdminTableBase from "@/components/admin/AdminTableBase.vue";

export default {
  components: { AdminTableBase },
};
</script>

<style lang="scss" scoped>
.users-wrapper {
  width: 700px;
  display: flex;
}
</style>