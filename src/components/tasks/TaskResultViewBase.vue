<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  .image {
    padding: 10px;
    width: auto;
    max-width: 100%;
    background: $white;
    border-radius: 10px;
    box-shadow: $shadow-small;
    &-wrapper {
      margin: 20px auto;
    }
  }
  .button-group {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .button {
      flex: 1 1 auto;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  
</style>