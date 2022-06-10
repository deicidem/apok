<template>
  <div class="auth-popup" v-on-clickaway="away">
    <div class="auth-popup__title">Авторизация</div>

    <form @submit.prevent="submitForm()" method="POST">
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
          class="input-img"
          alt="Логин"
          :class="{
            invalidIcon: v$.login.$error,
            'input-img': !v$.login.$error,
          }"
          src="@/assets/img/login-icon.svg"
        />
        <div v-if="v$.login.$error" class="error-tooltip">
          <p>{{ v$.login.$errors[0].$message }}</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="password"
          :class="{ invalid: v$.password.$error }"
        />
        <label class="input-label">Пароль</label>

        <img
          svg-inline
          alt="Пароль"
          class="input-img"
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

      <button class="button button-g auth-button" >
        Войти
      </button>

      <router-link to="/registration">
        <button class="button button-white auth-button">Регистрация</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  mixins: [clickaway],
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
    away() {
      this.$emit("close");
    },
    submitForm() {
      this.v$.$validate();
        if (!this.v$.$error) {
          this.authorize({email: this.login, password: this.password})
        } else {
          return;
        }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  &-popup {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 30px;
    width: 400px;

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
    &__title {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
      color: #000;
    }
  }
  &-input {
    margin-top: 20px;
  }
  &-button {
    margin: 10px auto;
    height: 40px;
    width: 300px;
    font-size: 16px;
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
  &:focus-visible {
    border: 1px solid $color-red;
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
    left: -240px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 2s ease-out;

    display: flex;
    align-items: center;

    height: 49px;
    width: 240px;
    background: linear-gradient(
      to right,
      rgb(235, 96, 96, 0.8),
      rgb(141, 70, 70, 0.8)
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