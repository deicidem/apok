<template>
  <div class="search">
    <div class="sidebar-title">
      Поиск снимков
      <router-link to="/main/results">
        <div class="search-result">
          <p class="search-back__subtitle">Результат</p>
          <div class="search-back__arrow">
            <img svg-inline src="@/assets/img/arrow.svg" alt="Назад" />
          </div>
        </div>
      </router-link>
    </div>
    <vuescroll :ops="scrollOps">
      <div class="search-wrapper">
        <div class="search-content">
          <search-zone></search-zone>
          <search-date></search-date>
          <search-cloud></search-cloud>
          <search-spacecraft></search-spacecraft>
        </div>
        <div class="search-buttons">
          <button class="button button-r">Очистить</button>
          <button class="button button-g" @click="search">
            Запросить данные
          </button>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import "vue-slider-component/theme/default.css";
import SearchDate from "@/components/search/SearchDate";
import SearchSpacecraft from "@/components/search/SearchSpacecraft";
import SearchCloud from "@/components/search/SearchCloud";
import SearchZone from "@/components/search/SearchZone";

export default {
  components: {
    vuescroll,
    SearchDate,
    SearchSpacecraft,
    SearchCloud,
    SearchZone,
  },
  methods: {
    ...mapActions("search", ["search"]),
  },
  computed: {
    ...mapGetters(["scrollOps"]),
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" >
.search {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-result {
    position: absolute;
    top: 2px;
    right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &-back {
    &__subtitle {
      font-size: 12px;
      margin: 0;
    }
    &__arrow {
      transform: rotate(180deg);
      margin: 0;
      margin-left: 8px;
      line-height: 1;
      svg path {
        fill: #fff;
      }
    }
  }
  &-title {
    font-size: 20px;
    color: #000;
    font-weight: 400;
    margin: 0 0 20px 0;
  }
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
  &-title {
    font-weight: 400;
    font-size: 1.25rem;
    color: #000;
  }
  &-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
  }
}
@media screen and (max-width: 1440px) {
  .search {
    &-wrapper {
      padding: 20px;
    }
    &-title {
      font-size: 1.125rem;
      line-height: 130%;
      margin-bottom: 14px;
    }
  }
}
</style>