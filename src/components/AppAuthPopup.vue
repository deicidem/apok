<template>
  <div class="auth-popup">
    <div class="auth-popup__title">Авторизация</div>
    <app-input class="auth-input" label="Логин"></app-input>
    <app-input class="auth-input" label="Пароль"></app-input>
    <router-link to="/login">
      <button class="button button-g auth-button">Войти</button>
    </router-link>

    <router-link to="/registration">
      <button class="button button-g auth-button">Зарегистрироваться</button>
    </router-link>
  </div>
</template>

<script>
// import AppButton from "@/components/controls/AppButton.vue";
import AppInput from "@/components/controls/AppInput.vue";
export default {
  components: {
    // AppButton,
    AppInput,
  },
};
</script>



<style lang="scss" scoped>
.auth {
  &-popup {
    padding: 30px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__title {
      text-align: center;
      font-size: 20px;
      color: $text-grey;
    }
  }
  &-input {
    margin-top: 20px;
  }
  &-button {
    margin-top: 20px;
    height: 40px;
    width: 100%;
  }
}
</style>