<template>
  <div class="c-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.c {
  &-wrapper {
    background: $white;
    position: relative;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    box-shadow: $shadow-small;
    border-radius: 5px;
  }
  
  &-title {
    margin-top: 0;
    font-size: 12px;
    color: $text-grey;
    margin-bottom: 5px;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-text {
    position: relative;
    font-size: 12px;
    width: 100%;
    text-align: left;
    color: $black;
  }
  &-btn {
    margin-left: 10px;
  }
  &-btns {
    padding: 0px 10px;
    margin: 0 0 0 auto;
    display: flex;
    align-items: flex-end;
  }
}
</style>