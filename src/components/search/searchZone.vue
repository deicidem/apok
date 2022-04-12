<template>
  <div class="search-zone">
    <h2 class="search__title">Зона интереса</h2>

    <div class="search-zone__input">
      <input type="radio" />
      <label>Видимая область экрана</label>
    </div>
    <div class="search-zone__input">
      <input type="radio" />
      <label>Задать вручную</label>
    </div>

    <nav class="search-zone__nav">
      <ul>
        <li>
          <button @click="searchZoneType = 1">Задать полигон</button>
        </li>
        <li class="line"></li>
        <li>
          <button @click="searchZoneType = 2">Вывести координаты</button>
        </li>
        <li class="line"></li>
        <li>
          <button @click="searchZoneType = 3">Загрузить файл</button>
        </li>
      </ul>
    </nav>

    <div class="search-zone__main" v-show="searchZoneType == 1">
      <div class="search-zone__table">
        <table>
          <thead>
            <tr>
              <th class="col"><input type="checkbox" /></th>
              <th>Широта</th>
              <th>Долгота</th>
              <th class="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coord, i) in getFormattedCoordinates" :key="i">
              <td class="col"><input type="checkbox" /></td>
              <td>{{ coord.lat }}</td>
              <td>{{ coord.lng }}</td>
              <td class="col delete" @click="deleteCoordinate(i)">
                <app-button class="col-item__trash" type="white-r">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </app-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="search-zone__buttons">
        <app-button
          class="search-zone__button"
          @click="setPolygonDrawable(true)"
          >Использовать карту</app-button
        >
        <app-button class="search-zone__button" type="white-g"
          >Прописать координаты</app-button
        >
        <app-button
          @click="clearCoordinates()"
          class="search-zone__button"
          type="red"
          >Очистить координаты</app-button
        >
      </div>
    </div>

    <div class="search-zone__coordinates" v-show="searchZoneType == 2">
      <div class="coordinates-wrapper">
        <app-input
          label="Ширина"
          class="coordinates-wrapper__input"
        ></app-input>
        <app-input
          label="Искать с"
          class="coordinates-wrapper__input"
        ></app-input>
        <app-input
          label="Радиус"
          class="coordinates-wrapper__input"
        ></app-input>
      </div>

      <app-button class="coordinates-wrapper__button"
        >Загрузить на карту</app-button
      >
    </div>

    <div class="search-zone__load" v-show="searchZoneType == 3">
      <div class="load-wrapper">
        <app-button type="white-g">Загрузить файл</app-button>
        <span class="load-wrapper__name">POLYGON.shp</span>
      </div>
      <app-button>Показать на карте</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
import AppInput from "@/components/controls/AppInput.vue";
export default {
  components: {
    AppInput,
    AppButton,
  },
  data() {
    return {
      searchZoneType: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-zone {
  padding: 20px;
  box-shadow: $shadow-small;
  border-radius: 10px;
  overflow: hidden;
  background: $gradient-w;
  &__input {
    margin-top: 10px;
    input {
      width: 14px;
      height: 14px;
    }
    label {
      font-weight: 400;
      color: #000;
      font-size: 14px;
      margin-left: 6px;
    }
  }
  &__nav {
    display: flex;
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .line {
      border-left: 1px solid $color-main;
      height: 12px;
    }
    li {
      margin: 4px;
      list-style-type: none;
      button {
        background: none;
        color: #000;
        font-family: inherit;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        &:hover {
          color: $color-main;
        }
        &:active {
          color: $color-main;
        }
      }
    }
  }
  &__main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    box-shadow: $shadow-big;
    border-radius: 10px;
    background: #fff;
  }
  &__table {
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        border-bottom: 1px solid rgba(71, 109, 112, 0.3);
        th {
          text-align: left;
          border: none;
          font-size: 12px;
          color: #000000;
          padding: 6px;
          box-sizing: border-box;
          input {
            width: 20px;
            height: 20px;
            background: #eff2f2;
            border-radius: 50%;
            border: none;
          }
        }
        td {
          max-width: 110px;
          text-align: left;
          border: none;
          font-size: 12px;
          color: $color-main-dark;
          padding: 6px;
          box-sizing: border-box;
          input {
            width: 16px;
            height: 16px;
            background: #eff2f2;
            border-radius: 50%;
            border: none;
          }
        }
        .col {
          max-width: 40px;
          text-align: center;
          &-item {
            &__trash {
              width: 30px;
              height: 30px;
              padding: 0;
              font-size: 1rem;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
  &__coordinates {
    display: flex;
    padding: 10px;
    box-shadow: $shadow-big;
    border-radius: 10px;
    background: #fff;
    flex-direction: column;
    .coordinates-wrapper {
      display: flex;
      margin: 20px 0;
      justify-content: space-between;
      align-items: flex-end;
      &__input {
        margin-right: 20px;
        width: 130px;
      }
      &__button {
        margin-left: auto;
      }
    }
  }
  &__load {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-shadow: $shadow-big;
    border-radius: 10px;
    background: #fff;
    .load-wrapper {
      &__name {
        font-size: 12px;
        color: #000;
        margin-left: 20px;
      }
    }
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    margin: 30px 20px 0 20px;
  }
  &__button {
    margin: 10px;
    height: 40px;
  }
  &__edit__input {
    display: block;
    width: 100px !important;
    margin: 0 !important;
    padding: 0;
    height: 20px !important;
    font-size: 10px;
    border-radius: 0 !important;
  }
}
</style>