<template>
  <div class="admin-aside-block">
    <h3 class="admin-aside-block-title">{{title}}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="scss" scoped>
.admin-aside-block {
  background: $white;
  border-radius: 10px;
  box-shadow: $shadow-small;
  margin-bottom: 20px;
  padding: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  &-title {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>