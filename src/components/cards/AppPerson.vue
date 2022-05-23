<template>
  <div class="person">
    <div class="person-title">Основная информация</div>
    <div class="person-wrapper">
      <div class="person-wrapper__text">
        <div class="person-wrapper__titles">
          <p class="person-wrapper__title">Имя</p>
          <p class="person-wrapper__title">Фамилия</p>
          <p class="person-wrapper__title">Почта</p>
        </div>
        <div class="person-wrapper__information">
          <p class="person-wrapper__info">Анна</p>
          <p class="person-wrapper__info">Афанасьева</p>
          <p class="person-wrapper__info">Ann@gmail.com</p>
        </div>
      </div>
      <div class="person-wrapper__buttons">
        <button class="button button-white person-wrapper__button">Редактировать</button>

        <button class="button button-g person-wrapper__button">Поменять пароль</button>
      </div>
    </div>
    <app-password-popup></app-password-popup>
  </div>
</template>

<script>
import AppPasswordPopup from "@/components/cards/AppPasswordPopup.vue";

export default {
  components: {
    AppPasswordPopup
  },
};
</script>


<style scoped lang="scss">
.person {
  padding: 20px;

  border-radius: 10px;
  background: #fff;
  box-shadow: $shadow-big;
  &-title {
    font-weight: 400;
    font-size: 1.25rem;
    color: #000;
    margin-bottom: 20px;
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    &__text {
      display: flex;
    }
    &__title {
      color: $color-main;
      margin-bottom: 14px;
      font-size: 14px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__information {
      margin-left: 40px;
    }
    &__info {
      color: #000;
      margin-bottom: 14px;
      font-size: 14px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__button{
        width: 220px;
    }
  }
}
</style>