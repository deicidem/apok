<template>
  <div class="search-date">
    <h2 class="search-title">Интервал дат съемки</h2>

    <div class="search-date__wrapper">
      <div class="search-date__inputs">
        <div class="search-date__input">
          <label class="datepicker-label" for="datepicker-start"
            >Искать с:</label
          >
          <date-picker
            format="yyyy-MM-dd"
            :use-utc="true"
            :language="ru"
            class="input-date"
            calendar-class="input-calendar"
            :monday-first="true"
            :value="getTimeInterval.from"
            valueType="format"
            @input="
              setTimeInterval({ from: $event, to: getTimeInterval.to, months })
            "
          >
          </date-picker>
          <div class="search-date__back">
            <img src="@/assets/img/calendar.svg" />
          </div>
        </div>

        <div class="search-date__arrow">
          <img src="@/assets/img/arrow.svg" />
        </div>

        <div class="search-date__input">
          <label class="datepicker-label" for="datepicker-end">До:</label>
          <date-picker
            format="yyyy-MM-dd"
            :use-utc="true"
            :language="ru"
            calendar-class="input-calendar"
            class="input-date"
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
          <div class="search-date__back">
            <img src="@/assets/img/calendar.svg" />
          </div>
        </div>
      </div>

      <div>
        <div class="select" v-on-clickaway="away">
          <label class="select-label">Выбрать месяцы:</label>
          <div class="select-data" @click="selectActive = !selectActive">
            <span v-for="month in months" :key="month.cnt">
              <span>{{ month.cnt }} &thinsp; </span>
            </span>
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

export default {
  mixins: [clickaway],
  components: {
    DatePicker,
    AppCheckbox,
  },
  data() {
    return {
      ru: ru,
      from: "",
      to: "",
      selectActive: false,
      monthsOptions: [
        {
          cnt: 1,
          name: "январь",
          active: false,
        },
        {
          cnt: 2,
          name: "февраль",
          active: false,
        },
        {
          cnt: 3,
          name: "март",
          active: false,
        },
        {
          cnt: 4,
          name: "апрель",
          active: false,
        },
        {
          cnt: 5,
          name: "май",
          active: false,
        },
        {
          cnt: 6,
          name: "июнь",
          active: false,
        },
        {
          cnt: 7,
          name: "июль",
          active: false,
        },
        {
          cnt: 8,
          name: "август",
          active: false,
        },
        {
          cnt: 9,
          name: "сентябрь",
          active: false,
        },
        {
          cnt: 10,
          name: "октябрь",
          active: false,
        },
        {
          cnt: 11,
          name: "ноябрь",
          active: false,
        },
        {
          cnt: 12,
          name: "декабрь",
          active: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions("search", ["setTimeInterval"]),
    onAllCheck($event) {
      let all = true;
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
        from: this.from,
        to: this.to,
        months: this.months,
      });

      return all;
    },
    away() {
      this.selectActive = false;
    },
  },
  computed: {
    ...mapGetters("search", ["getTimeInterval"]),
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
.select {
  position: relative;

  margin-left: 30px;
  &-label {
    padding-left: 10px;

    font-size: 12px;
    color: $text-grey;
  }
  &-data {
    display: flex;
    align-items: center;
    width: 158px;
    height: 34px;
    padding: 5px;

    font-size: 12px;

    background: #fff;
    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgb($text-grey, 0.2);
    cursor: pointer;
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
.datepicker-label {
  padding-left: 10px;
  color: $text-grey;
}
.vdp-datepicker {
  input {
    width: 160px;
    height: 34px;
    padding-right: 26px;

    border: 1px solid rgb($text-grey, 0.2);
    border-radius: 10px;
    box-shadow: $shadow-small;
    outline: none;
    &:focus-visible {
      border: 1px solid $color-main;
    }
  }
  &__calendar {
    border-radius: 10px;
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
.search {
  &-date {
    margin-top: 20px;
    padding: 20px;

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 10px 0;
    }
    &__inputs {
      display: flex;
      align-items: flex-end;
    }
    &__input {
      position: relative;

      display: flex;
      flex-direction: column;

      font-size: 12px;
      outline: none;
      &:focus-within .datepicker-label {
        color: $color-main;
      }
    }
    &__arrow {
      max-height: 20px;
      margin: 0 20px;
      transform: rotate(180deg);
      img {
        width: 100%;
        max-height: 34px;
      }
    }
    &__back {
      position: absolute;
      right: 0;
      top: 18px;

      padding: 7px;

      background: $gradient;
      border-radius: 0 10px 10px 0;
    }
  }
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