<template>
  <div class="search">
    <h2 class="sidebar-title">Выбор зоны интереса</h2>
    <vuescroll :ops="scrollOps">
      <div class="search-wrapper">
        <div class="search-content">
          <search-area></search-area>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import SearchArea from "@/components/search/SearchArea";

export default {
  components: {
    vuescroll,
    SearchArea,
  },
  methods: {
    ...mapActions("search", ["search"]),
  },
  computed: {
    ...mapGetters(["scrollOps"]),
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
    color: $black;
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
    color: $black;
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