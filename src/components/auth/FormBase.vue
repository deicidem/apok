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
    &__item {
      margin-top: 20px;
      width: 100%;
      height: 44px;
      font-size: 16px;
      background: $white;
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
.invalid {
  border: 1px solid $color-red;
  transition: all 1s ease-out;
  color: $color-red;
  &:focus ~ .input-label,
  &:not(:placeholder-shown) ~ label {
    color: $color-red;
  }
  &:focus ~ .invalidIcon {
    color: $color-red;
  }
}
.invalidIcon {
  position: absolute;
  right: 0;
  top: 36%;
  transform: translate(-50%, -50%);
  color: $color-red;
}
.error {
  &-tooltip {
    margin: 2px 0 0 0;
    text-align: left;
    font-size: 12px;
    color: $color-red;
    p {
      margin: 0;
    }
  }
}
}
</style>