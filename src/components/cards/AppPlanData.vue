<template>
  <div class="data">
    <div class="data-content">
      <div class="data-title">Запланировать задачу</div>
      <div class="data-wrapper">
        <div class="data-item">
          <div class="data-info">
            <p class="data__subtitle">Задача:</p>
            <p class="data__text">Формирование температурных карт</p>
          </div>
        </div>
        <div class="data-item">
          <div class="data-info">
            <p class="data__subtitle">Снимок:</p>
            <p class="data__text">Формирование температурных карт</p>
          </div>
          <div class="data-btns">
            <button class="button button-white data-btn">Выбрать</button>
            <button class="button button-white data-btn">Загрузить</button>
          </div>
        </div>
      </div>
      <button class="data-start button button-g">Начать</button>
    </div>
    <div class="data-line">
      <div class="data-close">
        <img src="@/assets/img/cross-w.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.data {
  position: absolute;
  left: 100%;
  top: 0;

  display: flex;
  justify-content: space-between;
  width: 680px;

  background: $gradient-w;
  border-radius: 0 20px 20px 0;
  overflow: hidden;

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 640px;
    padding: 20px;
  }
  &-line {
    width: 40px;
    background-color: $color-main;
  }
  &-title {
    color: #000;
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }
  &-wrapper {
  }
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
  }
  &-info {
    display: flex;
  }
  &__subtitle {
    width: 100px;
    font-size: 14px;
    color: $text-grey;
  }
  &__text {
    font-size: 12px;
    text-align: left;
    color: $text-grey;
  }
  &-close {
    width: 16px;
    margin-top: 20px;
    margin-left: 10px;
  }
  &-btns {
    display: flex;
    justify-content: space-between;
    max-width: 250px;
  }
  &-btn {
    margin-left: 10px;
  }
  &-start {
    width: 100px;
    margin: 10px auto 0 auto;
  }
}
</style>
