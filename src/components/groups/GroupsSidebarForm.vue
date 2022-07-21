<template>
  <div class="groups-sidebar-form">
    <add-group @close="$emit('close')"></add-group>
  </div>
</template>

<script>
import AddGroup from "@/components/groups/AddGroup.vue";

export default {
  components: {
    AddGroup,
  },
};
</script>

<style lang="scss" scoped>
.groups-sidebar-form {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;
  background: rgba($black, 0.5);
}
</style>