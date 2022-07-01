<template>
  <div class="plan-popup">
    <div class="popup-card">
      <div class="popup-card__header">
        <div class="back popup-card-back" @click="$emit('close', file)">
          <div class="back-arrow">
            <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
          </div>
          <p class="back-subtitle">Назад</p>
        </div>

        <h2 class="popup-card__title">Задача: {{ plan.title }}</h2>
      </div>

      <div class="popup-card__wrapper">
        <div class="popup-card__info">
          <div class="info-title">
            Описание директорий для пункта "{{ data.title }}"
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
          <button class="button button-g">
            Загрузить
            <input type="file" name="a" ref="file" @change="onFileUpload" />
          </button>
          <div class="popup-card__text">
            <p v-if="file != null" class="popup-card__file">{{ file.name }}</p>
            <p v-else>Не выбрано</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["plan", "data"],
  data() {
    return {
      file: null,
    };
  },
  methods: {
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>


<style lang="scss" scoped>
.plan-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background: rgba($black, 0.5);
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
    input[type="file"] {
      position: absolute;
      left: 0;
      opacity: 0;
      top: 0;
      bottom: 0;
      width: 100%;
    }
    &-back {
      position: absolute;
      left: 0;
    }

    &__header {
      position: relative;
      display: flex;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
      text-align: center;
      color: $text-grey;
      max-width: 700px;
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
      margin: 20px 0 0 0;
      padding: 20px;

      box-shadow: $shadow-small;
      border-radius: 10px;
      overflow: hidden;
      background: $white;
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
      margin: 0 0 0 10px;

      color: $black;
      font-size: 14px;
    }

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
          margin: 0 10px 0 0;
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
          margin: 0;
          color: $text-grey;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
