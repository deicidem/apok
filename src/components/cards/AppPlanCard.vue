<template>
  <div class="plan-item">
    <portal to="popup">
      <app-plan-popup v-show="planPopup == true"></app-plan-popup>
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
          <app-button type="white-g">Подробнее</app-button>
        </router-link>

        <app-button @click="planPopup = true">Запланировать</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
import AppPlanPopup from "@/components/AppPlanPopup";

export default {
  components: {
    AppButton,
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
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
    align-items: stretch;
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
        color: #616161;
        line-height: 130%;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
</style>