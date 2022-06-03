<template>
  <div class="search-zone">
    <h2 class="search-title">Зона интереса</h2>
    <nav class="search-zone__nav">
      <ul>
        <li>
          <button
            @click="changeZoneType(1)"
            :class="searchZoneType == 1 ? 'active' : ''"
          >
            Задать полигон
          </button>
        </li>
        <li class="line"></li>
        <li>
          <button
            @click="changeZoneType(2)"
            :class="searchZoneType == 2 ? 'active' : ''"
          >
            Круглая зона
          </button>
        </li>
        <li class="line"></li>
        <li>
          <button
            @click="changeZoneType(3)"
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
              <th class="number">№</th>
              <th>Широта</th>
              <th>Долгота</th>
              <th class="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coord, i) in getFormattedCoordinates" :key="i">
              <td class="number">{{ i + 1 }}</td>
              <td>{{ coord.lat }}</td>
              <td>{{ coord.lng }}</td>
              <td class="col delete" @click="deleteCoordinate(i)">
                <button class="button button-svg">
                  <img inline-svg src="@/assets/img/trash.svg" />
                </button>
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
              <td class="col">
                <button
                  @click="onAddCoordinate"
                  class="button button-svg"
                  type="white-g"
                >
                  <img inline-svg src="@/assets/img/plus.svg" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="search-zone__buttons">
        <button
          class="button search-zone__button"
          :class="getAreaPolygonDrawable ? 'button-white' : 'button-g'"
          @click="setAreaPolygonDrawable(!getAreaPolygonDrawable)"
        >
          <span v-if="!getAreaPolygonDrawable"> Использовать карту </span>
          <span v-else> Сохранить полигон </span>
        </button>

        <button
          class="button button-white search-zone__button"
          @click="selectScreenArea"
        >
          Видимая область
        </button>
        <button
          @click="clearCoordinates()"
          class="button button-r search-zone__button"
        >
          Очистить координаты
        </button>
      </div>
    </div>

    <div>
      <div
        class="search-zone__card search-zone__coordinates"
        v-show="searchZoneType == 2"
      >
        <div class="coordinates-wrapper">
          <div class="input-wrapper coordinates-inputs">
            <masked-input
              required
              placeholder=" "
              v-model="lat"
              class="input coordinates-input"
              :mask="inputMaskLat"
            />
            <label class="input-label coordinates-label"> Широта </label>
          </div>

          <div class="input-wrapper coordinates-inputs">
            <masked-input
              required
              placeholder=" "
              v-model="lng"
              class="input coordinates-input"
              :mask="inputMaskLng"
            />
            <label class="input-label coordinates-label"> Долгота </label>
          </div>
          <div class="input-wrapper coordinates-inputs">
            <input
              required
              placeholder=" "
              v-model="rad"
              id="radius"
              class="input coordinates-input"
            />
            <label class="input-label coordinates-label"> Радиус (км) </label>
          </div>

          <button
            @click="createCircle"
            class="button button-g coordinates-wrapper__button"
          >
            Загрузить на карту
          </button>
        </div>
        <button
          class="button button-r coordinates-wrapper__button"
          @click="removeCircle"
        >
          Убрать с карты
        </button>
      </div>

      <div
        class="search-zone__card search-zone__load"
        v-show="searchZoneType == 3"
      >
        <label class="load-wrapper">
          <input
            @change="onFileUpload"
            class="load-wrapper__input"
            ref="file"
            type="file"
            name="file"
          />
          <span class="button button-white load-wrapper__button"
            >Загрузить файл</span
          >
          <span class="load-wrapper__name">{{
            file == null ? "не выбран" : file.name
          }}</span>
        </label>
        <div class="load-wrapper__buttons">
          <button
            class="button button-g load-wrapper__button"
            @click="sendFile()"
          >
            Показать на карте
          </button>
          <button class="button button-r load-wrapper__button" type="red">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MaskedInput from "vue-masked-input";
