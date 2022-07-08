<template>
  <div class="admin-content">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.admin-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>