<template>
  <div class="search-date">
    <h2 class="search__title">Интервал дат съемки</h2>

    <div class="search-date__wrapper">
      <div class="search-date__inputs">
        <div class="search-date__input">
          <label class="datepicker-label" for="datepicker-start"
            >Искать с:</label
          >
          <date-picker
            :language="ru"
            class="input-date"
            calendar-class="input-calendar"
            :monday-first="true"
            v-model="from"
            valueType="format"
            @input="setTimeInterval({ from: $event, to, months })"
          >
          </date-picker>
          <div class="search-date__back">
            <img src="@/assets/img/calendar.svg" />
          </div>
        </div>

        <div class="search-date__arrow">
          <img src="@/assets/img/arrow.png" />
        </div>

        <div class="search-date__input">
          <label class="datepicker-label" for="datepicker-end">До:</label>
          <date-picker
            :language="ru"
            calendar-class="input-calendar"
            class="input-date"
            v-model="to"
            valueType="format"
            @input="setTimeInterval({ from, to: $event, months })"
          >
          </date-picker>
          <div class="search-date__back">
            <img src="@/assets/img/calendar.svg" />
          </div>
        </div>
      </div>

      <div>
        <label class="select2-label">Выбрать месяцы:</label>
        <div class="select" v-on-clickaway="away">
          <div class="select-data" @click="selectActive = !selectActive">
            <span v-for="month in months" :key="month.cnt"
              >{{ month.name }},
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
              <app-checkbox :mini="true" v-model="option.active"></app-checkbox>
              <span>{{ option.name }}</span>
            </label>
          </div>
        </div>
        <!-- <multi-select
          v-model="months"
          :multiple="true"
          :close-on-select="false"
          :options="monthsOptions"
          :searchable="false"
          :show-labels="false"
          :taggable="false"
          :option-height="15"
        >
          <template slot="singleLabel" slot-scope="props">
            <span class="option__desc">
              <span class="option__title">{{ props.option }}</span>
            </span>
            </template
          >
          <template slot="option" slot-scope="props">
            <div class="option__desc">
              <span class="option__title">{{ props.option }}</span>
            </div>
          </template>
        </multi-select> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mixin as clickaway} from "vue-clickaway";
import DatePicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
// import MultiSelect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [clickaway],
  components: {
    DatePicker,
    AppCheckbox,
    // MultiSelect,
  },
  data() {
    return {
      ru: ru,
      from: "",
      to: "",
      selectActive: false,
      allMonths: false,
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
      this.allMonths = $event;
      if ($event) {
        this.monthsOptions.forEach((el) => {
          el.active = true;
        });
      } else {
        this.monthsOptions.forEach((el) => {
          el.active = false;
        });
      }
      this.setTimeInterval({from: this.from, to: this.to, months: this.months})
    },
    away() {
      this.selectActive = false;
    }
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
  },
};
</script>

<style lang="scss">
.select {
  position: relative;
  &-data {
    background: #fff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    width: 150px;
    height: 34px;
    padding: 5px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
  }
  &-options {
    z-index: 10;
    position: absolute;
    top: calc(100% + 5px);
    width: 150px;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: $shadow-big;
    border-radius: 10px;
  }
  &-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $text-grey;
    padding: 4px 7px;
    border-radius: 0;
    font-size: 12px;
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
    padding-right: 26px;
    width: 130px;
    height: 34px;
    border: 1px solid $color-main;
    border-radius: 10px;
    box-shadow: $shadow-big;
    outline: none;
    &:focus-visible {
      border: 1px solid $color-main-dark;
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
      align-items: flex-end;
      justify-content: space-between;
      padding: 20px 0 20px 0;
    }
    &__inputs {
      display: flex;
    }
    &__input {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      position: relative;
      outline: none;
    }
    &__arrow {
      max-height: 20px;
      margin: 24px 20px 8px 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__back {
      background: $gradient;
      position: absolute;
      right: 0;
      top: 18px;
      padding: 7px;
      border-radius: 0 10px 10px 0;
    }
  }
}
</style>