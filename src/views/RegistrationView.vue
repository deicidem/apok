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
        <div class="form-title">Регистрация</div>

        <form
          class="form-wrapper"
          id="registration"
          @submit.prevent="submitForm()"
          method="post"
        >
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
            <div v-if="v$.login.$error" class="error-tooltip">
              <p>Введите логин</p>
            </div>
          </div>

          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="mail"
              :class="{ invalid: v$.mail.$error }"
            />
            <label class="input-label">Почтовый адрес</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/mail.svg"
            />
            <div v-if="v$.mail.$error" class="error-tooltip">
              <p>Введите почтовый адрес</p>
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

          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="repeatedPassword"
              :class="{ invalid: v$.repeatedPassword.$error }"
            />
            <label class="input-label">Повторите пароль</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/lock-icon.svg"
            />
            <div v-if="v$.repeatedPassword.$error" class="error-tooltip">
              <p>Введите пароль повторно</p>
            </div>
          </div>

          <button
            type="submit"
            @click="submitForm()"
            class="button button-g form-wrapper__item"
          >
            Зарегистироваться
          </button>

          <router-link to="/login">
            <button class="button button-white form-wrapper__item">
              Авторизоваться
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
import { required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      login: "",
      mail: "",
      password: "",
      repeatedPassword: "",
    };
  },
  setup() {
    const state = reactive({
      login: "",
      mail: "",
      password: "",
      repeatedPassword: "",
    });
    const rules = {
      login: { required },
      mail: { required, email },
      password: { required },
      repeatedPassword: { required },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    ...mapActions("users", {
      addUser: "addUser",
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
}
.back {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 40px;
  &-arrow {
    width: 30px;
  }
  p {
    margin-left: 10px;
    color: #fff;
  }
}

.form {
  margin: 10% auto;
  width: 400px;
  padding: 30px;

  background: $gradient-w;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;
  &-title {
    margin-bottom: 24px;

    text-align: center;
    font-size: 20px;

    color: #000;
  }
  &-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    &__item {
      width: 300px;
      height: 40px;
      margin: 10px auto;

      font-size: 16px;
    }
  }
  &-error {
    &__title {
      color: $color-red;
      font-size: 14px;
    }
    &__text {
      color: $color-red;
      font-size: 14px;
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