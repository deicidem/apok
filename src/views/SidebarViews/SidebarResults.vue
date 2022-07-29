<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Результаты поиска: {{ results.length }} найдено</h2>
      <router-link to="/main/search" custom v-slot="{ navigate }">
        <div class="back results-back" @click="navigate">
          <div class="back-arrow-w">
            <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
          </div>

          <span class="back-subtitle-w">Назад</span>
        </div>
      </router-link>
    </template>

    <template v-slot:content>
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
          <app-search
            @sort="sortBy($event)"
            :sortOptions="getSortOptions"
          ></app-search>

          <results-table
            :results="results"
            :pending="isPending"
            :selectable="selectable"
            @select="selectResult"
            @show-polygon="
              onPolygonButtonClick($event.index, $event.id, $event.geography)
            "
            @show-image="
              onImageButtonClick(
                $event.index,
                $event.id,
                $event.preview,
                $event.geography
              )
            "
            @show-card="onCardButtonClick($event)"
          ></results-table>

          <app-pagination
            :page-count="getPagination.last"
            @changePage="fetchResults($event)"
            :current-page="getPagination.currentPage"
          ></app-pagination>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ResultInfo from "@/components/results/ResultInfo.vue";
import SidebarBase from "@/components/SidebarBase.vue";
import AppPagination from "@/components/controls/AppPagination";
import AppSearch from "@/components/AppSearch.vue";
import ResultsTable from "@/components/results/ResultsTable.vue";

export default {
  components: {
    ResultInfo,
    SidebarBase,
    AppPagination,
    AppSearch,
    ResultsTable,
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

  mounted() {
    this.loaded = true;
  },

  computed: {
    ...mapGetters("results", {
      results: "getResults",
      selectable: "getSelectable",
      sortDir: "getSortDir",
      getPagination: "getPagination",
      isPending: "isPending",
      getSearchOptions: "getSearchOptions",
      getSortOptions: "getSortOptions",
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
      "fetchResults",
      "fetchAll",
      "sortBy",
      "filterBySearch",
    ]),

    // sortBy(key, ind) {
    //   this.headers.forEach((el, i) => {
    //     el.active = i == ind;
    //   });
    //   this.sortResultsBy(key);
    // },

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
      console.log(1);
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
.results {
  &-back {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
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
      left: -1px;
      top: 50%;
      transform: translate(-50%, -50%);
      color: $color-main;
      font-size: 12px;
    }

    .selectable {
      position: relative;
      cursor: pointer;

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
    display: flex;
    align-items: center;
    justify-content: center;

    background: $gradient-w;
    font-size: 24px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>