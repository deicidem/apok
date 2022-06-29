<template>
  <div class="search">
    <div class="sidebar-title">
      Поиск снимков
      <router-link to="/main/results" custom v-slot="{ navigate }">
        <div class="search-result" @click="navigate">
          <span class="search-result__subtitle">Результат</span>
          <div class="search-result__arrow">
            <img svg-inline src="@/assets/img/arrows/arrow.svg" alt="Назад" />
          </div>
        </div>
      </router-link>
    </div>
    <vuescroll :ops="scrollOps">
      <div class="search-wrapper">
        <div class="search-content">
          <search-area></search-area>
          <search-date></search-date>
          <search-cloud></search-cloud>
          <search-satelite></search-satelite>
        </div>
        <div class="search-buttons">
          <button class="button button-r">Очистить</button>
          <button class="button button-g" @click="onSearch">
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
import SearchSatelite from "@/components/search/SearchSatelite";
import SearchCloud from "@/components/search/SearchCloud";
import SearchArea from "@/components/search/SearchArea";

export default {
  components: {
    vuescroll,
    SearchDate,
    SearchSatelite,
    SearchCloud,
    SearchArea,
  },
  methods: {
    ...mapActions("search", ["search"]),
    async onSearch() {
      await this.search();
      this.$router.push("results");
    },
  },

  computed: {
    ...mapGetters(["scrollOps"]),
  },
  data() {
    return {};
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
    top: 50%;
    right: 30px;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    cursor: pointer;
    &__arrow {
      height: 23px;
      transform: rotate(180deg);
      svg {
        height: 100%;
      }
      svg path {
        fill: #fff;
      }
    }
    &__subtitle {
      margin-right: 10px;
      color: #fff;
      font-size: 14px;
    }
  }
  &-title {
    margin: 0 0 20px 0;
    font-weight: 400;
    font-size: 1.25rem;
    color: $black;
  }
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
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