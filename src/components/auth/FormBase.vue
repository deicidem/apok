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
  width: 400px;
  padding: 30px 40px 30px 40px;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;

  &-title {
    text-align: center;
    font-size: 20px;
    color: $black;
    margin-bottom: 20px;
  }

  &-form {
    &__input {
      margin-top: 30px;
    }

    &__item {
      margin-top: 20px;
    }
  }

  &-remember {
    display: flex;
    margin-top: 20px;
    width: 100%;

    &__text {
      margin-left: 10px;
      color: $text-grey;
      font-size: 14px;
    }
  }
}
</style>