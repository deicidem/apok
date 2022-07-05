<template>
  <search-base title="Зона интереса" :invalid="invalid">
    <template v-slot:error-message> Укажите зону интереса </template>
    <template v-slot:content>
      <nav class="c-nav">
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

      <search-area-polygon
        v-show="searchZoneType == 1"
        :coordinates="getFormattedCoordinates"
        @set-drawable="setAreaPolygonDrawable({ value: $event })"
        @select-screen-area="selectScreenArea"
        @clear="clearCoordinates"
        @add="onAddCoordinate($event)"
        @delete="deleteCoordinate({ index: $event })"
      ></search-area-polygon>

      <search-area-circle
        v-show="searchZoneType == 2"
        @submit="createCircle($event)"
        @remove="removeCircle()"
      ></search-area-circle>

      <search-area-file
        @submit="setFilePolygon({ file: $event })"
        @remove="removeFilePolygon"
        v-show="searchZoneType == 3"
      >
      </search-area-file>
    </template>
  </search-base>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import SearchBase from "@/components/search/SearchBase";
import SearchAreaCircle from "@/components/search/SearchAreaCircle";
import SearchAreaFile from "@/components/search/SearchAreaFile";
import SearchAreaPolygon from "@/components/search/SearchAreaPolygon";

export default {
  components: {
    SearchBase,
    SearchAreaCircle,
    SearchAreaFile,
    SearchAreaPolygon,
  },
  data() {
    return {
      areaType: null,
      submitStatus: null,
      searchZoneType: 1,
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
      "removeFilePolygon",
    ]),
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
    selectScreenArea() {
      this.clearCoordinates();
      this.addCoordinate({ coordinate: this.getBounds.getNorthEast() });
      this.addCoordinate({ coordinate: this.getBounds.getNorthWest() });
      this.addCoordinate({ coordinate: this.getBounds.getSouthWest() });
      this.addCoordinate({ coordinate: this.getBounds.getSouthEast() });
      this.setZoom({ value: this.getZoom - 1 });
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

    createCircle({ lng, lat, rad }) {
      let parsedLat = this.parseCoords(lat);
      let parsedLng = this.parseCoords(lng);
      let parsedRadius = +rad * 1000;
      this.setCirclePolygon({
        radius: parsedRadius,
        center: { lng: parsedLng, lat: parsedLat },
      });
      this.setCenter({ coordinate: [parsedLat, parsedLng] });
    },

    removeCircle() {
      this.setCirclePolygon(null);
    },

    onAddCoordinate({ lat, lng }) {
      this.addCoordinate({ coordinate: { lat, lng } });
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

.delete {
  position: relative;
}

.c {
  &-nav {
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
