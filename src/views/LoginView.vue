<template>
  <section class="authorize">
    <div class="container">
      <div class="back">
        <div class="back-arrow">
          <img svg-inline src="@/assets/img/arrow-w.svg" alt="Назад" />
        </div>
        <p class="back-subtitle">Назад</p>
      </div>

      <div class="form">
        <div class="form-title">Авторизация</div>

        <form class="form-wrapper" @submit.prevent="submitForm()" method="POST">
          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="login"
              :class="{ invalid: v$.login.$error }"
            />
            <label class="input-label">Логин</label>

            <img
              svg-inline
              :class="{
                invalidIcon: v$.login.$error,
                'input-img': !v$.login.$error,
              }"
              src="@/assets/img/login-icon.svg"
              alt="Логин"
            />
            <div v-if="v$.login.$error" class="error-tooltip">
              <p>{{ v$.login.$errors[0].$message }}</p>
            </div>
          </div>

          <div class="input-wrapper">
            <input
              placeholder=" "
              type="password"
              class="input input-withIcon"
              v-model.trim="password"
              :class="{ invalid: v$.password.$error }"
            />
            <label class="input-label">Пароль</label>

            <img
              svg-inline
              :class="{
                invalidIcon: v$.password.$error,
                'input-img': !v$.password.$error,
              }"
              src="@/assets/img/lock-icon.svg"
            />
            <div v-if="v$.password.$error" class="error-tooltip">
              <p>{{ v$.password.$errors[0].$message }}</p>
            </div>
          </div>

          <div class="remember">
            <app-checkbox></app-checkbox>
            <p class="remember-text">Запомнить меня</p>
          </div>
          <!-- <router-link to="/main"> -->
          <button class="button button-g form-wrapper__item">Войти</button>
          <!-- </router-link> -->
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

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import AppCheckbox from "../components/controls/AppCheckbox.vue";

export default {
  components: { AppCheckbox },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      login: "",
      password: "",
    };
  },
  validations() {
    return {
      login: {
        required: helpers.withMessage("Введите значение", required),
      },
      password: {
        required: helpers.withMessage("Введите значение", required),
      },
    };
  },
  methods: {
    ...mapActions("users", {
      authorize: "authorizeUser",
    }),
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.authorize({ email: this.login, password: this.password });
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-arrow {
    svg path {
      fill: $color-main;
    }
  }
  &-subtitle {
    margin: 0 0 0 10px;
    color: $color-main;
  }
}
.remember {
  display: flex;
  margin: 0 auto;
  width: 300px;
  &-text {
    margin-left: 10px;
    color: $text-grey;
    font-size: 14px;
  }
}
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
.invalid {
  border: 1px solid $color-red;
  transition: all 1s ease-out;
  color: $color-red;
  &:focus ~ .input-label,
  &:not(:placeholder-shown) ~ label {
    color: $color-red;
  }
  &:focus ~ .invalidIcon {
    path {
      fill: $color-red;
    }
  }
}
.invalidIcon {
  position: absolute;
  max-width: 26px;
  right: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  path {
    fill: $color-red;
  }
}
.error {
  &-tooltip {
    position: absolute;
    right: -240px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 2s ease-out;

    display: flex;
    align-items: center;

    height: 49px;
    width: 240px;
    background: linear-gradient(
      to right,
      rgb(235, 96, 96, 0.6),
      rgb(141, 70, 70, 0.6)
    );
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    p {
      margin-left: 8px;
    }
  }
}

</style>