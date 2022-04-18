<template>
  <div class="search-zone">
    <h2 class="search__title">Зона интереса</h2>

    <label class="search-zone__input">
      <app-radio value="screen" v-model="areaType"></app-radio>
      <span class="text">Видимая область экрана</span>
    </label>
    <label class="search-zone__input">
      <app-radio value="manual" v-model="areaType"></app-radio>
      <span class="text">Задать вручную</span>
    </label>
    <template v-if="areaType == 'screen'">
      <div class="search-zone__screen__buttons">
        <app-button
          class="search-zone__screen__button"
          @click="
            setScreenPolygon([
              [0, 0],
              [0, 0],
            ])
          "
          type="red"
          >Убрать с карты</app-button
        >
        <app-button
          class="search-zone__screen__button"
          @click="
            setScreenPolygon(getBounds);
            setZoom(getZoom - 1);
          "
          >Показать на карте</app-button
        >
      </div>
    </template>
    <template v-else>
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
                <td class="zone-table__input__td">
                  <div class="zone-table__input__wrapper">
                    <masked-input
                      class="zone-table__input"
                      v-model="newCoord.lat"
                      :mask="inputMaskLat"
                      :placeholder="placeholderLat"
                    />
                  </div>
                </td>
                <td class="zone-table__input__td">
                  <div class="zone-table__input__wrapper">
                    <masked-input
                      class="zone-table__input"
                      v-model="newCoord.lng"
                      :mask="inputMaskLng"
                      :placeholder="placeholderLng"
                    />
                  </div>
                </td>
                <td>
                  <app-button
                    @click="onAddCoordinate"
                    class="col-item__plus"
                    type="white-g"
                  >
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
            :mask="inputMaskLat"
            :placeholder="placeholderLat"
          ></app-input>
          <app-input
            v-model="lng"
            label="Долгота"
            class="coordinates-wrapper__input"
            :mask="inputMaskLng"
            :placeholder="placeholderLng"
          ></app-input>
          <app-input
            v-model="rad"
            label="Радиус (км)"
            class="coordinates-wrapper__input"
          ></app-input>

          <app-button @click="createCircle" class="coordinates-wrapper__button"
            >Загрузить на карту</app-button
          >
        </div>
        <app-button class="coordinates-wrapper__button" type="red"
          >Убрать с карты</app-button
        >
      </div>

      <div
        class="search-zone__card search-zone__load"
        v-show="searchZoneType == 3"
      >
        <div class="load-wrapper">
          <app-button type="white-g">Загрузить файл</app-button>
          <span class="load-wrapper__name">POLYGON.shp</span>
        </div>
        <div class="load-wrapper__buttons">
          <app-button class="load-wrapper__button"
            >Показать на карте</app-button
          >
          <app-button class="load-wrapper__button" type="red"
            >Удалить</app-button
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppButton from "@/components/controls/AppButton.vue";
import AppRadio from "@/components/controls/AppRadio.vue";
import AppInput from "@/components/controls/AppInput.vue";
import MaskedInput from "vue-masked-input";
export default {
  components: {
    AppInput,
    MaskedInput,
    AppButton,
    AppRadio,
  },
  data() {
    return {
      areaType: "screen",
      inputMaskLat: {
        pattern: `111°11'11" N`,
        formatCharacters: {
          N: {
            validate: (char) => /[nsNS]/.test(char),
            transform: (char) => char.toUpperCase(),
          },
        },
      },
      placeholderLat: "000°00'00\" N",
      inputMaskLng: {
        pattern: `111°11'11" E`,
        formatCharacters: {
          E: {
            validate: (char) => /[ewEW]/.test(char),
            transform: (char) => char.toUpperCase(),
          },
        },
      },
      placeholderLng: "000°00'00\" W",
      lng: "",
      lat: "",
      rad: "",
      searchZoneType: 1,
      newCoord: {
        lat: "",
        lng: "",
      },
    };
  },
  computed: {
    ...mapGetters("map", [
      "getPolygonArea",
      "getDrawable",
      "getFormattedCoordinates",

      "getBounds",
      "getZoom",
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
      "setCenter",
      "setZoom",
      "setScreenPolygon",
    ]),
    showScreenPolygon() {
      this.setScreenPolygon([
        [this.getBounds._northEast.lat, this.getBounds._northEast.lng],
        [this.getBounds._southWest.lat, this.getBounds._southWest.lng],
      ]);
      this.setZoom(this.getZoom - 1);
    },
    createCircle() {
      let lat = this.parseCoords(this.lat);
      let lng = this.parseCoords(this.lng);
      let radius = +this.rad * 1000;
      this.setCirclePolygon({ radius, center: { lng, lat } });
      this.setCenter([lng, lat]);
    },
    onAddCoordinate() {
      let lat = this.parseCoords(this.newCoord.lat);
      let lng = this.parseCoords(this.newCoord.lng);
      this.addCoordinate({ lat, lng });
    },
    parseCoords(coord) {
      let str = coord;
      let deg = "";
      let degEnd = false;
      let min = "";
      let minEnd = false;
      let sec = "";
      let secEnd = false;
      let dir = "";
      for (let i = 0; i < str.length; i++) {
        if (!degEnd) {
          if (str[i] == "°") {
            degEnd = true;
            continue;
          }
          deg += str[i];
        } else if (!minEnd) {
          if (str[i] == "'") {
            minEnd = true;
            continue;
          }
          min += str[i];
        } else if (!secEnd) {
          if (str[i] == '"') {
            secEnd = true;
            continue;
          }
          sec += str[i];
        }
      }
      dir = str[str.length - 1];

      sec = +sec / 3600;
      min = +min / 60;
      if (dir == "N" || dir == "E") {
        deg = +deg + min + sec;
      } else {
        deg = -(+deg + min + sec);
      }
      return deg;
    },
  },
};
</script>

<style lang="scss" scoped>
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

  &__screen__button {
    margin-right: 20px;
  }
  &__screen__buttons {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  &__input {
    display: flex;
    align-items: center;
    color: $text-grey;
    padding-top: 10px;
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
      display: block;
      width: 120px;
      font-family: inherit;
      flex: 1;
      border: none;
      margin: 0;
      line-height: 1.5;
      padding: 6px;
      &__td {
        padding: 0;
      }
      &__wrapper {
        height: 100%;
        display: flex;
      }
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
        }
        td {
          text-align: left;
          border: none;
          font-size: 12px;
          color: $color-main-dark;
          padding: 6px;
          box-sizing: border-box;
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
        width: 120px;
      }
      &__button {
        margin-top: 20px;
        margin-left: auto;
        max-width: 200px;
        width: 190px;
      }
    }
  }
  &__load {
    display: flex;
    align-items: flex-start;
    .load-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      &__buttons {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      &__button {
        margin-bottom: 10px;
        width: 180px;
      }
      &__name {
        margin-left: 20px;
        font-size: 12px;
        color: #000;
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
    height: 35px;
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
