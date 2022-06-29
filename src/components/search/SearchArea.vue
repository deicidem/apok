<template>
<search-base title="Зона интереса" :invalid="invalid">
  <template v-slot:error-message>
    Укажите зону интереса
  </template>
  <template v-slot:content>
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
                <td class="col delete" @click="deleteCoordinate({ index: i })">
                  <button class="button button-svg-r">
                    <img
                      svg-inline
                      src="@/assets/img/button-svg-icons/trash.svg"
                      alt="Удалить"
                    />
                  </button>
                  <div class="tooltiptext tooltiptext-r">Удалить</div>
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
                  <div class="zone-table__delete">
                    <button
                      @click="onAddCoordinate"
                      class="button button-svg button-white-gr"
                    >
                      <img
                        svg-inline
                        src="@/assets/img/button-svg-icons/plus.svg"
                        alt="Добавить"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="search-zone__buttons">
          <button
            class="button search-zone__button"
            :class="getAreaPolygonDrawable ? 'button-white-gr' : 'button-g'"
            @click="setAreaPolygonDrawable({ value: !getAreaPolygonDrawable })"
          >
            <span v-if="!getAreaPolygonDrawable"> Использовать карту </span>
            <span v-else> Сохранить полигон </span>
          </button>

          <button
            class="button button-white-gr search-zone__button"
            @click="selectScreenArea"
          >
            Видимая область
          </button>
          <button
            @click="clearCoordinates()"
            :disabled="getActivePolygonJson == null"
            class="button button-r search-zone__button"
          >
            Очистить координаты
          </button>
        </div>
      </div>

      <div>
        

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
            <span class="button button-white-gr load-wrapper__button"
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
  </template>
</search-base>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MaskedInput from "vue-masked-input";
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength, numeric } from "@vuelidate/validators";
import SearchBase from "@/components/search/SearchBase";
// import {IMaskDirective} from 'vue-imask';

export default {
  components: {
    MaskedInput,
    SearchBase,
  },
  setup: () => ({ v$: useVuelidate() }),
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
  validations() {
    return {
      lng: {
        required: helpers.withMessage("Введите значение", required),
        minLength: helpers.withMessage(
          "Логин должен содержать больше 6 символов",
          minLength(6)
        ),
      },
      lat: {
        required: helpers.withMessage("Введите значение", required),
      },
      rad: {
        required: helpers.withMessage("Введите значение", required),
        numeric: helpers.withMessage("Введите числовое значение", numeric),
      },
    };
  },
  computed: {
    ...mapGetters("map", [
      "getAreaPolygon",
      "getCirclePolygon",
      "getAreaPolygonDrawable",
      "getFormattedCoordinates",
      "getActivePolygonJson",
      "getBounds",
      "getZoom",
    ]),
    ...mapGetters("search", ["getSearchStatus"]),
    invalid() {
      return (
        this.getActivePolygonJson == null && this.getSearchStatus == "ERROR"
      );
    },
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
      this.addCoordinate({ coordinate: this.getBounds.getNorthEast() });
      this.addCoordinate({ coordinate: this.getBounds.getNorthWest() });
      this.addCoordinate({ coordinate: this.getBounds.getSouthWest() });
      this.addCoordinate({ coordinate: this.getBounds.getSouthEast() });
      this.setZoom({ value: this.getZoom - 1 });
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
      this.setCenter({ coordinate: [lng, lat] });
    },

    removeCircle() {
      this.setCirclePolygon(null);
    },

    onAddCoordinate() {
      let lat = this.parseCoords(this.newCoord.lat);
      let lng = this.parseCoords(this.newCoord.lng);
      this.addCoordinate({ coordinate: { lat, lng } });
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

    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Form successfully submitted");
      } else {
        return;
      }
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
.zone-table {
  &__input {
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
}
.delete {
  position: relative;
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

    color: $black;
  }
  &__nav {
    display: flex;
    margin-top: 10px;
    ul {
      line-height: 1;
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
      margin: 0 4px;
      list-style-type: none;
      button {
        padding: 0;
        margin: 0;

        font-family: inherit;
        border: none;
        background: none;
        color: $black;
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
    background: $white;
  }
  &__card {
    margin-top: 14px;
    padding: 20px;

    box-shadow: $shadow-big;
    border-radius: 10px;
    background: $white;
  }
  &__table {
    flex: 1;
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
          color: $black;
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
    align-items: flex-start;
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
    color: $black;
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
