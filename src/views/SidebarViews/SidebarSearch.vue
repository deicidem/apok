<template>
  <div class="search">
    <h2 class="sidebar-title">Поиск снимков</h2>
    <vuescroll :ops="ops">
      <div class="search-wrapper">
        <div class="search-content">
          <search-zone></search-zone>
          <search-date></search-date>
          <search-cloud></search-cloud>
          <search-spacecraft></search-spacecraft>
        </div>
        <div class="search-buttons">
          <button class="button button-white">Очистить</button>
          <button class="button button-g" @click="search">Запросить данные</button>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import {mapActions} from "vuex"

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
    ...mapActions('search', ['search'])
  },
  data() {
    return {
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,
          wheelScrollDuration: 500,
        },
        scrollPanel: {
          scrollingX: false,
          speed: 300,
          easing: "easeOutQuad",
        },
        rail: {
          background: "#000",
          opacity: 0.1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#476D70",
        },
      },
    };
  },
};
</script>

<style lang="scss" >
.search {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-title {
    font-size: 20px;
    color: #000;
    font-weight: 400;
    margin-bottom: 16px;
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