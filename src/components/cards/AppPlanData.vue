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
            <p class="data__subtitle">Архивный снимок:</p>
            <p class="data__text">
              ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK
            </p>
          </div>
          <div class="data-btns">
            <div class="data-btn">
              <button class="button button-svg data-btn">
                <img src="@/assets/img/choose.svg" />
              </button>
              <span class="data-tooltiptext">Выбрать</span>
            </div>
            <div class="data-btn">
              <button class="button button-svg data-btn">
                <img src="@/assets/img/upload.svg" />
              </button>
              <span class="data-tooltiptext">Загрузить</span>
            </div>
          </div>
        </div>
        <div class="data-item">
          <div class="data-info">
            <p class="data__subtitle">Актуальный снимок:</p>
            <p class="data__text">
              ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK
            </p>
          </div>
          <div class="data-btns">
            <div class="data-btn">
              <button class="button button-svg data-btn">
                <img src="@/assets/img/choose.svg" />
              </button>
              <span class="data-tooltiptext">Выбрать</span>
            </div>
            <div class="data-btn">
              <button class="button button-svg data-btn">
                <img src="@/assets/img/upload.svg" />
              </button>
              <span class="data-tooltiptext">Загрузить</span>
            </div>
          </div>
        </div>
      </div>
      <button class="button button-g data-start">Начать</button>
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
  left: calc(100% + 20px);
  top: 37px;

  display: flex;
  justify-content: space-between;
  min-width: 540px;

  background: $gradient-w;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow-big;
  transition: all 0.3s ease-out;
  transform: translateX(calc(-100% + 10px));
  &:hover {
    transform: translate(0);
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
  }
  &-line {
    width: 30px;
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
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    background: $gradient-w;
    padding: 6px;
    box-shadow: $shadow-small;
    border-radius: 5px;
  }
  &__subtitle {
    font-size: 12px;
    color: $text-grey-light;
  }
  &__text {
    font-size: 12px;
    width: 100%;
    text-align: left;
    color: #313131;
  }

  &-btns {
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
  }
  &-btn {
    position: relative;
    margin: 0 4px;
    &:hover .data-tooltiptext {
      display: block;
    }
  }
  &-tooltiptext {
    position: absolute;
    bottom: 110%;
    right: calc(0px - 6px);

    display: none;
    padding: 2px 5px;

    color: $color-main-dark;
    font-size: 10px;
    background: $gradient-w;
    border-radius: 6px;
    box-shadow: $shadow-small;
  }
  &-start {
    width: 200px;
    margin: 10px 16px 0 auto;
  }
}
</style>
