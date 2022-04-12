<template>
  <div class="search">
    <h2 class="sidebar-title">Поиск снимков</h2>
    <vuescroll :ops="ops">
      <div class="search-wrapper">
        <div class="search-content">
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
                <div class="coordinates-wrapper__select">
                  <Select2
                    v-model="months"
                    :options="myOptions"
                    @change="myChangeEvent($event)"
                    @select="mySelectEvent($event)"
                  />
                </div>
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

        <search-date></search-date>

          <div class="search-cloud">
            <h2 class="search__title">Облачность</h2>
            <div class="search-cloud__subtitle">
              Процент облачности:
              <p>{{ your_value[0] }}% - {{ your_value[1] }}%</p>
            </div>

            <!-- <no-ui-slider :config="your_config" :values="your_value" /> -->
            <vue-slider v-model="your_value" :adsorb="true" :interval="10"></vue-slider>
            <div class="search-cloud__wrapper">
              <p>0%</p>
              <p>100%</p>
            </div>
          </div>

          <div class="search-spacecraft">
            <h2 class="search__title">Космический аппарат</h2>

            <div class="accordion">
              <div class="accordion-item">
                <input
                  class="accordion-item__input"
                  type="checkbox"
                  id="accordion-1"
                />
                <label class="accordion-item__trigger" for="accordion-1">
                  <div class="accordion-item__img"></div>
                  <app-checkbox :mini="true" @input="onCheck($event)" />
                  <p>Канопус</p>
                </label>

                <div class="accordion-item__content">
                  <input
                    class="accordion-item__input"
                    type="checkbox"
                    id="accordion-2"
                  />

                  <label class="accordion-item__trigger" for="accordion-2">
                    <div class="accordion-item__img"></div>
                    <app-checkbox :mini="true" @input="onCheck($event)" />
                    <p>Канопус-В</p>
                  </label>

                  <div class="accordion-item__content">
                    <input class="accordion-item__input" type="checkbox" />
                    <label class="accordion-item__trigger">
                      <app-checkbox :mini="true" @input="onCheck($event)" />
                      <div>
                        <img src="@/assets/img/spektr.png" />
                      </div>
                      <p>Многоспектральная съемка</p>
                    </label>
                    <input class="accordion-item__input" type="checkbox" />
                    <label class="accordion-item__trigger">
                      <app-checkbox :mini="true" @input="onCheck($event)" />
                      <div>
                        <img src="@/assets/img/panhrom.png" />
                      </div>
                      <p>Панхроматическая съемка</p>
                    </label>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <input
                  class="accordion-item__input"
                  type="checkbox"
                  id="accordion-3"
                />
                <label class="accordion-item__trigger" for="accordion-3">
                  <div class="accordion-item__img"></div>
                  <app-checkbox :mini="true" @input="onCheck($event)" />
                  <p>Ресурс</p>
                </label>

                <div class="accordion-item__content">
                  <input
                    class="accordion-item__input"
                    type="checkbox"
                    id="accordion-4"
                  />

                  <label class="accordion-item__trigger" for="accordion-4">
                    <div class="accordion-item__img"></div>
                    <app-checkbox :mini="true" @input="onCheck($event)" />
                    <p>Ресурс-П1</p>
                  </label>

                  <div class="accordion-item__content">
                    <input class="accordion-item__input" type="checkbox" />
                    <label class="accordion-item__trigger">
                      <app-checkbox :mini="true" @input="onCheck($event)" />
                      <div>
                        <img src="@/assets/img/spektr.png" />
                      </div>
                      <p>Многоспектральная съемка</p>
                    </label>
                    <input class="accordion-item__input" type="checkbox" />
                    <label class="accordion-item__trigger">
                      <app-checkbox :mini="true" @input="onCheck($event)" />
                      <div>
                        <img src="@/assets/img/panhrom.png" />
                      </div>
                      <p>Панхроматическая съемка</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
// import NoUiSlider from "vue-nouislider/src/components/noUiSlider.vue";
import "vue-nouislider/dist/vue-nouislider.css";

import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import { mapGetters, mapActions } from "vuex";
import AppButton from "@/components/controls/AppButton.vue";

import Select2 from "v-select2-component";

import AppInput from "@/components/controls/AppInput.vue";
import AppCheckbox from "@/components/controls/AppCheckbox";

