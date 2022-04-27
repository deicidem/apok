<template>
  <div class="data">
    <div class="data-title">Запланировать задачу</div>
    <div class="data-wrapper">
      <div class="data-task">
        <p class="data__subtitle">Задача:</p>
        <p class="data__text">Формирование температурных карт</p>
      </div>
      <div class="data-snapshot">
        <p class="data__subtitle">Задача:</p>
        <p class="data__text">Формирование температурных карт</p>
        <button class="button button-white">Выбрать</button>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.data {
  position: absolute;
  left: 0;
  top: 0;

  max-width: 680px;
  padding: 20px;

  background: $gradient-w;
  &-title {
    color: #000;
    font-size: 18px;
    text-align: center;
  }
  &-wrapper {
  }
  &-tast {
    display: flex;
    align-items: flex-start;
  }
  &-snapshot {
    display: flex;
    align-items: flex-start;
  }
  &-subtitle {
    max-width: 150px;
    font-size: 14px;
    color: $text-grey;
  }
  &-text {
    max-width: 200px;
    font-size: 12px;
    color: $text-grey;
  }
}
</style>