export default {
  components: {
    MaskedInput,
  },
  data() {
    return {
      file: null,
      areaType: null,
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
      "getAreaPolygon",
      "getCirclePolygon",
      "getAreaPolygonDrawable",
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
      "setAreaPolygonDrawable",
      "setAreaPolygonActive",
      "setCirclePolygonActive",
      "clearCoordinates",
      "setCirclePolygon",
      "setCenter",
      "setZoom",
      "setFilePolygon",
      "setFilePolygonActive",
    ]),
    selectScreenArea() {
      this.clearCoordinates();
      this.addCoordinate(this.getBounds.getNorthEast());
      this.addCoordinate(this.getBounds.getNorthWest());
      this.addCoordinate(this.getBounds.getSouthWest());
      this.addCoordinate(this.getBounds.getSouthEast());
      this.setZoom(this.getZoom - 1);
    },
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    sendFile() {
      this.setFilePolygon(this.file);
    },
    changeZoneType(type) {
      this.searchZoneType = type;
      if (this.searchZoneType == 1) {
        this.setAreaPolygonActive();
      } else if (this.searchZoneType == 2) {
        this.setCirclePolygonActive();
      } else {
        this.setFilePolygonActive();
      }
    },
    createCircle() {
      let lat = this.parseCoords(this.lat);
      let lng = this.parseCoords(this.lng);
      let radius = +this.rad * 1000;
      this.setCirclePolygon({ radius, center: { lng, lat } });
      this.setCenter([lng, lat]);
    },
    removeCircle() {
      this.setCirclePolygon(null);
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
label.active {
  top: -20px;
  font-size: 12px;
  color: $color-main;
}
.number {
  max-width: 40px;
  text-align: center !important;
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
    margin-bottom: 10px;

    color: #000;
  }
  &__nav {
    display: flex;
    margin-top: 10px;
    ul {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;

      list-style: none;
    }
    .line {
      height: 12px;

      border-left: 1px solid $color-main;
    }
    li {
      margin: 4px;
      list-style-type: none;
      button {
        padding: 0;
        margin: 0;

        font-family: inherit;
        border: none;
        background: none;
        color: #000;
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
      flex: 1;
      width: 120px;
      margin: 0;
      padding: 6px;

      font-family: inherit;
      border: none;
      line-height: 1.5;
      &__td {
        padding: 0;
      }
      &__wrapper {
        display: flex;
        height: 100%;
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
          padding: 0 6px 6px;

          text-align: left;
          font-size: 12px;

          border: none;
          color: #000000;
          box-sizing: border-box;
        }
        td {
          padding: 6px;

          text-align: left;
          font-size: 12px;

          border: none;
          color: $color-main;
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
  }
  &__load {
    display: flex;
    align-items: flex-start;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 20px;
  }
  &__button {
    margin: 10px 0;
    width: 230px;
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
.coordinates {
  &-inputs {
    margin-left: 16px;
    &:first-child {
      margin-left: 0;
    }
    &:focus-within .coordinates-label {
      top: -20px;
      font-size: 12px;
    }
  }
  &-label {
    top: 8px;
    left: -10px;
  }
  &-input {
    width: 120px;
    &:focus .coordinates-label,
    &:not(:placeholder-shown) ~ label {
      top: -20px;
      font-size: 12px;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &__button {
      margin-top: 20px;
      margin-left: auto;
      max-width: 200px;
      width: 190px;
    }
  }
}
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
    font-size: 14px;
    color: #000;
  }
  &__input {
    display: none;
  }
}
@media screen and (max-width: 1440px) {
  .search-zone {
    padding: 14px;
    &__input {
      span {
        font-size: 0.875rem;
      }
    }
  }
  .search-zone__card {
    padding: 10px;
  }
  .coordinates-wrapper__input {
    width: 94px;
    margin-right: 10px;
    padding: 7px 10px;
  }
  .coordinates-wrapper__button {
    margin-top: 10px;
  }
}
</style>
