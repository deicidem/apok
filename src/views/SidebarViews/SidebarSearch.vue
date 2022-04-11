<template>
  <div class="search">
    <h2 class="sidebar-title">Поиск снимков</h2>
    <div class="search-wrapper">
      <vuescroll :ops="ops">
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
                <a href="#">Задать полигон</a>
              </li>
              <li class="line"></li>
              <li>
                <a href="#">Вывести координаты</a>
              </li>
              <li class="line"></li>
              <li>
                <a href="#">Загрузить файл</a>
              </li>
            </ul>
          </nav>

          <div class="search-zone__main">
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

          <div class="search-zone__coordinates">
            <div class="coordinates-wrapper">
                <app-input label="Ширина" class="coordinates-wrapper__input"></app-input>
                <app-input label="Искать с" class="coordinates-wrapper__input"></app-input>
                <app-input label="Радиус" class="coordinates-wrapper__input"></app-input>
                <div class="coordinates-wrapper__select">
                  <Select2 v-model="myValue" :options="myOptions" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                </div>
            </div>

            <app-button  class="coordinates-wrapper__button">Загрузить на карту</app-button>
          </div> 

          <div class="search-zone__load">
            <div class="load-wrapper">
              <app-button type="white-g">Загрузить файл</app-button>
              <span class="load-wrapper__name">POLYGON.shp</span>
            </div>
            <app-button>Показать на карте</app-button>
          </div>

        </div>

        <div class="search-date">
          <h2 class="search__title">Интервал дат съемки</h2>
          <div class="search-date__wrapper">

          <div class="search-date__inputs">
            <div class="search-date__input">
              <label class="datepicker-label" for="datepicker-start">Искать с:</label>
              <date-picker id="datepicker-start" class="input-date" v-model="time" valueType="format">
                <div class="datepicker__back"></div>
              </date-picker>
            </div>

            <div class="search-date__arrow">
              <img src="@/assets/img/arrow.png" />
            </div>

            <div class="search-date__input">
              <label class="datepicker-label" for="datepicker-end">До:</label>
              <date-picker id="datepicker-end" class="input-date" v-model="time" valueType="format"></date-picker>
            </div>
          </div>
          
            <div>
              <label class="select2-label">Выбрать месяцы:</label>
              <Select2 v-model="myValue" :options="myOptions"  @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
            </div>

          </div>
        </div>

        <div class="search-cloud">
          <h2 class="search__title">Облачность</h2>
            <div class="search-cloud__subtitle">Процент облачности: <p>{{your_value[0]}}% - {{your_value[1]}}%</p></div>

            <no-ui-slider :config="your_config" :values="your_value"/>

            <div class="search-cloud__wrapper">
              <p>0%</p>
              <p>100%</p>
            </div>
        </div>

        <div class="search-spacecraft">
            <h2 class="search__title">Космический аппарат</h2>

              <div class="accordion">
                <div class="accordion-item">
                  <input class="accordion-item__input" type="checkbox" id="accordion-1">
                  <label class="accordion-item__trigger" for="accordion-1">
                    <div class="accordion-item__img"></div>
                    <app-checkbox :mini="true" @input="onCheck($event)"/>
                    <p>Канопус</p>
                  </label>

                  <div class="accordion-item__content">
                    <input class="accordion-item__input" type="checkbox" id="accordion-2">

                    <label class="accordion-item__trigger" for="accordion-2">
                      <div class="accordion-item__img"></div>
                      <app-checkbox :mini="true" @input="onCheck($event)"/>
                      <p>Канопус-В</p>
                    </label>

                    <div class="accordion-item__content">
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <app-checkbox :mini="true" @input="onCheck($event)"/>
                          <div>
                            <img src="@/assets/img/spektr.png">
                          </div>
                          <p>Многоспектральная съемка</p>
                        </label>
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <app-checkbox :mini="true" @input="onCheck($event)"/>
                          <div>
                            <img src="@/assets/img/panhrom.png">
                          </div>
                          <p>Панхроматическая съемка</p>
                        </label>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <input class="accordion-item__input" type="checkbox" id="accordion-3">
                  <label class="accordion-item__trigger" for="accordion-3">
                    <div class="accordion-item__img"></div>
                    <app-checkbox :mini="true" @input="onCheck($event)"/>
                    <p>Ресурс</p>
                  </label>

                  <div class="accordion-item__content">
                    <input class="accordion-item__input" type="checkbox" id="accordion-4">

                    <label class="accordion-item__trigger" for="accordion-4">
                      <div class="accordion-item__img"></div>
                      <app-checkbox :mini="true" @input="onCheck($event)"/>
                      <p>Ресурс-П1</p>
                    </label>

                    <div class="accordion-item__content">
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <app-checkbox :mini="true" @input="onCheck($event)"/>
                          <div>
                            <img src="@/assets/img/spektr.png">
                          </div>
                          <p>Многоспектральная съемка</p>
                        </label>
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <app-checkbox :mini="true" @input="onCheck($event)"/>
                          <div>
                            <img src="@/assets/img/panhrom.png">
                          </div>
                          <p>Панхроматическая съемка</p>
                        </label>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </vuescroll>
      
    </div>
  </div>
