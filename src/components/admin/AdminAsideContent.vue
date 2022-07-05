<template>
  <div class="aside-info">
    <h3 class="aside-info-title">{{title}}</h3>
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: ['title']
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