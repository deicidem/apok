<template>
  <search-base title="Интервал дат съемки" :invalid="invalid">
    <template v-slot:error-message> Укажите интервал дат съмки </template>
    <template v-slot:content>
      <div class="search-date__wrapper">
        <div class="search-date__inputs">
          <div class="input-wrapper search-date__input">
            <date-picker
              format="yyyy-MM-dd"
              placeholder=" "
              :use-utc="true"
              required
              input-class="input"
              :language="ru"
              calendar-class="input-calendar"
              :monday-first="true"
              :value="getTimeInterval.from"
              valueType="format"
              @input="
                setTimeInterval({
                  from: $event,
                  to: getTimeInterval.to,
                  months,
                })
              "
            >
            </date-picker>
            <label
              class="input-label search-date__label"
              :class="{ active: getTimeInterval.from }"
              >Искать с:</label
            >
            <div class="search-date__background">
              <i class="icon icon-ic_fluent_calendar_ltr_20_regular"></i>
            </div>
          </div>

          <div class="search-date__arrow">
            <i class="icon icon-ic_fluent_arrow_right_20_regular"></i>
          </div>

          <div class="input-wrapper search-date__input">
            <date-picker
              format="yyyy-MM-dd"
              placeholder=" "
              :use-utc="true"
              required
              input-class="input"
              :language="ru"
              calendar-class="input-calendar"
              :value="getTimeInterval.to"
              valueType="format"
              @input="
                setTimeInterval({
                  from: getTimeInterval.from,
                  to: $event,
                  months,
                })
              "
            >
            </date-picker>
            <label
              class="input-label search-date__label"
              :class="{ active: getTimeInterval.to }"
              >До:</label
            >
            <div class="search-date__background">
              <i class="icon icon-ic_fluent_calendar_ltr_20_regular"></i>
            </div>
          </div>
        </div>

        <div>
          <div class="select" v-on-clickaway="away">
            <div
              class="input-wrapper select-data"
              @click="selectActive = !selectActive"
            >
              <input
                placeholder=" "
                type="text"
                :value="monthsValue"
                readonly
                required
                class="input"
                :class="{ invalid: monthsValue == '' }"
              />
              <label class="input-label select-label">Выбрать месяцы:</label>
              <div class="select-img">
                <i class="icon icon-ic_fluent_triangle_down_20_filled"></i>
              </div>
            </div>
            <div class="select-options" v-show="selectActive">
              <label class="select-option">
                <app-checkbox
                  :mini="true"
                  :model-value="allMonths"
                  @change="onAllCheck($event)"
                ></app-checkbox>
                <span>Все</span>
              </label>
              <label
                class="select-option"
                v-for="(option, i) in getTimeInterval.months"
                :key="i"
              >
                <app-checkbox
                  :mini="true"
                  :model-value="option.active"
                  @change="onSelect(i)"
                ></app-checkbox>
                <span>{{ option.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </search-base>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import DatePicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
import "vue-multiselect/dist/vue-multiselect.min.css";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import { mapActions, mapGetters } from "vuex";

import useVuelidate from "@vuelidate/core";
import SearchBase from "@/components/search/SearchBase";
export default {
  mixins: [clickaway],
  components: {
    DatePicker,
    SearchBase,
    AppCheckbox,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      month: "",
      ru: ru,
      from: null,
      to: null,
      selectActive: false,
    };
  },
  computed: {
    ...mapGetters("search", ["getTimeInterval", "getSearchStatus"]),
    monthsValue() {
      if (this.allMonths) {
        return "Все";
      } else {
        let res = "";
        this.getTimeInterval.months.forEach((el) => {
          if (el.active) {
            res += el.cnt + " ";
          }
        });
        return res;
      }
    },

    months() {
      let res = [];
      this.getTimeInterval.months.forEach((el) => {
        if (el.active) {
          res.push({ ...el });
        }
      });
      return res;
    },

    allMonths() {
      return this.months.length == 12;
    },

    invalid() {
      let timeInterval = this.getTimeInterval;
      return (
        (timeInterval.to == null ||
          timeInterval.from == null ||
          timeInterval.months.length == 0) &&
        this.getSearchStatus == "ERROR"
      );
    },
  },
  mounted() {
    // this.getTimeInterval.months.forEach((el) => {
    // this.monthsOptions[el.cnt - 1].active = true;
    // });
  },
  methods: {
    ...mapActions("search", ["setTimeInterval"]),

    onAllCheck($event) {
      let months = [];
      this.getTimeInterval.months.forEach((el) => {
        months.push({ ...el });
      });
      if ($event) {
        months.forEach((el) => {
          el.active = true;
        });
      } else {
        months.forEach((el) => {
          el.active = false;
        });
      }
      this.setTimeInterval({
        from: this.getTimeInterval.from,
        to: this.getTimeInterval.to,
        months,
      });
    },

    away() {
      this.selectActive = false;
    },

    onSelect(i) {
      let months = [];
      this.getTimeInterval.months.forEach((el) => {
        months.push({ ...el });
      });
      months[i].active = !months[i].active;
      this.setTimeInterval({
        from: this.getTimeInterval.from,
        to: this.getTimeInterval.to,
        months: months,
      });
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

<style lang="scss">
label.active {
  top: -20px;
  font-size: 12px;
  color: $color-main;
}

.search {
  &-date {
    &.invalid {
      border: 1px solid $color-red;
    }
    margin-top: 20px;
    padding: 20px;

    box-shadow: $shadow-small;
    border-radius: 7px;
    background: $gradient-w;

    .input-calendar {
      color: #585858 !important;

      .next::after {
        border-left: 10px solid $color-main !important;
      }

      .prev::after {
        border-right: 10px solid $color-main !important;
      }

      .cell.selected {
        background: $color-main;
      }
    }

    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__inputs {
      display: flex;
      align-items: center;
    }

    &__label {
      left: 0;
      top: 6px;
      padding-left: 16px;
      z-index: 10;

      pointer-events: none;
    }

    &__input {
      font-size: 12px;
      &:focus-within .search-date__label {
        top: -20px;
        color: $color-main;
        font-size: 12px;
      }
    }

    &__arrow {
      display: flex;
      margin: 0 20px;
      color: $color-main;
      font-size: 30px;
    }

    &__background {
      position: absolute;
      right: 0;
      top: 0;

      height: 34px;
      width: 30px;

      background: $gradient;
      border-radius: 0 7px 7px 0;
      z-index: 20;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        color: $white;
        font-size: 20px;
      }
    }
  }
}

.select {
  position: relative;
  margin-left: 30px;

  &-label {
    top: 6px;
    left: 0;
    padding-left: 14px;
    font-size: 14px;
    color: $text-grey;
  }

  &-img i {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    display: flex;
    font-size: 12px;
    color: $color-main;
  }

  &-data {
    &:focus-within .input-label {
      top: -20px;
    }

    input {
      width: 180px;
      height: 35px;
      padding: 5px 0 5px 14px;

      overflow: hidden;
      margin: 0;
      color: $text-grey;
      cursor: pointer;

      &:focus ~ .input-label,
      &:not(:placeholder-shown) ~ label {
        top: -20px;
        font-size: 12px;
        color: $color-main;
      }
    }
  }

  &-options {
    position: absolute;
    top: 110%;
    z-index: 10;

    display: flex;
    flex-direction: column;
    width: 100%;
    background: $white;
    box-shadow: $shadow-small;
    border-radius: 7px;
  }

  &-option {
    display: flex;
    align-items: center;
    padding: 4px 7px;
    font-size: 12px;
    color: $text-grey;
    border-radius: 0;
    cursor: pointer;

    span {
      margin-left: 8px;
    }

    &.active {
      background: $color-main;
      color: $white;
    }
  }
}

.input-calendar {
  color: #585858 !important;

  .next::after {
    border-left: 10px solid $color-main !important;
  }

  .prev::after {
    border-right: 10px solid $color-main !important;
  }

  .cell.selected {
    background: $color-main;
  }
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid $color-main !important;
}

.vdp-datepicker {
  input {
    width: 180px;
    height: 34px;
    color: $text-grey;
  }

  &__calendar {
    top: 110%;
    width: 260px !important;
    border-radius: 7px;
    border: none !important;
    overflow: hidden;
    box-shadow: $shadow-big;

    header {
      box-shadow: $shadow-big;
      span {
        .prev {
          &::after {
            color: $black !important;
          }
        }
      }
    }
  }
}

.cell {
  color: $text-grey !important;

  &:hover {
    border: 1px solid $color-main;
  }
}

.selected {
  background: $color-main !important;
  color: $white !important;
}

@media screen and (max-width: 1440px) {
  .vdp-datepicker input {
    width: 140px;
    height: 28px;
  }

  .select-data {
    width: 140px;
    height: 28px;
  }
}
</style>