</template>

<script>
import NoUiSlider from 'vue-nouislider/src/components/noUiSlider.vue';
import 'vue-nouislider/dist/vue-nouislider.css';

import vuescroll from 'vuescroll';
import "vuescroll/dist/vuescroll.css";

import { mapGetters, mapActions } from "vuex";
import AppButton from "@/components/controls/AppButton.vue";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import Select2 from 'v-select2-component';

import AppInput from "@/components/controls/AppInput.vue"
import AppCheckbox from "@/components/controls/AppCheckbox";

export default {
  components: {
    AppButton,
    AppInput,
    vuescroll,
    DatePicker,
    NoUiSlider,
    AppCheckbox,
    Select2
  },
  data() {
    return {
      time: '',
      myValue: '',
      myOptions: ['май', 'май', 'май', 'май', 'май', 'май'],
      your_config: {
        step: 10,
        connect: true,
        behaviour: "drag",
        range: {
          'min': 0,
          'max': 100
        }
      },
      ops: {
        vuescroll: {},
        scrollPanel: {
        },
        rail: {
          background: '#000',
          opacity: .1,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: '#000',
        }
      },
      your_value: [20, 80]
    };
  },
  computed: {
    ...mapGetters("map", ["getPolygonArea", "getFormattedCoordinates"]),
  },
  methods: {
    ...mapActions("map", [
      "addCoordinate",
      "changeCoordinate",
      "deleteCoordinate",
      "setPolygonDrawable",
      "clearCoordinates",
    ]),
  }
};
</script>

<style lang="scss">

.select2{

  width: 150px !important;
  &-label{
    font-size: 12px;
  }
  &-selection{
    overflow: hidden;
    border-radius: 10px;
    box-shadow: $shadow-small;
    align-items: center;
    color: $color-main-dark;
    margin-bottom: 6px;
    &--single{
      height: 34px !important;
      border-radius: 10px !important;
      border: none !important;
    }
    &__arrow{
      height: 34px  !important;
      b{
        border-color: $color-main transparent transparent transparent !important;
      }
    }
    
  }
  &-dropdown{
    border-radius: 10px !important;
    border: none !important;
    box-shadow: $shadow-big;
  }
  &-search__field{
    border: 1px solid $color-main !important;
    border-radius: 6px;
  }
  &-results__option{
    padding: 10px;
    font-size: 0.875rem !important;
    color: #000;
    &--highlighted[aria-selected]{
      background-color: $color-main !important;  
    }
  }
}


.vue-nouislider{
  background: #FFF;
  margin: 30px 0 0 0;
  width: 450px;
  height: 14px;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;
}

