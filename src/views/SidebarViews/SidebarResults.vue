<template>
  <div class="results">
    <h2 class="sidebar-title">
      Результаты поиска: {{ results.length }} найдено
    </h2>
    <div class="results-content">
      <router-link to="/main/search">
        <div class="back">
          <div class="back-arrow">
            <img src="@/assets/img/arrow.svg" />
          </div>
          <p class="back-subtitle">Назад</p>
        </div>
      </router-link>
      <portal to="popup-card">
        <div class="card" v-if="card.ind != null" v-show="card.active">
          <div class="card-close" @click="onCardClose()">
            <img svg-inline src="@/assets/img/cross.svg" alt="" />
          </div>
          <div class="card-title">Информация по объекту</div>
          <div class="card-img">
            <img :src="cardData.previewPath" alt="" />
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
                  <td>{{ cardData.name }}</td>
                </tr>
                <tr>
                  <td>Виток</td>
                  <td>{{ cardData.round }}</td>
                </tr>
                <tr>
                  <td>Маршрут</td>
                  <td>{{ cardData.route }}</td>
                </tr>
                <!-- <tr>
                  <td>Аппарат</td>
                  <td>{{ cardData.scName }}</td>
                </tr> -->
                <tr>
                  <td>Дата съемки</td>
                  <td>{{ cardData.date }}</td>
                </tr>
                <tr>
                  <td>Облачность</td>
                  <td>{{ cardData.cloudiness }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-buttons">
            <button
              class="button button-g card-button"
              @click="
                onPolygonButtonClick(card.ind, cardData.id, cardData.geography)
              "
            >
              Скрыть контур
            </button>
            <button
              class="button button-white card-button"
              type="white"
              @click="
                onImageButtonClick(
                  card.ind,
                  cardData.id,
                  cardData.previewPath,
                  cardData.geography.bbox
                )
              "
            >
              Показать изображение
            </button>
          </div>
        </div>
      </portal>

      <div class="results-wrapper">
        <app-table class="results-table">
          <thead>
            <tr>
              <th></th>
              <th>Идентификатор</th>
              <th>Виток</th>
              <th>Маршрут</th>
              <th>Аппарат</th>
              <th>Дата съемки</th>
              <th>Облачность</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-if="loaded" :class="{ selectable: selectable.value }">
            <tr
              v-for="(item, i) in results"
              :key="i"
              :class="
                item.selected.value ? `selected-${item.selected.type + 1}` : ''
              "
              @click="select(i, item.selected.value)"
            >
              <td class="results-table__buttons">
                <div class="results-circle"></div>
                <button
                  class="button button-svg results-button"
                  :class="results[i].polygonActive ? 'active' : ''"
                  @click="onPolygonButtonClick(i, item.id, item.geography)"
                >
                  <img
                    svg-inline
                    class="icon icon-vector-o"
                    src="@/assets/img/vector-o.svg"
                    alt=""
                  />
                </button>
                <button
                  class="button button-svg results-button"
                  :class="results[i].imageActive ? 'active' : ''"
                  @click="
                    onImageButtonClick(
                      i,
                      item.id,
                      item.previewPath,
                      item.geography == null ? null : item.geography.bbox
                    )
                  "
                >
                  <img
                    svg-inline
                    class="icon icon-img"
                    src="@/assets/img/img.svg"
                    alt=""
                  />
                </button>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.round }}</td>
              <td>{{ item.route }}</td>
              <td>Аппарат</td>
              <td>{{ item.date }}</td>
              <td>{{ item.cloudiness }}</td>
              <td class="results-table__buttons">
                <button
                  class="button button-svg results-button"
                  :class="results[i].cardActive ? 'active' : ''"
                  @click="onCardButtonClick(i)"
                >
                  <img
                    svg-inline
                    class="icon icon-open"
                    src="@/assets/img/open.svg"
                    alt=""
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </app-table>
      </div>
    </div>
    <!-- <vs-pagination :total-pages="5"></vs-pagination> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppTable from "@/components/table/AppTable";
