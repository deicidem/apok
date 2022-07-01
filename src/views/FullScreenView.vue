<template>
  <page-base>
    <template v-slot:header>
      <router-link to="/main/tasks" custom v-slot="{ navigate }">
        <div class="back" @click="navigate">
          <div class="back-arrow">
            <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
          </div>
          <span class="back-subtitle">Назад</span>
        </div>
      </router-link>

      <h2 class="page-title">
        {{ $route.query.title }}
      </h2>

      <a
        :href="$route.query.downloadPath"
        target="_blank"
        download
        class="button button-g page-button"
      >
        Скачать
      </a>
    </template>
    <template v-slot:content>
      <img :src="$route.query.path" :alt="$route.query.title" class="image" />
    </template>
  </page-base>
</template>

<script>
import PageBase from "@/components/PageBase.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PageBase,
  },
  computed: {
    ...mapGetters(["scrollOps"]),
    id() {
      return +this.$route.params.id;
    },
    plan() {
      return this.$store.getters["plans/plan"](this.id);
    },
    itemImage() {
      const fileName = this.plan.image.toLowerCase();
      return require(`@/assets/img/${fileName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  padding: 20px;
  width: auto;
  max-width: 100%;
  background: $white;
  border-radius: 10px;
  box-shadow: $shadow-big;

  &-wrapper {
    padding: 10px 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

@media screen and (max-width: 1440px) {
  .plan {
    height: 700px;
    &-title {
      font-size: 18px;
    }

    &-wrapper {
      max-width: 1200px;

      &__header {
        max-width: 1200px;
      }
    }
  }
}
</style>