.noUi{
  &-connect{
    background: $color-main-dark;
  }
  &-horizontal &-handle{
    width: 24px;
    height: 24px;
  }
  &-handle{
    border-radius: 6px;
    background: $gradient;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    &::before{
      background: none;
    }
    &::after{
      background: none;
    }
  }
}

.accordion{
  padding: 10px;
  box-shadow: $shadow-small;
  border-radius: 10px;
  overflow: hidden;
  background: $gradient-w;
  &-item{
    position: relative;
    p{
      margin-left: 4px;
      color: #000;
      font-size: 0.875rem;
    }

    &__input{
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;

      &:checked ~ .accordion-item__content{
        display:inline-block;
      }
    }
    &__trigger{
      display: flex;
      align-items: center;
      padding: 6px 0 0 6px;
    }
    &__checkbox{
      margin-right: 6px;
    }
    &__img{
      background: url("@/assets/img/arrow-close.png");
      height: 24px;
      width: 24px;
    }
    &__content{
      padding: 6px 0 0 24px;
      border-top: none;
      display: none;
    }
  }
}

.mx{
  .datepicker-label{
    font-size: 14px;
    margin-left: 4px;
  }
  &-table{
    padding: 6px;
    .today{
      color: #000;
    }
  }
  &-btn{
    color: #FFF;
    &:hover{
      color: #FFF;
    }
  }
  &-input{
    border: 1px solid $color-main;
    border-radius: 10px;
    box-shadow: $shadow-small;
    overflow: hidden;
    &:hover{
      border: 1px solid $color-main-dark;
    }
  }
  &-calendar{
    padding: 0;
    overflow: hidden;
    height: auto;
    &-content{
      height: 100%;
    }
    &-header{
      line-height: 26px;
      box-shadow: $shadow-big;
      background: $gradient;
      overflow: hidden;
      border-radius: 10px 10px 0 0 ;
      padding: 4px;
    }
  }
  &-datepicker{
    width: 150px;
    position: relative;
    overflow: hidden;
    &-main{
      color: $color-main-dark;
      font-family: "Montserrat";
      border-radius: 10px; 
      border: none;
    }
    &-label{
      font-size: 12px;
    }
  }
  &-icon-calendar{
    background: $gradient;
    color:#FFF;
    padding: 8px;
    right: 0px;
    font-size: 18px;
    border-radius: 0 10px 10px 0 ;
  }
}

.search {
  &-wrapper {
    // max-height: 100%;
    margin: 30px;
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
        a {
          color: #000;
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
      // display: flex;
      display: none;
      justify-content: space-between;
      align-items: flex-start;
      padding: 10px;
      box-shadow: $shadow-big;
      border-radius: 10px;
      background: #fff;
    }
    &__coordinates{
      display: none;
      padding: 10px;
      box-shadow: $shadow-big;
      border-radius: 10px;
      background: #fff;
      flex-direction: column;

      .coordinates-wrapper{
        display: flex;
        margin: 20px 0;
        justify-content: space-between;
        &__input{
          margin-right: 20px;
        }
        &__button{
          margin-left: auto;
        }
      }
    }
    &__load{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      box-shadow: $shadow-big;
      border-radius: 10px;
      background: #fff;
      .load-wrapper{
        &__name{
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
            &-item{
              &__trash{
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
  &-date {
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
    &__wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 20px 0 20px 0;

    }
    &__inputs{
      display: flex;
    }
    &__input{
      display: flex;
      flex-direction: column;
      font-size: 12px;
    }
    
    &__arrow {
      max-height: 20px;
      margin:  30px 20px 8px 20px;;
      img {
        width: 100%;
        height: 100%;
      }
    }

  }
  &-cloud {
    &__subtitle{
      display: flex;
      font-size: 12px;
      color: $text-grey;
      margin-top: 10px;
      p{
        color: #000000;
        margin-left: 8px;
      }
    }
    &__wrapper{
      width: 450px;
      display: flex;
      justify-content: space-between;
      p{
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