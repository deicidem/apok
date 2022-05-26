<template>
  <section class="authorize">
    <div class="container">
      <div class="back">
        <div class="back-arrow">
          <img src="@/assets/img/arrow-w.svg" />
        </div>
        <p class="back-subtitle">Назад</p>
      </div>

      <div class="form">
        <div class="form-title">Авторизация</div>

        <form class="form-wrapper">
          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model="user.login"
              required
            />
            <label class="input-label">Логин</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/login-icon.svg"
            />
          </div>

          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model="user.password"
              required
            />
            <label class="input-label">Пароль</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/lock-icon.svg"
            />
          </div>

          <router-link to="/main">
            <button class="button button-g form-wrapper__item">Войти</button>
          </router-link>
          <router-link to="/registration">
            <button class="button button-white form-wrapper__item">
              Регистрация
            </button>
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("users", {
      authorize: "authorizeUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
.authorize {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;

  background: url("@/assets/img/authorize__background.png");
  background-size: cover;
  .button-router {
    margin: 0 auto;
  }
  .back {
    margin: 40px;
    display: flex;
    align-items: center;
    &-arrow {
      width: 30px;
    }
    p {
      margin-left: 10px;
      color: #fff;
    }
  }
  .form {
    background: $gradient-w;
    margin: 30px 0 0 0;
    width: 400px;
    padding: 30px;
    border-radius: 10px;
    border: none;
    box-shadow: $shadow-big;
    margin: 16% auto;
    &-title {
      text-align: center;
      font-size: 20px;
      color: #000;
      margin-bottom: 20px;
    }
    &-wrapper {
      &__item {
        width: 300px;
        height: 40px;
        margin: 10px auto;
        font-size: 16px;
      }
    }
  }
}
</style>