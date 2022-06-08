<template>
  <div class="error">
    <div class="error-wrapper">
      <h5 class="error-title">Ошибка 404</h5>
      <div class="error-text">Страница не найдена</div>
      <div class="error-cross">
        <img svg-inline src="@/assets/img/cross.svg" alt="Закрыть" />
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.error {
  display: none;
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 10;
  min-width: 420px;
  padding: 10px 20px;
  background: $gradient-w;
  border-radius: 10px;
  border: 2px solid #d84949;
  box-shadow: $shadow-big;
  &-wrapper {
    position: relative;
  }
  &-title {
    margin: 0;
    line-height: 1.5;
    color: #000;
    font-weight: 500;
    font-size: 18px;
  }
  &-text {
    color: $text-grey;
    font-weight: 400;
    font-size: 14px;
    margin: 10px auto 10px 0;
  }
  &-cross {
    position: absolute;
    right: 0;
    top: 0;
    svg path {
      fill: $color-red;
    }
  }
}
</style>