import SearchDate from "@/components/search/SearchDate";

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    AppButton,
    AppInput,
    vuescroll,
    Select2,
    // NoUiSlider,
    SearchDate,
    AppCheckbox,
    VueSlider
  },
  data() {
    return {
      searchZoneType: 1,
      timeFrom: "",
      timeTo: "",
      months: [],
      myOptions: ["май", "май", "май", "май", "май", "май"],
      your_config: {
        step: 10,
        connect: true,
        behaviour: "drag",
        range: {
          min: 0,
          max: 100,
        },
      },
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,
          wheelScrollDuration: 500
        },
        scrollPanel: {
          scrollingX: false,
          speed: 300,
          easing: 'easeOutQuad',
        },
        rail: {
          background: "#000",
          opacity: 0.1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#476D70",
        },

      },
      your_value: [20, 80],
    };
  },
  computed: {
    ...mapGetters("map", [
      "getPolygonArea", 
      "getFormattedCoordinates",
      ]),
    ...mapGetters("search", [
      "getTimeInterval",
      "getSpacecrafts",
      "getCloudiness"
    ])
  },
  methods: {
    ...mapActions("map", [
      "addCoordinate",
      "changeCoordinate",
      "deleteCoordinate",
      "setPolygonDrawable",
      "clearCoordinates",
    ]),
    ...mapActions("search", [
      "setTimeInterval",
      "setSpacecrafts",
      "setCloudiness"
    ])
  },
};
</script>

<style lang="scss">

.__vuescroll {
  display: flex;
  flex-direction: column;
}

.__panel {
  width: 100%;
}

.select2 {
  width: 150px !important;
  &-label {
    font-size: 12px;
  }
  &-selection {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: $shadow-small;
    align-items: center;
    color: $color-main-dark;
    margin-bottom: 6px;
    &--single {
      height: 34px !important;
      border-radius: 10px !important;
      border: none !important;
    }
    &__arrow {
      height: 34px !important;
      b {
        border-color: $color-main transparent transparent transparent !important;
      }
    }
  }
  &-dropdown {
    border-radius: 10px !important;
    border: none !important;
    box-shadow: $shadow-big;
  }
  &-search__field {
    border: 1px solid $color-main !important;
    border-radius: 6px;
  }
  &-results__option {
    padding: 10px;
    font-size: 0.875rem !important;
    color: #000;
    &--highlighted[aria-selected] {
      background-color: $color-main !important;
    }
  }
}

.vue-nouislider {
  background: #fff;
  margin: 30px 0 0 0;
  width: 450px;
  height: 14px;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;
}

.noUi {
  &-connect {
    background: $color-main-dark;
  }
  &-horizontal &-handle {
    width: 24px;
    height: 24px;
  }
  &-handle {
    border-radius: 6px;
    background: $gradient;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    &::before {
      background: none;
    }
    &::after {
      background: none;
    }
  }
}

.accordion {
  padding: 10px;
  box-shadow: $shadow-small;
  border-radius: 10px;
  overflow: hidden;
  background: $gradient-w;
  &-item {
    position: relative;
    p {
      margin-left: 4px;
      color: #000;
      font-size: 0.875rem;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;

      &:checked ~ .accordion-item__content {
        display: inline-block;
      }
    }
    &__trigger {
      display: flex;
      align-items: center;
      padding: 6px 0 0 6px;
    }
    &__checkbox {
      margin-right: 6px;
    }
    &__img {
      background: url("@/assets/img/arrow-close.png");
      height: 24px;
      width: 24px;
    }
    &__content {
      padding: 6px 0 0 24px;
      border-top: none;
      display: none;
    }
  }
}


.search {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
  &__title {
    font-weight: 400;
    font-size: 1.25rem;
    color: #000;
  }
  &-zone {
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
    &__coordinates{
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
        &__input{
          margin-right: 20px;
          width: 120px;
        }
        &__button {
          margin-left: auto;
        }
      }
    }
    &__load{
      display: none;
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
            // Делай классы
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
  &-cloud {
    &__subtitle {
      display: flex;
      font-size: 12px;
      color: $text-grey;
      margin-top: 10px;
      p {
        color: #000000;
        margin-left: 8px;
      }
    }
    &__wrapper {
      width: 450px;
      display: flex;
      justify-content: space-between;
      p {
        margin: 10px 4px;
        font-size: 12px;
        color: #000;
      }
    }
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
  }
  &-spacecraft {
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
  }
  &-buttons {
    margin: 10px;
    text-align: center;
  }
}
</style>