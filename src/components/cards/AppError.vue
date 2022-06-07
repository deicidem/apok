<template>
  <div class="error">
    <h5 class="error-title">Ошибка 404</h5>
    <div class="error-text">Страница не найдена</div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.error {
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 10;
  min-width: 420px;
  padding: 10px 20px;
  background: $gradient-w;
  border-radius: 10px;
  border: 2px solid #D84949;
  box-shadow: $shadow-big;
  &-title {
    line-height: 1.5;
    color: #000;
    font-weight: 500;
    font-size: 18px;
  }
  &-text {
    color: $text-grey;
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
