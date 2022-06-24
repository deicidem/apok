<template>
  <div class="plan" v-if="plan != null">
    <div class="plan-wrapper__header">
      <router-link to="/main/plan">
        <div class="back">
          <div class="back-arrow">
            <img svg-inline src="@/assets/img/arrows/arrow.svg" />
          </div>
          <p class="back-subtitle">Назад</p>
        </div>
      </router-link>

      <h2 class="plan-title">
        {{ plan.title }}
      </h2>

      <button class="button button-g plan-wrapper__button">
        Запланировать задачу
      </button>
    </div>
    <div class="a">
      <vuescroll :ops="scrollOps">
        <div class="plan-wrapper">
          <div class="plan-wrapper__cards">
            <div class="plan-wrapper__card">
              <div class="plan-wrapper__title">Описание</div>
              <div class="plan-wrapper__text" v-html="plan.description"></div>
            </div>
            <div class="plan-wrapper__card">
              <div class="plan-wrapper__title">Требования к данным</div>
              <div class="plan-table">
                <div
                  class="plan-table__item"
                  v-for="(req, i) in plan.requirements"
                  :key="i"
                >
                  <p class="plan-table__subtitle">{{ req.title }}:</p>
                  <p class="plan-table__text">
                    {{ req.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="plan-wrapper__img">
            <img :src="plan.previewPath" />
          </div>
        </div>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import {mapGetters} from "vuex";
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
.plan {
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
  .a {
    padding: 50px 0;
    margin: 0 auto;
    height: 100%;
    max-width: 1700px;
  }
  &-wrapper {
    padding: 10px 50px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    width: 100%;
    &__header {
      display: flex;
      justify-content: space-between;
      margin: 4px auto;
      max-width: 1600px;
    }
    &__button {
      height: auto;
      justify-self: end;

      width: 270px;
      font-size: 1.125rem;
    }
    &__cards {
      display: flex;
      flex-direction: column;
      max-width: 60%;
    }
    &__card {
      margin-bottom: 30px;
      padding: 20px;

      box-shadow: $shadow-big;
      border-radius: 10px;
      overflow: hidden;
      background: $white;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__title {
      font-size: 1.25rem;
      color: $black;
    }
    &__text {
      margin-top: 20px;
      color: $black;
      p {
        margin: 0;
      }
      ul {
        margin: 0;
      }
    }
    &__img {
      background: $white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: $shadow-big;
      margin-left: 30px;
      img {
        object-fit: cover;
        object-position: center;
      }
    }
    .plan-table {
      margin-top: 20px;
      &__item {
        display: flex;
        align-items: center;
        position: relative;
        margin: 6px 0;
      }
      &__line {
        border-top: 1px solid #ebf0f0;
        width: 100%;
      }
      &__img {
        margin-right: 6px;
      }
      &__subtitle {
        margin: 0;
        font-size: 18px;
        color: $color-main;
      }
      &__text {
        position: absolute;
        left: 180px;

        font-size: 14px;

        color: $text-grey;
      }
    }
  }
}
.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-arrow {
    svg path {
      fill: $color-main;
    }
  }
  &-subtitle {
    margin: 0 0 0 10px;
    color: $color-main;
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