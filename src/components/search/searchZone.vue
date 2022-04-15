<template>
  <div class="search-zone">
    <h2 class="search__title">Зона интереса</h2>

    <div class="search-zone__input">
      <label class="label">
        <input type="radio" class="radio" name="radio-button"/>
        <span class="text">Видимая область экрана</span>
      </label>
    </div>
    <div class="search-zone__input">
      <label class="label">
        <input type="radio" class="radio" name="radio-button"/>
        <span class="text">Задать вручную</span>
      </label>
    </div>

    <nav class="search-zone__nav">
      <ul>
        <li>
          <button
            @click="searchZoneType = 1"
            :class="searchZoneType == 1 ? 'active' : ''"
          >
            Задать полигон
          </button>
        </li>
        <li class="line"></li>
        <li>
          <button
            @click="searchZoneType = 2"
            :class="searchZoneType == 2 ? 'active' : ''"
          >
            Круглая зона
          </button>
        </li>
        <li class="line"></li>
        <li>
          <button
            @click="searchZoneType = 3"
            :class="searchZoneType == 3 ? 'active' : ''"
          >
            Загрузить файл
          </button>
        </li>
      </ul>
    </nav>

    <div
      class="search-zone__card search-zone__main"
      v-show="searchZoneType == 1"
    >
      <div class="search-zone__table">
        <table>
          <thead>
            <tr>
              <!-- <th class="col"><input type="checkbox" /></th> -->
              <th class="number">№</th>
              <th>Широта</th>
              <th>Долгота</th>
              <th class="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coord, i) in getFormattedCoordinates" :key="i">
              <!-- <td class="col"><input type="checkbox" /></td> -->
              <td class="number">{{ i + 1 }}</td>
              <td>{{ coord.lat }}</td>
              <td>{{ coord.lng }}</td>
              <td class="col delete" @click="deleteCoordinate(i)">
                <app-button class="col-item__trash" type="white-r">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </app-button>
              </td>
            </tr>
            <tr>
              <td class="number"></td>
              <td>
                <app-input class="zone-table__input"></app-input>
              </td>
              <td>
                <app-input class="zone-table__input"></app-input>
              </td>
              <td>
                <app-button class="col-item__plus" type="white-g">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </app-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="search-zone__buttons">
        <app-button
          v-if="!getDrawable"
          class="search-zone__button"
          @click="setPolygonDrawable(true)"
          >Использовать карту</app-button
        >
        <app-button
          v-else
          class="search-zone__button"
          type="white"
          @click="setPolygonDrawable(false)"
          >Сохранить полигон</app-button
        >
        <app-button class="search-zone__button" type="white"
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

    <div
      class="search-zone__card search-zone__coordinates"
      v-show="searchZoneType == 2"
    >
      <div class="coordinates-wrapper">
        <app-input
          v-model="lat"
          label="Широта"
          class="coordinates-wrapper__input"
        ></app-input>
        <app-input
          v-model="lng"
          label="Долгота"
          class="coordinates-wrapper__input"
        ></app-input>
        <app-input
          v-model="rad"
          label="Радиус (км)"
          class="coordinates-wrapper__input"
        ></app-input>
      </div>

      <app-button @click="createCircle" class="coordinates-wrapper__button"
        >Загрузить на карту</app-button
      >
    </div>

    <div
      class="search-zone__card search-zone__load"
      v-show="searchZoneType == 3"
    >
      <div class="load-wrapper">
        <app-button type="white-g">Загрузить файл</app-button>
        <span class="load-wrapper__name">POLYGON.shp</span>
        <app-button>Показать на карте</app-button>
      </div>
      <app-button type="red">Удалить</app-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppButton from "@/components/controls/AppButton.vue";
import AppInput from "@/components/controls/AppInput.vue";
const circleToPolygon = require("circle-to-polygon");
export default {
  components: {
    AppInput,
    AppButton,
  },
  data() {
    return {
      lng: "",
      lat: "",
      rad: "",
      searchZoneType: 1,
    };
  },
  computed: {
    ...mapGetters("map", [
      "getPolygonArea",
      "getDrawable",
      "getFormattedCoordinates",
    ]),
  },
  methods: {
    ...mapActions("map", [
      "addCoordinate",
      "changeCoordinate",
      "deleteCoordinate",
      "setPolygonDrawable",
      "clearCoordinates",
      "setCirclePolygon",
    ]),
    createCircle() {
      let polygon = circleToPolygon([+this.lng, +this.lat], +this.rad * 1000);
      this.setCirclePolygon(polygon);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  display: none;
}
.text {
  position: relative;
  padding-left: 30px;
  display: inline-block;
  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: $gradient-w;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
  }
  &::after {
    content: "";
    position: absolute;
    top:0;
    left: 0;
    display: block;
    width: 20px;
    height: 20px;
    outline: 6px solid $color-main;
    outline-offset: -6px;
    opacity: 0;
    border-radius: 50%;
  }
}
.radio:checked + .text::after {
  opacity: 1;
}
.number {
  max-width: 40px;
  text-align: center !important;
}
.search__title {
  font-size: 20px;
  color: #000;
  font-weight: 400;
}
.search-zone {
  padding: 20px;
  box-shadow: $shadow-small;
  border-radius: 10px;
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
    margin-top: 10px;
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
        &.active {
          color: $color-main;
        }
      }
    }
  }
  &__main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px;
    box-shadow: $shadow-big;
    border-radius: 10px;
    background: #fff;
  }
  &__card {
    margin-top: 14px;
    padding: 20px;
    box-shadow: $shadow-big;
    border-radius: 10px;
    background: #fff;
  }
  &__table {
    flex: 1;
    .zone-table__input {
      max-width: 120px;
    }
    .input-label {
      font-size: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      thead {
        border-bottom: 1px solid rgba(71, 109, 112, 0.3);
      }
      tr {
        border-bottom: 1px solid rgba(71, 109, 112, 0.3);
        &:last-child {
          border-bottom: none;
        }
        th {
          width: 130px;
          text-align: left;
          border: none;
          font-size: 12px;
          color: #000000;
          padding: 0 6px 6px;
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
            &__plus {
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
    flex-direction: column;
    .coordinates-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      &__input {
        margin-right: 20px;
        width: 150px;
      }
      &__button {
        margin-top: 20px;
        margin-left: auto;
      }
    }
  }
  &__load {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .load-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
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
    margin: 30px 0 0 20px;
  }
  &__button {
    margin: 10px 0;
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