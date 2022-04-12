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
          </date-picker>
          <div class="search-date__back">
            <img src="@/assets/img/calendar.svg">
          </div>
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
          >
          </date-picker>
           <div class="search-date__back">
            <img src="@/assets/img/calendar.svg">
          </div>
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
.multiselect{
  color: $color-main-dark;
  &__placeholder{
    margin: 0;
  }
}

.vdp-datepicker {
  input{
    padding-right: 26px;
    width: 130px;
    height: 34px;
    border: 1px solid $color-main;
    border-radius: 10px;
    box-shadow: $shadow-big;
    outline: none;
    &:focus-visible{
      border: 1px solid $color-main-dark; 
    }
  }
  &__calendar{
    border-radius: 10px;
    overflow: hidden;
    box-shadow: $shadow-big;
    header{
      box-shadow: $shadow-big;
      span{
        .prev{
          &::after{
            color: #000 !important;
          }
        }
      }
    }
  }
}

.cell{
  color: $text-grey !important;
  &:hover{
    border: 1px solid $color-main;
  }
}
.selected{
  background: $color-main !important;
  color: #FFF  !important;
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
    &__back{
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