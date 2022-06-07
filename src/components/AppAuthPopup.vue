<template>
  <div class="auth-popup" v-on-clickaway="away">
    <div class="auth-popup__title">Авторизация</div>
    <form @submit.prevent="submitForm()" method="POST">
      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="state.login"
          :class="{ invalid: v$.login.$error }"
        />
        <label class="input-label">Логин</label>

        <img svg-inline class="input-img" src="@/assets/img/login-icon.svg" />
        <div v-if="v$.login.$error" class="error-tooltip">
          <p>{{ v$.login.$errors[0].$message }}</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="state.password"
          :class="{ invalid: v$.password.$error }"
        />
        <label class="input-label">Пароль</label>

        <img svg-inline class="input-img" src="@/assets/img/lock-icon.svg" />
        <div v-if="v$.password.$error" class="error-tooltip">
          <p>{{ v$.password.$errors[0].$message }}</p>
        </div>
      </div>

      <button class="button button-g auth-button" @click="submitForm()">
        Войти
      </button>

      <router-link to="/registration">
        <button class="button button-white auth-button">Регистрация</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { reactive } from "@vue/composition-api";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  mixins: [clickaway],
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
    };
  },
  setup() {
    const state = reactive({
      login: "",
      password: "",
    });
    const rules = {
      login: {
        required: helpers.withMessage("Введите значение", required),
      },
      password: {
        required: helpers.withMessage("Введите значение", required),
      },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    away() {
      this.$emit("close");
    },
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Form successfully submitted");
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
      rgb(235, 96, 96, 0.6),
      rgb(141, 70, 70, 0.6)
    );
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    p {
      margin-left: 8px;
      text-align: right;
    }
  }
}
</style>