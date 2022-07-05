<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Выбор зоны интереса</h2>
    </template>
    <template v-slot:content>
      <div class="search-wrapper">
        <div class="search-content">
          <search-area></search-area>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import { mapActions } from "vuex";

import SearchArea from "@/components/search/SearchArea";
import SidebarBase from "@/components/SidebarBase.vue";
export default {
  components: {
    SearchArea,
    SidebarBase,
  },
  data: () => ({
    loaded: false,
  }),
  mounted() {
    this.loaded = true;
  },
  methods: {
    ...mapActions("search", ["search"]),
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