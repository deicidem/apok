<template>
  <div class="plan-popup">
    <div class="popup-card">
      <div class="popup-card__header">
        <div class="back" @click="$emit('close', file)">
          <div class="back-arrow">
            <img src="@/assets/img/arrow.svg" />
          </div>
          <p class="back-subtitle">Назад</p>
        </div>

        <h2 class="popup-card__title">Задача: {{plan.title}}</h2>
      </div>

      <div class="popup-card__wrapper">
        <div class="popup-card__info">
          <div class="info-title">
            Описание директорий для пункта "{{data.title}}"
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
        <div class="popup-card__buttons">
          <button class="button button-g">Загрузить</button>
          <div class="popup-card__text">
            Выбрано:
            <p class="popup-card__file">file.shp</p>
          </div>
          <input type="file" name="a" ref="file" @change="onFileUpload">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['plan', 'data'],
  data() {
    return {
      file: null
    }
  },
  methods: {
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  }
}
</script>


<style lang="scss" scoped>
.back {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  cursor: pointer;
  &-arrow {
    width: 40px;
  }
  p {
    margin-left: 10px;
    color: $text-grey;
  }
}
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
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 20px;
    min-width: 900px;

    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__title {
      font-size: 20px;
      font-weight: 400;
      text-align: center;
      color: $text-grey;
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    &__info {
      width: 500px;
      margin-top: 20px;
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
      display: flex;
      margin-top: 6px;
      margin-left: 10px;

      color: $text-grey;
      font-size: 14px;
    }
    &__buttons {
      margin-top: 20px;
      display: flex;
      align-items: center;
    }
    &__file {
      margin-left: 10px;

      color: #000;
      font-size: 14px;
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

            color: $color-main;
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
</style>
