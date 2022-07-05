<template>
  <div class="admin-aside">
    <slot></slot>
  </div>
</template>

<script>

export default {
};
</script>

<style lang="scss" scoped>
.admin-aside {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>