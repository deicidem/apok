<template>
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
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    VueSlider
  },
  data() {
    return {
      your_config: {
        step: 10,
        connect: true,
        behaviour: "drag",
        range: {
          min: 0,
          max: 100,
        },
      },
      your_value: [20, 80],
    }
  }
}
</script>

<style lang="scss">

.search {
  &-cloud {
    &__subtitle {
      display: flex;
      font-size: 12px;
      color: $text-grey;
      margin: 10px 0;
      p {
        color: #000000;
        margin-left: 8px;
      }
    }
    &__wrapper {
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
    background: $gradient-w;
  }
}

.vue-slider{
  margin-top: 30px;
  box-shadow: $shadow-big;
  height: 12px !important;
  border-radius: 10px !important;
  padding: 0 !important;
  &-rail{
    background: #fff;
  }
  &-process{
    background: $color-main-dark;
  }
  &-dot{
    top: 40% !important;
    &-handle{
      border-radius: 4px !important;
      height: 18px !important;
      width: 18px !important;
      background: $gradient;
      &-focus{
        box-shadow: $shadow-big !important;
      }
    }
    &-tooltip-inner{
      background: $gradient;
      border-color: $color-main-dark;
    }
  }
}


</style>