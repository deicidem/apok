<template>
  <div class="message" :class="status">
    <div class="message-icon">
      <i class="icon icon-ic_fluent_error_circle_20_regular" v-if="status == 'error'"></i>
      <i class="icon icon-ic_fluent_checkmark_circle_20_regular" v-else-if="status == 'valid'"></i> 
    </div>
    <div class="message-text">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "message"],
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  left: 0;
  bottom: calc(100% + 20px);
  position: absolute;
  width: 100%;
  padding: 15px;
  background: $gradient-w;
  box-shadow: $shadow-big;
  border-radius: 10px;
  color: $color-main;
  &.valid &-icon {
      color: #40c545;
    }
  &.error {
    background: $gradient-r;
  }
  &.error &-text, &.error &-icon {
    color: #fff;
  }
  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: $color-main;
    width: 36px;
    height: 36px;
    margin-right: 20px;
    .icon {
      line-height: 0;
    }
  }
  &-text {
    text-align: left;
    font-size: 16px;
  }
}
</style>