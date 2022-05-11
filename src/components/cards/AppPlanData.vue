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
            <p class="data__subtitle">Архивный снимок</p>
            <p class="data__text">
              ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK
            </p>
          </div>
          <div class="data-btns">
            <button class="button button-svg data-btn">
              <img src="@/assets/img/choose.svg" />
            </button>
            <button class="button button-svg data-btn">
              <img src="@/assets/img/upload.svg" />
            </button>
          </div>
        </div>
        <div class="data-item">
          <div class="data-info">
            <p class="data__subtitle">Актуальный снимок</p>
            <p class="data__text">
              ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK
            </p>
          </div>
          <div class="data-btns">
            <button class="button button-svg data-btn">
              <img src="@/assets/img/choose.svg" />
            </button>
            <button class="button button-svg data-btn">
              <img src="@/assets/img/upload.svg" />
            </button>
          </div>
        </div>
      </div>
      <button class="data-start button button-g">Начать</button>
    </div>
    <div class="data-line">
      <div class="data-close">
        <img src="@/assets/img/arrow-plan.svg" alt="" />
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
  min-width: 500px;
  margin: 20px;

  background: $gradient-w;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow-big;

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
  }
  &-line {
    width: 40px;
    background-color: $color-main;
    display: flex;
    align-items: center;
  }
  &-title {
    color: #000;
    font-size: 18px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 16px;
  }
  &-wrapper {
  }
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    background: $gradient-w;
    padding: 6px;
    box-shadow: $shadow-big;
    border-radius: 5px;
  }
  &-info {
  }
  &__subtitle {
    font-weight: bold;
    font-size: 10px;
    color: $text-grey;
  }
  &__text {
    font-size: 12px;
    font-weight: 300;
    width: 100%;
    text-align: left;
    color: $text-grey;
  }
  &-close {
  }
  &-btns {
    display: flex;
    justify-content: space-between;
    max-width: 250px;
  }
  &-btn {
    margin: 0 6px;
  }
  &-start {
    width: 200px;
    margin: 10px 16px 0 auto;
  }
}
</style>
