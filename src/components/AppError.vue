<template>
  <div class="error">
    <div class="error-wrapper">
      <h5 class="error-title">Ошибка 404</h5>
      <div class="error-text">Страница не найдена</div>
      <div class="error-cross">
        <i class="fa-solid fa-xmark"></i>
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
    display: flex;
    flex-direction: column;
  }

  &-title {
    margin: 0;
    line-height: 1.5;
    color: $black;
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
    color: $color-red;
    font-size: 20px;

    &:hover {
      color: $color-main-dark;
    }
  }
}
</style>
