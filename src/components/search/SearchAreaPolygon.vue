<template>
  <search-area-base>
    <div class="c-table">
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
          <tr v-for="(coord, i) in coordinates" :key="i">
            <td class="number">{{ i + 1 }}</td>
            <td>{{ coord.lat }}</td>
            <td>{{ coord.lng }}</td>
            <td class="col delete" @click="$emit('delete', i)">
              <button class="button button-svg button-svg-r">
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
            <td class="c-table__input__td">
              <div class="c-table__input__wrapper">
                <masked-input
                  class="c-table__input"
                  v-model="newCoord.lat"
                  :mask="inputMaskLat"
                  :placeholder="placeholderLat"
                />
              </div>
            </td>
            <td class="c-table__input__td">
              <div class="c-table__input__wrapper">
                <masked-input
                  class="c-table__input"
                  v-model="newCoord.lng"
                  :mask="inputMaskLng"
                  :placeholder="placeholderLng"
                />
              </div>
            </td>
            <td class="col">
              <div class="c-table__delete">
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

    <div class="c-buttons">
      <button
        class="button c-button"
        :class="drawable ? 'button-white-gr' : 'button-g'"
        @click="onDraw"
      >
        {{ drawable ? "Сохранить полигон" : "Использовать карту" }}
      </button>

      <button
        class="button button-white-gr c-button"
        @click="$emit('select-screen-area')"
      >
        Видимая область
      </button>
      <button
        @click="$emit('clear')"
        :disabled="coordinates.length == 0"
        class="button button-r c-button"
      >
        Очистить координаты
      </button>
    </div>
  </search-area-base>
</template>

<script>
import MaskedInput from "vue-masked-input";
import SearchAreaBase from "@/components/search/SearchAreaBase.vue";
export default {
  props: ["coordinates"],
  components: {
    SearchAreaBase,
    MaskedInput,
  },
  data: () => ({
    inputMaskLat: {
      pattern: `111°11'11"`,
      formatCharacters: {
        N: {
          validate: (char) => /[nsNS]/.test(char),
          transform: (char) => char.toUpperCase(),
        },
      },
    },
    placeholderLat: "000°00'00\"",
    drawable: false,
    inputMaskLng: {
      pattern: `111°11'11"`,
      formatCharacters: {
        E: {
          validate: (char) => /[ewEW]/.test(char),
          transform: (char) => char.toUpperCase(),
        },
      },
    },
    placeholderLng: "000°00'00\"",
    newCoord: {
      lat: null,
      lng: null,
    },
  }),
  methods: {
    onDraw() {
      this.$emit('set-drawable', !this.drawable);
      this.drawable = !this.drawable;
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
    onAddCoordinate() {
      let lat = this.parseCoords(this.newCoord.lat);
      let lng = this.parseCoords(this.newCoord.lng);
      this.$emit("add", { lat, lng });
    },
  },
};
</script>

<style lang="scss" scoped>
.c {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;

  box-shadow: $shadow-big;
  border-radius: 10px;
  background: $white;
  label.active {
    top: -20px;
    font-size: 12px;
    color: $color-main;
  }
  .number {
    max-width: 40px;
    text-align: center !important;
  }
  .delete {
    position: relative;
  }
  &-table {
    flex: 1;
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
        }
      }
    }
  }
  &__coordinates {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &-buttons {
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 20px;
  }
  &-button {
    margin: 10px 0;
    width: 230px;
    height: 35px;
  }
}
</style>