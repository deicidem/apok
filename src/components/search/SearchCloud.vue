<template>
  <search-base title="Облачность" :invalid="invalid">
    <template v-slot:error-message>
      Укажите облачность
    </template>
    <template v-slot:content>
      <div class="search-cloud__wrapper">
        <p>0%</p>
        <p>100%</p>
      </div>

      <vue-slider
        :value="getCloudiness"
        @change="setCloudiness({ from: $event[0], to: $event[1] })"
        :adsorb="true"
        :interval="5"
      ></vue-slider>
      
      <div class="search-cloud__subtitle">
        Процент облачности:
        <p>{{ getCloudiness[0] }}% - {{ getCloudiness[1] }}%</p>
      </div>
    </template>
  </search-base>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import SearchBase from "@/components/search/SearchBase";
export default {
  components: {
    VueSlider,
    SearchBase
  },
  computed: {
    ...mapGetters("search", ["getCloudiness", "getSearchStatus"]),
    invalid() {
      return (
        (this.getCloudiness[0] == null || this.getCloudiness[1] == null) &&
        this.getSearchStatus == "ERROR"
      );
    },
  },
  methods: {
    ...mapActions("search", ["setCloudiness"]),
  },
};
</script>

<style lang="scss" >
.search {
  &-cloud {
    &.invalid {
    border: 1px solid $color-red;
  }
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
    box-shadow: inset 1px 1px 4px rgba($black, 0.15);
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
