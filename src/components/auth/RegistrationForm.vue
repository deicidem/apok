<template>
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
          v-model.trim="firstName"
          :class="{ invalid: v$.firstName.$error }"
        />
        <label class="input-label">Имя</label>

        <img
          svg-inline
          class="input-img"
          :class="{
            invalidIcon: v$.firstName.$error,
            'input-img': !v$.firstName.$error,
          }"
          src="@/assets/img/login-icon.svg"
        />
        <div v-if="v$.firstName.$error" class="error-tooltip">
          <p>{{ v$.firstName.$errors[0].$message }}</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="lastName"
          :class="{ invalid: v$.lastName.$error }"
        />
        <label class="input-label">Фамилия</label>

        <img
          svg-inline
          class="input-img"
          :class="{
            invalidIcon: v$.lastName.$error,
            'input-img': !v$.lastName.$error,
          }"
          src="@/assets/img/login-icon.svg"
        />
        <div v-if="v$.lastName.$error" class="error-tooltip">
          <p>{{ v$.lastName.$errors[0].$message }}</p>
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
          :class="{
            invalidIcon: v$.mail.$error,
            'input-img': !v$.mail.$error,
          }"
          src="@/assets/img/mail.svg"
        />
        <div v-if="v$.mail.$error" class="error-tooltip">
          <p>{{ v$.mail.$errors[0].$message }}</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="password.password"
          :class="{ invalid: v$.password.password.$error }"
        />
        <label class="input-label">Пароль</label>

        <img
          svg-inline
          class="input-img"
          :class="{
            invalidIcon: v$.password.password.$error,
            'input-img': !v$.password.password.$error,
          }"
          src="@/assets/img/lock-icon.svg"
        />
        <div v-if="v$.password.password.$error" class="error-tooltip">
          <p>{{ v$.password.password.$errors[0].$message }}</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="password.confirm"
          :class="{ invalid: v$.password.confirm.$error }"
        />
        <label class="input-label">Повторите пароль</label>

        <img
          svg-inline
          class="input-img"
          :class="{
            invalidIcon: v$.password.confirm.$error,
            'input-img': !v$.password.confirm.$error,
          }"
          src="@/assets/img/lock-icon.svg"
        />
        <div v-if="v$.password.confirm.$error" class="error-tooltip">
          <p>{{ v$.password.confirm.$errors[0].$message }}</p>
        </div>
      </div>

      <button type="submit" class="button button-g form-wrapper__item">
        Зарегистироваться
      </button>

      <router-link to="/login">
        <button class="button button-white form-wrapper__item">
          Авторизоваться
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  email,
  minLength,
  sameAs,
} from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      firstName: "",
      lastName: "",
      mail: "",
      password: {
        password: "",
        confirm: "",
      },
    };
  },
  validations() {
    return {
      firstName: {
        required: helpers.withMessage("Введите значение", required),
        minLength: helpers.withMessage(
          "Логин должен содержать больше 1 символа",
          minLength(1)
        ),
      },

      lastName: {
        required: helpers.withMessage("Введите значение", required),
        minLength: helpers.withMessage(
          "Логин должен содержать больше 1 символа",
          minLength(1)
        ),
      },

      mail: {
        required: helpers.withMessage("Введите значение", required),
        email: helpers.withMessage("Некорректно введен почтовый адрес", email),
      },

      password: {
        password: {
          required: helpers.withMessage("Введите значение", required),
          minLength: helpers.withMessage(
            "Пароль должен содержать больше 8 символов",
            minLength(8)
          ),
        },
        confirm: {
          required: helpers.withMessage("Введите значение", required),
          sameAs: helpers.withMessage(
            "Пароли не совпадают",
            sameAs(this.password.password)
          ),
        },
      },
    };
  },
  methods: {
    ...mapActions("users", {
      addUser: "addUser",
      regUser: "regUser",
    }),

    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Form successfully submitted");
        this.regUser({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.mail,
          password: this.password,
        });
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 20% auto;
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

    color: $black;
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
    right: -250px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 2s ease-out;

    display: flex;
    align-items: center;

    height: 49px;
    width: 250px;
    background: linear-gradient(
      to right,
      rgb(235, 96, 96, 0.7),
      rgb(141, 70, 70, 0.7)
    );
    color: $white;
    font-size: 14px;
    border-radius: 10px;
    p {
      text-align: left;
      margin-left: 8px;
    }
  }
}
</style>