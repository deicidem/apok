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
      </div>
    </vuescroll>
  </div>
</template>

<script>
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

<style lang="scss">
.__vuescroll {
  display: flex;
  flex-direction: column;
}
.__panel {
  width: 100%;
}
.search {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
  &__title {
    font-weight: 400;
    font-size: 1.25rem;
    color: #000;
  }
}
</style>