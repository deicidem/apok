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

        <form class="form-wrapper" @submit.prevent="submitForm()">
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
              src="@/assets/img/login-icon.svg"
            />
            <div v-if="v$.password.$error" class="error-tooltip">
              <p>Введите логин</p>
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
              class="input-img"
              src="@/assets/img/lock-icon.svg"
            />
            <div v-if="v$.password.$error" class="error-tooltip">
              <p>Введите пароль</p>
            </div>
          </div>

          <!-- <router-link to="/main"> -->
          <button
            class="button button-g form-wrapper__item"
            @click="submitForm()"
          >
            Войти
          </button>
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
import { reactive } from "@vue/composition-api";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  setup() {
    const state = reactive({
      login: "",
      password: "",
    });
    const rules = {
      login: { required },
      password: { required },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    ...mapActions("users", {
      authorize: "authorizeUser",
    }),
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return;
      // actually submit form
    },
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
    cursor: pointer;
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