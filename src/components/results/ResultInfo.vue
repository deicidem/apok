<template>
  <div class="card">
    <div class="card-close" @click="$emit('cardClose')">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="card-title">Информация по объекту</div>
    <div class="card-img">
      <img :src="cardData.previewPath" alt="Информация" />
    </div>
    <div class="card-table__wrapper">
      <table class="card-table">
        <thead>
          <tr>
            <th>Характеристика</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Идентификатор</td>
            <td class="dzz-name">{{ cardData.name }}</td>
          </tr>
          <tr>
            <td>Виток</td>
            <td>{{ cardData.round }}</td>
          </tr>
          <tr>
            <td>Маршрут</td>
            <td>{{ cardData.route }}</td>
          </tr>
          <tr>
            <td>Аппарат</td>
            <td>{{ cardData.satelite }}</td>
          </tr>
          <tr>
            <td>Дата съемки</td>
            <td>{{ cardData.date }}</td>
          </tr>
          <tr>
            <td>Облачность</td>
            <td>{{ cardData.cloudiness }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-buttons">
      <app-button
        type="button-g "
        class="card-button"
        @click="$emit('PolygonButtonClick')"
      >
        Скрыть контур
      </app-button>

      <app-button
        type="button-white-gr "
        class="card-button"
        @click="$emit('ImageButtonClick')"
      >
        Показать изображение
      </app-button>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    AppButton,
  },
  props: ["cardData"],
};
</script>

<style scoped lang="scss">
.card {
  z-index: 11;
  position: absolute;
  width: 300px;
  background: $black;
  top: 20px;
  right: 20px;
  background: $gradient-w;
  box-shadow: $shadow-big;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;

  &-close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: $color-main;

    &:hover {
      color: $color-main-dark;
    }
  }

  &-title {
    font-size: 16px;
    color: $black;
    margin-bottom: 15px;
  }

  &-img {
    width: 200px;
    margin-bottom: 20px;
    border: 1px solid $black;
  }

  &-table {
    &__wrapper {
      flex: 1;
    }
    color: $black;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    th {
      color: $color-main;
      text-align: left;
      font-size: 12px;
    }

    td {
      vertical-align: top;
      padding: 10px 10px 10px 0;
      font-size: 12px;
    }

    tr {
      border-bottom: 1px solid rgba($color-main, 0.2);
    }
  }

  &-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &-button {
    margin-top: 15px;
    min-width: 230px;
  }
}
</style>
