<template>
  <div class="plan-item">
    <div class="plan-item__img">
      <img :src="img" />
    </div>

    <div class="plan-item__info">
      <h2>{{ title }}</h2>
      <p>
        {{ text }}
      </p>

      <div class="plan-item__buttons">
        <router-link :to="'/plan/' + planid" custom v-slot="{ navigate }">
          <app-button
            type="button-white-gr"
            @click="navigate"
            class="plan-item__button"
          >
            Подробнее
          </app-button>
        </router-link>

        <app-button
          type="button-g"
          :disabled="!isAuth"
          class="plan-item__button"
          @click="$emit('select')"
        >
          Запланировать
        </app-button>
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
    planid: Number,
    isAuth: Boolean,
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
    background: $white;

    &__img {
      img {
        min-height: 200px;
        height: 100%;
        width: 200px;
        object-position: center;
        object-fit: cover;
      }
    }

    &__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px 20px 15px 20px;

      h2 {
        margin: 0;
        line-height: 1.5;
        font-size: 18px;
        font-weight: 500;

        color: $black;
      }

      p {
        margin: 0;
        line-height: 1.5;
        flex: 1 1 auto;
        margin-top: 10px;

        font-weight: 400;
        font-size: 14px;
        line-height: 130%;

        color: #333;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
    }

    &__button {
      margin-right: 20px;
      flex: 1 1 auto;

      &:last-child {
        margin-right: 0;
      }
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

      &__img {
        max-width: 160px;
      }
    }
  }
}
</style>