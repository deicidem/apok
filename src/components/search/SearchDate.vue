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
            v-model="from"
            valueType="format"
            @input="setTimeInterval({ from: $event, to, months })"
          >
            <div class="datepicker__back"></div>
          </date-picker>
        </div>

        <div class="search-date__arrow">
          <img src="@/assets/img/arrow.png" />
        </div>

        <div class="search-date__input">
          <label class="datepicker-label" for="datepicker-end">До:</label>
          <date-picker
            :language="ru"
            class="input-date"
            v-model="to"
            valueType="format"
            @input="setTimeInterval({ from, to: $event, months })"
          ></date-picker>
        </div>
      </div>

      <div>
        <label class="select2-label">Выбрать месяцы:</label>
        <multi-select
          v-model="months"
          :multiple="true"
          :close-on-select="false"
          :options="monthsOptions"
          :searchable="false"
          :show-labels="false"
          :taggable="false"
          tagPosition="bottom"
        >
          <template slot="selection" slot-scope="{ values, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length && !isOpen"
              >Месяцев выбрано: {{ values.length }}</span
            ></template
          >
        </multi-select>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker";
import {ru} from 'vuejs-datepicker/dist/locale'
import MultiSelect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    DatePicker,
    MultiSelect,
  },
  data() {
    return {
      ru: ru,
      from: "",
      to: "",
      months: [],
      monthsOptions: [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
      ],
    };
  },
  methods: {
    ...mapActions("search", ["setTimeInterval"]),
  },
  computed: {
    ...mapGetters("search", ["getTimeInterval"]),
  },
};
</script>

<style lang="scss">
.mx {
  .datepicker-label {
    font-size: 14px;
    margin-left: 4px;
  }
  &-table {
    padding: 6px;
    .today {
      color: #000;
    }
  }
  &-btn {
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
  &-input {
    border: 1px solid $color-main;
    border-radius: 10px;
    box-shadow: $shadow-small;
    overflow: hidden;
    &:hover {
      border: 1px solid $color-main-dark;
    }
  }
  &-calendar {
    padding: 0;
    overflow: hidden;
    height: auto;
    &-content {
      height: 100%;
    }
    &-header {
      line-height: 26px;
      box-shadow: $shadow-big;
      background: $gradient;
      overflow: hidden;
      border-radius: 10px 10px 0 0;
      padding: 4px;
    }
  }
  &-datepicker {
    width: 150px;
    position: relative;
    overflow: hidden;
    &-main {
      color: $color-main-dark;
      font-family: "Montserrat";
      border-radius: 10px;
      border: none;
    }
    &-label {
      font-size: 12px;
    }
  }
  &-icon-calendar {
    background: $gradient;
    color: #fff;
    padding: 8px;
    right: 0px;
    font-size: 18px;
    border-radius: 0 10px 10px 0;
  }
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
    }

    &__arrow {
      max-height: 20px;
      margin: 30px 20px 8px 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>