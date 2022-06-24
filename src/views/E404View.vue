<template>
  <div class="error">
    <p class="error-number">404</p>
    <h1 class="error-title">Страница не найдена</h1>
    <p class="error-text">
      Перейдите на
      <router-link class="error-link" to="/main">главную страницу</router-link>
      сайта
    </p>
    <p class="error-text">Неверный адрес, либо страница больше не существует</p>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.error {
  &-number {
    color: $color-main;
    font-size: 128px;
    text-align: center;
  }
  &-title {
    color: $black;
    font-size: 32px;
    text-align: center;
    font-weight: 400;
  }
  &-text {
    margin-top: 10px;
    font-size: 16px;
    color: $black;
    text-align: center;
  }
  &-link {
    color: $color-main;
    border-bottom: 1px solid $color-main;
  }
}
</style>