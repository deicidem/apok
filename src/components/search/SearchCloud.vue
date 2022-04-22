<template>
  <div class="search-cloud">
    <h2 class="search-title">Облачность</h2>
    <div class="search-cloud__subtitle">
      Процент облачности:
      <p>{{ getCloudiness[0] }}% - {{ getCloudiness[1] }}%</p>
    </div>
    <vue-slider
      :value="getCloudiness"
      @change="setCloudiness({ from: $event[0], to: $event[1] })"
      :adsorb="true"
      :interval="10"
    ></vue-slider>
    <div class="search-cloud__wrapper">
      <p>0%</p>
      <p>100%</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    VueSlider,
  },
  computed: {
    ...mapGetters("search", ["getCloudiness"]),
  },
  methods: {
    ...mapActions("search", ["setCloudiness"]),
  },
};
</script>

<style lang="scss" >
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

.vue-slider {
  margin-top: 30px;
  box-shadow: $shadow-big;
  height: 12px !important;
  border-radius: 10px !important;
  padding: 0 !important;
  &-rail {
    background: #fff;
  }
  &-process {
    background: $color-main-dark;
  }
  &-dot {
    top: 40% !important;
    &-handle {
      border-radius: 4px !important;
      height: 18px !important;
      width: 18px !important;
      background: $gradient;
      &-focus {
        box-shadow: $shadow-big !important;
      }
    }
    &-tooltip-inner {
      background: $gradient;
      border-color: $color-main-dark;
    }
  }
}
</style>
