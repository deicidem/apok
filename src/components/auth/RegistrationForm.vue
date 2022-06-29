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
          v-model.trim="$v.firstName.$model"
          :class="{
            invalid: !$v.firstName.required && submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Имя</label>

        <img
          svg-inline
          class="input-img"
          :class="
            !$v.firstName.required && submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/login-icon.svg"
        />

        <div
          v-if="!$v.firstName.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.lastName.$model"
          :class="{
            invalid: !$v.lastName.required && submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Фамилия</label>

        <img
          svg-inline
          class="input-img"
          :class="
            !$v.lastName.required && submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/login-icon.svg"
        />

        <div
          v-if="!$v.lastName.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.mail.$model"
          :class="{
            invalid:
              (!$v.mail.email || !$v.mail.required) && submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Почтовый адрес</label>

        <img
          svg-inline
          class="input-img"
          :class="
            (!$v.mail.email || !$v.mail.required) && submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/mail.svg"
        />
        <div
          v-if="!$v.mail.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>
        <div
          v-if="!$v.mail.email && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите корректный почтовый адрес</p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.password.password.$model"
          :class="{
            invalid:
              (!$v.password.password.minLength ||
                !$v.password.password.required) &&
              submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Пароль</label>

        <img
          svg-inline
          class="input-img"
          :class="
            (!$v.password.password.minLength ||
              !$v.password.password.required) &&
            submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/lock-icon.svg"
        />

        <div
          v-if="!$v.password.password.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>

        <div
          v-if="!$v.password.password.minLength && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>
            Пароль должен содержать более
            {{ $v.password.password.$params.minLength.min }} символов
          </p>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.password.confirm.$model"
          :class="{
            invalid:
              !$v.password.confirm.sameAsPassword && submitStatus === 'ERROR',
          }"
        />
        <label class="input-label">Повторите пароль</label>

        <img
          svg-inline
          class="input-img"
          :class="
            !$v.password.confirm.sameAsPassword && submitStatus === 'ERROR'
              ? 'invalidIcon'
              : 'input-img'
          "
          src="@/assets/img/form-icons/lock-icon.svg"
        />

        <div
          v-if="!$v.password.confirm.sameAsPassword && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Пароли не совпадают</p>
        </div>
      </div>

      <button
        type="submit"
        :disabled="submitStatus === 'PENDING'"
        class="button button-g form-wrapper__item"
      >
        Зарегистироваться
      </button>

      <router-link to="/login">
        <button class="button button-white form-wrapper__item">Войти</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      mail: "",
      password: {
        password: "",
        confirm: "",
      },
      submitStatus: null,
    };
  },
  validations() {
    return {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      mail: {
        required,
        email,
      },
      password: {
        password: {
          required,
          minLength: minLength(8),
        },
        confirm: {
          sameAsPassword: sameAs("password"),
        },
      },
    };
  },
  methods: {
    ...mapActions("users", {
      addUser: "addUser",
      regUser: "regUser",
    }),

    async submitForm() {
      if (!this.$v.$invalid) {
        await this.regUser({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.mail,
          password: this.password,
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