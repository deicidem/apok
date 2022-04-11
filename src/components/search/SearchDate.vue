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
            id="datepicker-start"
            class="input-date"
            v-model="time"
            valueType="format"
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
            id="datepicker-end"
            class="input-date"
            v-model="time"
            valueType="format"
          ></date-picker>
        </div>
      </div>

      <div>
        <label class="select2-label">Выбрать месяцы:</label>
        <Select2
          v-model="myValue"
          :options="myOptions"
          @change="myChangeEvent($event)"
          @select="mySelectEvent($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import Select2 from "v-select2-component";
export default {
  components: {
    DatePicker,
    Select2,
  },
  data() {
    return {
      time: "",
      myValue: "",
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
    };
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
    overflow: hidden;
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