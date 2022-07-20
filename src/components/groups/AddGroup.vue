<template>
  <div class="group-popup">
    <div class="group-popup-card">
      <div class="group-popup-cross" @click="$emit('close')">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <admin-groups-aside-form></admin-groups-aside-form>
    </div>
  </div>
</template>

<script>
import AdminGroupsAsideForm from "@/components/admin/groups/AdminGroupsAsideForm.vue";

export default {
  components: {
    AdminGroupsAsideForm,
  },
};
</script>

<style lang="scss" scoped>
.group-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;
  background: rgba($black, 0.5);

  &-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-cross {
    position: absolute;
    right: 20px;
    top: 10px;
    z-index:10;
    font-size: 20px;
    cursor: pointer;
    color: $color-main;
  }
}
</style>