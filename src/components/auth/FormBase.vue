<template>
  <div class="c">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.c {
  position: relative;
  background: $gradient-w;
  margin: 30px 0 0 0;
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;
  margin: 16% auto;
  &-title {
    text-align: center;
    font-size: 20px;
    color: $black;
    margin-bottom: 20px;
  }
  &-form {
    &__item {
      width: 300px;
      height: 40px;
      margin: 10px auto;
      font-size: 16px;
      background: $white;
    }
  }
}
</style>