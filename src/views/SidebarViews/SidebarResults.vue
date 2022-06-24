<template>
  <div class="results">
    <div class="sidebar-title">
      Результаты поиска: {{ results.length }} найдено
      <router-link to="/main/search" custom v-slot="{ navigate }">
        <div class="results-back" @click="navigate">
          <div class="results-back__arrow">
            <img svg-inline src="@/assets/img/arrows/arrow.svg" alt="Назад" />
          </div>
          <span class="results-back__subtitle">Назад</span>
        </div>
      </router-link>
    </div>
    <div class="results-content">
      <portal to="popup-card">
        <result-info
          :cardData="cardData"
          @cardClose="onCardClose()"
          @PolygonButtonClick="
            onPolygonButtonClick(card.ind, cardData.id, cardData.geography)
          "
          @ImageButtonClick="
            onImageButtonClick(
              card.ind,
              cardData.id,
              cardData.previewPath,
              cardData.geography.bbox
            )
          "
          v-if="card.ind != null"
          v-show="card.active"
        ></result-info>
      </portal>

      <div class="results-wrapper">
        <app-table class="results-table">
          <thead>
            <tr>
              <th></th>
              <th
                v-for="(header, i) in headers"
                :key="i"
                @click="sortBy(header.key, i)"
                class="results-table__header"
              >
                {{ header.title }}
                <template v-if="header.active">
                  <span v-if="sortDir == 'asc'" class="results-table__sort">
                    <img
                      svg-inline
                      src="@/assets/img/sort-icons/sort-asc.svg"
                      alt="сортировка"
                    />
                  </span>
                  <span v-else class="results-table__sort">
                    <img
                      svg-inline
                      src="@/assets/img/sort-icons/sort-desc.svg"
                      alt="сортировка"
                    />
                  </span>
                </template>
              </th>

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
                <div class="button__wrapper results-table__button">
                  <button
                    class="button button-svg results-button"
                    :class="results[i].polygonActive ? 'active' : ''"
                    @click="onPolygonButtonClick(i, item.id, item.geography)"
                  >
                    <img
                      svg-inline
                      src="@/assets/img/button-svg-icons/vector-o.svg"
                      alt="Вектор"
                    />
                  </button>
                  <span class="tooltiptext">Границы</span>
                </div>
                <div class="button__header results-table__button">
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
                      src="@/assets/img/button-svg-icons/image.svg"
                      alt="Изображение"
                    />
                  </button>
                  <span class="tooltiptext">Изображение</span>
                </div>
              </td>
              <td class="dzz-name">{{ item.name }}</td>
              <!-- <td>{{ item.round }}</td>
              <td>{{ item.route }}</td> -->
              <td>{{ item.satelite }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.cloudiness }}%</td>
              <td class="results-table__buttons">
                <div class="button__wrapper results-table__button">
                  <button
                    class="button button-svg results-button"
                    :class="results[i].cardActive ? 'active' : ''"
                    @click="onCardButtonClick(i)"
                  >
                    <img
                      svg-inline
                      src="@/assets/img/button-svg-icons/results-info.svg"
                      alt="Информация по объекту"
                    />
                  </button>
                  <span class="tooltiptext">Подробнее</span>
                </div>
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
import ResultInfo from "@/components/results/ResultInfo.vue";
// import VsPagination from "@vuesimple/vs-pagination";

export default {
  components: {
    AppTable,
    ResultInfo,
    // VsPagination,
  },
  data() {
    return {
      headers: [
        {
          title: "Идентификатор",
          key: "name",
          active: false,
        },
        // {
        //   title: "Виток",
        //   key: "round",
        //   active: false,
        // },
        // {
        //   title: "Маршрут",
        //   key: "route",
        //   active: false,
        // },
        {
          title: "Аппарат",
          key: "name",
          active: false,
        },
        {
          title: "Дата съемки",
          key: "date",
          active: false,
        },
        {
          title: "Облачность",
          key: "cloudiness",
          active: false,
        },
      ],
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
      sortDir: "getSortDir",
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
    ...mapActions("results", [
      "setResultProperty",
      "selectResult",
      "sortResultsBy",
    ]),

    sortBy(key, ind) {
      this.headers.forEach((el, i) => {
        el.active = i == ind;
      });
      this.sortResultsBy(key);
    },

    onPolygonButtonClick(ind, id, json) {
      if (this.results[ind].polygonActive) {
        this.removeGeoJsonPolygon({ id });
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
      console.log(selected);
      if (this.selectable.value) {
        this.selectResult({
          index: i,
          value: this.selectable.value,
          selected: !selected,
          type: this.selectable.type,
        });
      }
    },

    onImageButtonClick(ind, id, img, bounds) {
      if (this.results[ind].imageActive) {
        this.removeImage({ id });
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
.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-arrow {
    svg path {
      fill: $color-main;
    }
  }
  &-subtitle {
    margin: 0 0 0 10px;
    color: $color-main;
  }
}
.dzz-name {
  word-break: break-all;
}
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
      fill: $color-main;
    }
    &:hover {
      svg path {
        fill: $color-main-dark;
      }
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
.results {
  &-back {
    position: absolute;
    top: 50%;
    left: 30px;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    cursor: pointer;
    &__arrow {
      height: 23px;
      svg {
        height: 100%;
      }
      svg path {
        fill: $white;
      }
    }
    &__subtitle {
      margin-left: 10px;
      color: $white;
      font-size: 14px;
    }
  }
  &-wrapper {
    margin: 30px;
  }
  &-circle {
    margin-right: 15px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: $white;
    box-shadow: inset 1px 1px 3px rgba($black, 0.15);
  }
  &-table {
    &__header {
      position: relative;
    }
    &__sort {
      position: absolute;
      left: 0;
      top: 54%;
      transform: translate(-50%, -50%);
      svg path {
        fill: $color-main;
      }
    }
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

    &__buttons {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__button {
      position: relative;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &-button {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    background: $gradient-w;
    &.active {
      background: $color-main;
      svg path {
        fill: $white;
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