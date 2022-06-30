<template>
<sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Поиск снимков</h2>
      <router-link to="/main/results" custom v-slot="{ navigate }">
        <div class="search-result" @click="navigate">
          <span class="search-result__subtitle">Результат</span>
          <div class="search-result__arrow">
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
      </router-link>
    </template>
    <template v-slot:content>
      <div class="search-wrapper">
        <div class="search-content">
          <search-area></search-area>
          <search-date></search-date>
          <search-cloud></search-cloud>
          <search-satelite></search-satelite>
        </div>
        <div class="search-buttons">
          <button class="button button-r" @click="clearData">Очистить</button>
          <button class="button button-g" @click="onSearch">
            Запросить данные
          </button>
        </div>
      </div>
    </template>
  </sidebar-base>

</template>

<script>
import { mapGetters, mapActions } from "vuex";

import "vuescroll/dist/vuescroll.css";
import "vue-slider-component/theme/default.css";
import SearchDate from "@/components/search/SearchDate.vue";
import SearchSatelite from "@/components/search/SearchSatelite.vue";
import SearchCloud from "@/components/search/SearchCloud.vue";
import SearchArea from "@/components/search/SearchArea.vue";
import SidebarBase from "@/components/SidebarBase.vue";
export default {
  components: {
    SearchDate,
    SearchSatelite,
    SearchCloud,
    SearchArea,
    SidebarBase,
  },
  methods: {
    ...mapActions("search", ["search", "clearData"]),
    async onSearch() {
      await this.search();
      this.$router.push("results");
    },
  },
  mounted() {
    this.loaded = true;
  },
  computed: {
    ...mapGetters(["scrollOps"]),
  },
  data() {
    return {
      loaded: false
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
    top: 50%;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
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