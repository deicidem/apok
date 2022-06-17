<template>
  <div class="search-date">
    <h2 class="search-title">Интервал дат съемки</h2>

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
              setTimeInterval({ from: $event, to: getTimeInterval.to, months })
            "
          >
          </date-picker>
          <label
            class="input-label search-date__label"
            :class="{ active: getTimeInterval.from }"
            >Искать с:</label
          >
          <div class="search-date__background">
            <img src="@/assets/img/calendar.svg" />
          </div>
        </div>

        <div class="search-date__arrow">
          <img svg-inline src="@/assets/img/arrow.svg" />
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
            <img src="@/assets/img/calendar.svg" />
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
              class="input"
              :value="monthsValue"
              readonly
              required
              :class="{ invalid: monthsValue == '' }"
            />
            <label class="input-label select-label">Выбрать месяцы:</label>
            <div class="select-img">
              <img svg-inline src="@/assets/img/arrow-down.svg" />
            </div>
          </div>
          <div class="select-options" v-show="selectActive">
            <label class="select-option">
              <app-checkbox
                :mini="true"
                :modelValue="allMonths"
                @change="onAllCheck($event)"
              ></app-checkbox>
              <span>Все</span>
            </label>
            <label
              class="select-option"
              v-for="(option, i) in monthsOptions"
              :key="i"
            >
              <app-checkbox
                :mini="true"
                v-model="option.active"
                @change="
                  setTimeInterval({
                    from: getTimeInterval.from,
                    to: getTimeInterval.to,
                    months,
                  })
                "
              ></app-checkbox>
              <span>{{ option.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import DatePicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
import "vue-multiselect/dist/vue-multiselect.min.css";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import { mapActions, mapGetters } from "vuex";

import useVuelidate from "@vuelidate/core";

export default {
  mixins: [clickaway],
  components: {
    DatePicker,
    AppCheckbox,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      month: "",
      ru: ru,
      from: "",
      to: "",
      selectActive: false,
      monthsOptions: [
        {
          cnt: 1,
          name: "январь",
          active: true,
        },
        {
          cnt: 2,
          name: "февраль",
          active: true,
        },
        {
          cnt: 3,
          name: "март",
          active: true,
        },
        {
          cnt: 4,
          name: "апрель",
          active: true,
        },
        {
          cnt: 5,
          name: "май",
          active: true,
        },
        {
          cnt: 6,
          name: "июнь",
          active: true,
        },
        {
          cnt: 7,
          name: "июль",
          active: true,
        },
        {
          cnt: 8,
          name: "август",
          active: true,
        },
        {
          cnt: 9,
          name: "сентябрь",
          active: true,
        },
        {
          cnt: 10,
          name: "октябрь",
          active: true,
        },
        {
          cnt: 11,
          name: "ноябрь",
          active: true,
        },
        {
          cnt: 12,
          name: "декабрь",
          active: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions("search", ["setTimeInterval"]),
    onAllCheck($event) {
      if ($event) {
        this.monthsOptions.forEach((el) => {
          el.active = true;
        });
      } else {
        this.monthsOptions.forEach((el) => {
          el.active = false;
        });
      }
      this.setTimeInterval({
        from: this.getTimeInterval.from,
        to: this.getTimeInterval.to,
        months: this.months,
      });
    },
    away() {
      this.selectActive = false;
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
  computed: {
    ...mapGetters("search", ["getTimeInterval"]),
    monthsValue() {
      if (this.allMonths) {
        return "Все";
      } else {
        let res = "";
        this.months.forEach((el) => {
          res += el.cnt + " ";
        });
        return res;
      }
    },
    months() {
      let res = [];
      this.monthsOptions.forEach((el) => {
        if (el.active) {
          res.push({ ...el });
        }
      });
      return res;
    },
    allMonths() {
      return this.months.length == 12;
    },
  },
  mounted() {
    this.getTimeInterval.months.forEach((el) => {
      this.monthsOptions[el.cnt - 1].active = true;
    });
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
    margin-top: 20px;
    padding: 20px;

    box-shadow: $shadow-small;
    border-radius: 10px;
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
      max-height: 40px;
      margin: 0 20px;
      transform: rotate(180deg);
      svg path {
        fill: $color-main;
      }
    }
    &__background {
      position: absolute;
      right: 0;
      top: 0;

      padding: 7px;

      background: $gradient;
      border-radius: 0 10px 10px 0;
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
  &-img {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    display: flex;
    svg path {
      fill: $color-main;
    }
  }
  &-data {
    &:focus-within .input-label {
      top: -20px;
    }
    input {
      width: 180px;
      height: 35px;
      padding: 5px 30px 5px 14px;

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
    width: 158px;

    background: #fff;
    box-shadow: $shadow-small;
    border-radius: 10px;
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
      color: #fff;
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
    border-radius: 10px;
    border: none !important;
    overflow: hidden;
    box-shadow: $shadow-big;

    header {
      box-shadow: $shadow-big;
      span {
        .prev {
          &::after {
            color: #000 !important;
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
  color: #fff !important;
}
@media screen and (max-width: 1440px) {
  .vdp-datepicker input {
    width: 140px;
    height: 28px;
  }
  .search {
    &-date {
      padding: 14px;
      &__back {
        top: 18px;

        padding: 4px;
        cursor: pointer;
      }
      &__arrow {
        margin: 0 16px;
        img {
          max-height: 28px;
        }
      }
    }
  }
  .select-data {
    width: 140px;
    height: 28px;
  }
}
</style>