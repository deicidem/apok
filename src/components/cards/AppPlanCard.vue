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
        <router-link :to="'/plan/' + planid">
          <button class="button button-white plan-item__button">Подробнее</button>
        </router-link>

        <button class="button button-g plan-item__button" @click="$emit('openPopup')">Запланировать</button>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    img: String,
    title: String,
    text: String,
    planid: Number,
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
    &__button{
      width: 160px;
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