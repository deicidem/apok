<template>
  <div class="plan-item">
    <portal to="popup">
      <app-plan-popup
        v-show="planPopup == true"
        @close="planPopup = false"
      ></app-plan-popup>
    </portal>
    <div class="plan-item__img">
      <img :src="itemImage" />
    </div>

    <div class="plan-item__info">
      <h2>{{ title }}</h2>
      <p>
        {{ text }}
      </p>

      <div class="plan-item__buttons">
        <router-link :to="'/plan/' + planid">
          <button class="button button-white">Подробнее</button>
        </router-link>

        <button class="button button-g" @click="planPopup = true">
          Запланировать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppPlanPopup from "@/components/AppPlanPopup";

export default {
  components: {
    AppPlanPopup,
  },
  props: {
    img: String,
    title: String,
    text: String,
    planid: Number,
  },
  data() {
    return {
      planPopup: false,
    };
  },
  computed: {
    itemImage() {
      const fileName = this.img.toLowerCase();
      return require(`@/assets/img/${fileName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.plan {
  &-item {
    display: flex;
    align-items: stretch;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    &__img {
      img {
        height: 100%;
      }
    }
    &__info {
      padding: 10px 20px 10px 20px;
      h2 {
        font-size: 18px;
        font-weight: 400;

        color: #000;
      }
      p {
        margin-top: 10px;

        font-weight: 400;
        font-size: 14px;
        line-height: 130%;

        color: #616161;
      }
    }
    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 30px;
    }
  }
}

@media screen and (max-width: 1440px) {
  .plan {
    &-item {
      &__info {
        font-size: 1rem;
        line-height: 130%;
        p {
          font-size: 0.75rem;
        }
      }
      &__buttons {
        margin-top: 10px;
      }
      &__img{
        max-width: 160px;
      }
    }
  }
}
</style>