<template>
  <div class="error">
    <div class="error-wrapper">
      <h5 class="error-title">{{title}}</h5>
      <div class="error-text">{{message}}</div>
      <div class="error-cross" @click="$emit('close')">
        <i class="icon icon-ic_fluent_dismiss_20_regular"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'message']
}
</script>

<style scoped lang="scss">
.error {
  // display: none;
  position: relative;
  min-width: 420px;
  padding: 5px 30px 5px 10px;
  background: $white;
  border-radius: 10px;
  border: 1px solid #d84949;
  box-shadow: $shadow-big;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  &-wrapper {
    display: flex;
    flex-direction: column;
  }

  &-title {
    margin: 0;
    line-height: 1.5;
    color: $black;
    font-weight: 500;
    font-size: 16px;
  }

  &-text {
    color: $text-grey;
    font-weight: 400;
    font-size: 12px;
  }

  &-cross {
    display: flex;
    position: absolute;
    right: 5px;
    top: 5px;
    color: $color-red;
    font-size: 20px;
      cursor: pointer;
    &:hover {
      color: lighten($color-red, 10);
    }
  }
}
</style>
