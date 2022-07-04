<template>
  <div class="user-info">
    <h1 class="user-info-title">Личные данные</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user-info {
  background: $white;
  border-radius: 20px;
  height: 100%;
  box-shadow: $shadow-big;
  margin-left: 20px;
  margin-top: 30px;
  padding: 20px;

  &-title {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>