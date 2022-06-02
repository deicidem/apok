<template>
  <div class="plan" v-if="plan != null">
    <vuescroll :ops="ops">
      <div class="plan-wrapper__header">
        <router-link to="/main/plan">
          <div class="back">
            <div class="back-arrow">
              <img src="@/assets/img/arrow.svg" />
            </div>
            <p class="back-subtitle">Назад</p>
          </div>
        </router-link>

        <h2 class="plan-title">
          Подготовка к запуску задачи 452: {{ plan.title }}
        </h2>

        <button class="button button-g plan-wrapper__button">
          Запланировать задачу
        </button>
      </div>

      <div class="plan-wrapper">
        <div class="plan-wrapper__cards">
          <div class="plan-wrapper__card">
            <div class="plan-wrapper__title">Описание</div>
            <p class="plan-wrapper__text">
              {{ plan.description }}
            </p>
          </div>
          <div class="plan-wrapper__card">
            <div class="plan-wrapper__title">Требования к данным</div>
            <div class="plan-table">
                <div class="plan-table__item" v-for="(req, i) in plan.requirements" :key="i">
                <!-- <div class="plan-table__img">
                  <img src="@/assets/img/plan__data.svg" />
                </div> -->
                <p class="plan-table__subtitle">{{req.title}}:</p>
                <p class="plan-table__text">
                  {{ req.description }}
                </p>
              </div>
              
              <!-- <div class="plan-table__line"></div>
              <div class="plan-table__item">
                <div class="plan-table__img">
                  <img src="@/assets/img/plan__season.svg" />
                </div>
                <p class="plan-table__subtitle">Сезон съемки:</p>
                <p class="plan-table__text">{{ plan.requirements.time }}</p>
              </div>
              <div class="plan-table__line"></div>
              <div class="plan-table__item">
                <div class="plan-table__img">
                  <img src="@/assets/img/plan__cloud.svg" />
                </div>
                <p class="plan-table__subtitle">Облачность:</p>
                <p class="plan-table__text">
                  {{ plan.requirements.cloudiness }}
                </p>
              </div>
              <div class="plan-table__line"></div> -->
            </div>
          </div>
        </div>

        <div class="plan-wrapper__img">
          <img :src="plan.previewPath" />
        </div>
      </div>
      <div class="plan-wrapper">
        <div class="plan-wrapper__cards">
          <div class="plan-wrapper__card">
            <div class="plan-wrapper__title">Описание</div>
            <p class="plan-wrapper__text">
              {{ plan.description }}
            </p>
          </div>
          <div class="plan-wrapper__card">
            <div class="plan-wrapper__title">Требования к данным</div>
            <div class="plan-table">
                <div class="plan-table__item" v-for="(req, i) in plan.requirements" :key="i">
                <!-- <div class="plan-table__img">
                  <img src="@/assets/img/plan__data.svg" />
                </div> -->
                <p class="plan-table__subtitle">{{req.title}}:</p>
                <p class="plan-table__text">
                  {{ req.description }}
                </p>
              </div>
              
              <!-- <div class="plan-table__line"></div>
              <div class="plan-table__item">
                <div class="plan-table__img">
                  <img src="@/assets/img/plan__season.svg" />
                </div>
                <p class="plan-table__subtitle">Сезон съемки:</p>
                <p class="plan-table__text">{{ plan.requirements.time }}</p>
              </div>
              <div class="plan-table__line"></div>
              <div class="plan-table__item">
                <div class="plan-table__img">
                  <img src="@/assets/img/plan__cloud.svg" />
                </div>
                <p class="plan-table__subtitle">Облачность:</p>
                <p class="plan-table__text">
                  {{ plan.requirements.cloudiness }}
                </p>
              </div>
              <div class="plan-table__line"></div> -->
            </div>
          </div>
        </div>

        <div class="plan-wrapper__img">
          <img :src="plan.previewPath" />
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

export default {
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
          background: "#83B5B8",
        },
      },
    };
  },
  computed: {
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
  height: 900px;
  padding: 40px;

  box-shadow: $shadow-big;
  border-radius: 25px;
  overflow: hidden;
  background: $gradient-w;
  &-title {
    color: #000;
    font-weight: 400;
  }
  &-wrapper {
    display: flex;
    max-width: 1600px;
    margin: 50px auto;
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
      max-width: 65%;
    }
    &__card {
      margin-bottom: 30px;
      padding: 20px;

      box-shadow: $shadow-big;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__title {
      font-size: 1.25rem;
      color: #000;
    }
    &__text {
      margin-top: 20px;
      color: #000;
    }
    &__img {
      border-radius: 15px;
      overflow: hidden;
      box-shadow: $shadow-big;
      margin-left: 30px;
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
img {
  height: 100%;
}
.back {
  display: flex;
  align-items: center;
  cursor: pointer;
  &-arrow {
    width: 40px;
  }
  p {
    margin-left: 10px;
    color: $text-grey;
  }
}

@media screen and (max-width: 1440px) {
  .plan {
    height: 700px;
    &-title{
      font-size: 18px;
    }
    &-wrapper{
      max-width: 1200px;
      &__header{
        max-width: 1200px;
      }
    }
  }
}
</style>