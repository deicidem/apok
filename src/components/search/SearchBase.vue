<template>
  <div class="c" :class="{ invalid }">
    <div class="c-error-message">
      <slot name="error-message"></slot>
    </div>
    <div class="c-wrapper">
      <h3 class="c-title">{{ title }}</h3>
      <div class="c-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "invalid"],
};
</script>

<style lang="scss" scoped>
.c {
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }

  &.invalid &-wrapper {
    border: 1px solid $color-red;
  }

  &.invalid &-error-message {
    display: block;
  }

  &-title {
    margin: 0 0 20px 0;
    font-weight: 400;
    font-size: 1.25rem;
    color: $black;
  }

  &-error-message {
    display: none;
    color: $color-red;
    margin-left: 10px;
  }

  &-wrapper {
    padding: 20px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
  }
}
</style>