<template>
  <div class="fullscreen">
    <div class="fullscreen-header">
      <router-link to="/main/tasks">
        <div class="back">
          <div class="back-arrow">
            <i class="fa-solid fa-angles-left"></i>
          </div>
          <p class="back-subtitle">Назад</p>
        </div>
      </router-link>

      <h2 class="fullscreen-title">
        {{ $route.query.title }}
      </h2>

      <a
        :href="$route.query.downloadPath"
        target="_blank"
        download
        class="button button-g fullscreen-button"
      >
        Скачать
      </a>
    </div>
    <div class="fullscreen-content">
      <vuescroll :ops="scrollOps">
        <div class="image-wrapper">
          <img
            :src="$route.query.path"
            :alt="$route.query.title"
            class="image"
          />
        </div>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import { mapGetters } from "vuex";
export default {
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
  components: {
    vuescroll,
  },
};
</script>

<style lang="scss" scoped>
.fullscreen {
  position: relative;
  height: 100%;
  max-height: 100%;
  padding: 40px;
  box-shadow: $shadow-big;
  border-radius: 25px;
  overflow: hidden;
  background: $gradient-w;
  &-title {
    margin: 0;
    color: $black;
    font-weight: 400;
  }
  &-content {
    padding: 50px 0;
    margin: 0 auto;
    height: 100%;
    max-width: 1700px;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    margin: 4px auto;
    max-width: 1600px;
  }
  &-button {
    height: auto;
    width: 270px;
    font-size: 1.125rem;
  }
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
  .back {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &-arrow {
      color: $color-main;
      font-size: 20px;
    }
    &-subtitle {
      margin: 0 0 0 10px;
      color: $color-main;
    }
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