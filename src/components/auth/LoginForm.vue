<template>
  <div class="form">
    <div class="form-title">Авторизация</div>
    <form class="form-wrapper" @submit.prevent="submitForm()" method="POST">
      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.login.$model"
          :class="{
            invalid:
              (!$v.login.minLength || !$v.login.required) &&
              submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Логин</label>

        <img
          svg-inline
          :class="
            (!$v.login.minLength || !$v.login.required) &&
            submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/login-icon.svg"
          alt="Логин"
        />

        <div
          v-if="!$v.login.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>
        <div
          v-if="!$v.login.minLength && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Логин должен содержать больше 6 символов</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.password.$model"
          :class="{
            invalid:
              (!$v.password.minLength || !$v.password.required) &&
              submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Пароль</label>

        <img
          svg-inline
          :class="
            (!$v.password.minLength || !$v.password.required) &&
            submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/lock-icon.svg"
        />
        <div
          v-if="!$v.password.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>
        <div
          v-if="!$v.password.minLength && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Пароль должен содержать больше 8 символов</p>
        </div>
      </div>

      <div class="remember">
        <app-checkbox
          :model-value="remember"
          @change="remember = $event"
        ></app-checkbox>
        <p class="remember-text">Запомнить меня</p>
      </div>
      <button class="button button-g form-wrapper__item">Войти</button>
      <router-link to="/registration">
        <button
          type="submit"
          :disabled="submitStatus === 'PENDING'"
          class="button button-white form-wrapper__item"
        >
          Зарегистироваться
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";

export default {
  components: { AppCheckbox },
  data() {
    return {
      login: "",
      password: "",
      remember: false,
      submitStatus: null,
    };
  },
  validations: {
    login: {
      required,
      minLength: minLength(6),
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    ...mapActions("users", {
      authorize: "authorizeUser",
    }),
    async submitForm() {
      if (!this.$v.$invalid) {
        await this.authorize({
          email: this.login,
          password: this.password,
          remember: this.remember,
        });
        this.$router.push("main");
        this.submitStatus = "PENDING";
      } else {
        this.submitStatus = "ERROR";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

  background: url("@/assets/img/background/apok.png");
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
      color: $black;
      margin-bottom: 20px;
    }
    &-wrapper {
      &__item {
        width: 300px;
        height: 40px;
        margin: 10px auto;
        font-size: 16px;
        background: $white;
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
    color: $white;
    font-size: 14px;
    border-radius: 10px;
    p {
      margin-left: 8px;
    }
  }
}
</style>