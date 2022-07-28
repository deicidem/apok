<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Поиск снимков</h2>

      <router-link to="/main/results" custom v-slot="{ navigate }">
        <div class="back search-result" @click="navigate">
          <span class="back-subtitle-w">Результат</span>
          <div class="back-arrow-w">
            <i class="icon icon-ic_fluent_arrow_right_20_regular"></i>
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
          <app-button class="search-button" type="button-r" @click="clearData"> Очистить </app-button>
          <app-button class="search-button" type="button-g" @click="onSearch">
            Начать поиск
          </app-button>
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
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    SearchDate,
    SearchSatelite,
    SearchCloud,
    SearchArea,
    SidebarBase,
    AppButton,
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
      loaded: false,
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
    transform: translateY(-50%);
    cursor: pointer;
    .back-arrow-w {
      margin-left: 10px;
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
    justify-content: center;
  }
  &-button {
    margin-right: 20px;
    &::last-child {
      margin-right: 0;
    }
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