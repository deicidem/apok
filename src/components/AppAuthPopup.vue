<template>
  <div class="auth-popup" v-on-clickaway="away">
    <div class="auth-popup__title">Авторизация</div>
          <div class="input-wrapper">
            <input class="input input-withIcon" v-model="user.login" required />
            <label class="input-label">Логин</label>

            <img class="input-img" src="@/assets/img/header-logo.svg" />
          </div>

          <div class="input-wrapper">
            <input
              class="input input-withIcon"
              v-model="user.password"
              required
            />
            <label class="input-label">Пароль</label>

            <img class="input-img" src="@/assets/img/lock-icon.svg" />
          </div>
    <router-link to="/login">
      <button class="button button-g auth-button">Войти</button>
    </router-link>

    <router-link to="/registration">
      <button class="button button-g auth-button">Зарегистрироваться</button>
    </router-link>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  data() {
    return {
      user: {
        login: "",
        password: ""
      }
    }
  },
  methods: {
    away() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  &-popup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    
    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
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