<template>
  <div class="error">
    <h1>Ошибка 404</h1>
    <h2>Страница не найдена</h2>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.error {
  position: absolute;
  right: 30px;
  bottom: 30px;
  z-index: 10;
  padding: 20px;
  background: $gradient-w;
  border-radius: 10px;
  border: 2px solid $color-red;
  h1 {
    color: #000;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 10px;
  }
  h2 {
    color: $text-grey;
    font-weight: 400;
    font-size: 12px;
  }
}
</style>
