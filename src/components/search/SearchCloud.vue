<template>
  <div class="search-cloud">
    <h2 class="search-title">Облачность</h2>
    <div class="search-cloud__wrapper">
      <p>0%</p>
      <p>100%</p>
    </div>
    <vue-slider
      :value="getCloudiness"
      @change="setCloudiness({ from: $event[0], to: $event[1] })"
      :adsorb="true"
      :interval="10"
    ></vue-slider>
    <div class="search-cloud__subtitle">
      Процент облачности:
      <p>{{ getCloudiness[0] }}% - {{ getCloudiness[1] }}%</p>
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
    margin-top: 20px;
    padding: 20px;

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
    &__subtitle {
      display: flex;
      margin-top: 20px;

      font-size: 12px;
      color: $text-grey;
      p {
        color: $black;
        margin: 0 0 0 8px;
      }
    }
    &__wrapper {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
        font-size: 12px;
        color: $black;
      }
    }
  }
}

.vue-slider {
  margin-top: 10px;
  height: 12px !important;
  padding: 0 !important;

  border-radius: 10px !important;
  &-rail {
    box-shadow: inset 1px 1px 4px rgba($black, 0.25);
    background: $white;
  }
  &-process {
    background: $color-main;
  }
  &-dot {
    top: 40% !important;
    &-handle {
      height: 18px !important;
      width: 18px !important;

      border-radius: 4px !important;
      background: $gradient;
      box-shadow: $shadow-small !important;
      &-focus {
        box-shadow: $shadow-small !important;
      }
    }
    &-tooltip-inner {
      background: $gradient;
      border-color: $color-main;
    }
  }
}
@media screen and (max-width: 1440px) {
  .search {
    &-cloud {
      padding: 14px;
    }
  }
}
</style>
