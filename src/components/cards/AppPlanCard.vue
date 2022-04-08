<template>
  <div class="plan-item">
    <div class="plan-item__img">
      <img :src="itemImage" />
    </div>

    <div class="plan-item__info">
      <h2>{{ title }}</h2>
      <p>
        {{ text }}
      </p>

      <div class="plan-item__buttons">
        <router-link :to="'/plan/'+planid">
          <app-button type="white-g">Подробнее</app-button>
        </router-link>

        <app-button>Запланировать</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    AppButton,
  },
  props: {
    img: String,
    title: String,
    text: String,
    planid: Number

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
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
    align-items: center;
    background: #fff;
    &__img {
      height: 200px;
      min-width: 200px;
    }
    &__info {
      margin: 10px 20px;
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
      margin-top: 18px;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>