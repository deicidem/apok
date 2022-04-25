<template>
  <div class="plan-popup">
    <div class="popup-card">
      <div class="popup-card__header">
        <div class="back" @click="$emit('close')">
          <div class="back-arrow">
            <img src="@/assets/img/arrow.svg" />
          </div>
          <p class="back-subtitle">Назад</p>
        </div>

        <h2 class="popup-card__title">Запланировать задачу</h2>
      </div>
      <div class="popup-card__subtitle">Формирование температурных карт</div>

      <div class="popup-card__wrapper">
        <div class="popup-card__item">
          <div class="popup-card__loading">
            <div class="popup-card__buttons">
              <button class="button button-g">Загрузить файл</button>
              <p>POLYGON.shp</p>
            </div>
            <div class="popup-card__line"></div>
            <div class="popup-card__link">
              <div class="card-link">
                <p>ftp://uic@imccloud.novacenter.ru:2021/Work_id_453</p>
                <button class="button button-svg">
                  <img src="@/assets/img/link.svg" />
                </button>
              </div>
              <p class="popup-card__text">
                Вы можете использовать удобный вам менеджер файлов для загрузки.
              </p>
            </div>
          </div>
          <button class="button button-g popup-card__button">Начать</button>
        </div>

        <div class="popup-card__info">
          <div class="info-title">
            Описание директорий, автоматически создаваемых программой
          </div>
          <div class="info-table">
            <div class="info-table__item">
              <p class="info-table__title">Корневой каталог</p>
              <div class="info-table__wrapper">
                <div class="info-table__vertical"></div>
                <p class="info-table__text">
                  Необходимо загрузить исходные материалы, полученные с КА
                  Landsat-8: каналы B1- B7 и B10,B11, и паспорт снимка в формате
                  TXT.
                </p>
              </div>
            </div>
            <div class="popup-card__line"></div>
            <div class="info-table__item">
              <p class="info-table__title">«shp»</p>
              <div class="info-table__wrapper">
                <div class="info-table__vertical"></div>
                <p class="info-table__text">
                  Используется для автомотического сохранения результатов в
                  векторном формате SHP. Изначально пустая
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.plan-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background: rgba(#000, 0.5);
  .popup-card {
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);

    padding: 20px;

    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;

    &__header {
      position: relative;
    }
    &__title {
      font-size: 22px;
      text-align: center;
      color: $text-grey;
    }
    &__subtitle {
      font-size: 20px;
      text-align: center;
      color: $text-grey;
    }
    &__wrapper {
      display: flex;
      margin-top: 20px;
    }
    &__loading {
      width: 500px;
      padding: 20px;

      box-shadow: $shadow-small;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
    }
    &__buttons {
      display: flex;
      align-items: center;
      p {
        font-size: 12px;
        margin-left: 40px;
        color: $text-grey;
      }
    }
    &__button {
      margin-top: 20px;
      float: right;
    }
    &__info {
      width: 500px;
      padding: 20px;

      box-shadow: $shadow-small;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
    }
    &__line {
      margin: 10px 0;
      border-top: 1px solid #ebf0f0;
      width: 100%;
    }
    &__text {
      margin-top: 6px;

      color: $text-grey;
      font-size: 12px;
    }
    .card-link {
      display: flex;
      text-align: center;
      justify-content: space-between;
      p {
        font-size: 12px;
        line-height: 26px;
        color: $color-main-dark;
      }
    }
    &__info {
      margin-left: 20px;
      .info {
        &-title {
          color: $text-grey;
          text-align: center;
        }
        &-table {
          &__item {
            position: relative;

            display: flex;
            align-items: stretch;
            margin-top: 20px;
          }
          &__title {
            margin-right: 10px;
            width: 160px;

            color: $color-main-dark;
          }
          &__wrapper {
            display: flex;
          }
          &__vertical {
            height: 100%;
            margin-right: 10px;

            border-left: 1px solid #ebf0f0;
          }
          &__text {
            max-width: 460px;
            margin-right: 10px;

            color: $text-grey;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.back {
  display: flex;
  align-items: center;
  position: absolute;
  &-arrow {
    width: 40px;
  }
  p {
    margin-left: 10px;
    color: $text-grey;
  }
}
</style>