// import VsPagination from "@vuesimple/vs-pagination";
export default {
  components: {
    AppTable,
    // VsPagination,
  },
  data() {
    return {
      loaded: false,
      buttons: [],
      card: {
        active: false,
        ind: null,
      },
    };
  },
  computed: {
    ...mapGetters("results", {
      results: "getResults",
      selectable: "getSelectable",
    }),
    cardData() {
      if (this.card.ind != null) {
        return this.results[this.card.ind];
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions("map", [
      "addGeoJsonPolygon",
      "removeGeoJsonPolygon",
      "addImage",
      "removeImage",
    ]),
    ...mapActions("results", ["setResultProperty", "selectResult"]),
    onPolygonButtonClick(ind, id, json) {
      if (this.results[ind].polygonActive) {
        this.removeGeoJsonPolygon(id);
        this.setResultProperty({
          index: ind,
          property: "polygonActive",
          value: false,
        });
      } else {
        this.addGeoJsonPolygon({ id, json });
        this.setResultProperty({
          index: ind,
          property: "polygonActive",
          value: true,
        });
      }
    },
    select(i, selected) {
      if (this.selectable.value) {
        console.log(i);
        this.selectResult({
          index: i,
          value: !selected,
          type: this.selectable.type,
        });
      }
    },
    onImageButtonClick(ind, id, img, bounds) {
      if (this.results[ind].imageActive) {
        this.removeImage(id);
        this.setResultProperty({
          index: ind,
          property: "imageActive",
          value: false,
        });
      } else {
        this.addImage({ id, img, bounds });
        this.setResultProperty({
          index: ind,
          property: "imageActive",
          value: true,
        });
      }
    },
    onCardButtonClick(ind) {
      if (this.results[ind].cardActive) {
        this.card.active = false;
        this.setResultProperty({
          index: ind,
          property: "cardActive",
          value: false,
        });
      } else {
        this.card.ind = ind;
        for (let i = 0; i < this.results.length; i++) {
          this.setResultProperty({
            index: i,
            property: "cardActive",
            value: false,
          });
        }
        this.setResultProperty({
          index: ind,
          property: "cardActive",
          value: true,
        });
        this.card.active = true;
        this.card.data = { ...this.results[ind] };
      }
    },
    onCardClose() {
      for (let i = 0; i < this.results.length; i++) {
        this.setResultProperty({
          index: i,
          property: "cardActive",
          value: false,
        });
      }
      this.card.active = false;
    },
  },
  created() {
    this.loaded = true;
  },
};
</script>

<style lang="scss">
.card {
  z-index: 11;
  position: absolute;
  width: 300px;
  background: #000;
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
    right: 5px;
    top: 5px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg path {
      transition: all 0.1s ease-out;
    }
    &:hover {
      svg path {
        fill: #000;
      }
    }
  }
  &-title {
    font-size: 16px;
    color: #000;
    margin-bottom: 15px;
  }
  &-img {
    width: 200px;
    margin-bottom: 20px;
    border: 1px solid #000;
  }
  &-table {
    &__wrapper {
      flex: 1;
    }
    color: #000;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    th {
      color: $color-main-dark;
      text-align: left;
      font-size: 12px;
    }
    td {
      word-break: break-all;
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
.results {
  &-content {
    padding: 10px 30px;
  }
  &-circle {
    margin-right: 10px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: inset 1px 1px 3px rgba(#000, 0.15);
  }
  .back {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    &-arrow {
      width: 30px;
    }
    p {
      margin-left: 10px;
      color: $color-main-dark;
    }
  }
  &-wrapper {
    background: #ffffff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
  }
  &-table {
    .selectable {
      tr {
        position: relative;
        &::after {
          content: "";
          opacity: 0;
          position: absolute;
          border: 2px solid $color-main;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
        }
        &:hover:after {
          opacity: 1;
        }
        &:last-child:after {
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }
    }
    .selected {
      &-1 {
        .results-circle {
          background: $gradient-b;
          box-shadow: $shadow-small;
        }
      }
      &-2 {
        .results-circle {
          background: $gradient-p;
          box-shadow: $shadow-small;
        }
      }
    }
    tbody {
      background: none;
    }
    td,
    th {
      word-break: break-all;
    }

    * {
      font-size: 10px !important;
    }
    &__buttons {
      padding: 10px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &-button {
    margin: 0 5px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      background: $gradient;
      svg * {
        stroke: #fff;
      }
      .icon-open {
        path {
          fill: #fff;
          stroke: none;
        }
      }
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .icon {
    width: 15px;
    height: 15px;
    &-vector-o {
      width: 20px;
      height: 20px;
    }
  }
}
</style>