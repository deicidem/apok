<template>
  <form-base>
    <form-message
      v-show="showMessage"
      :status="submitStatus == 'ERROR' ? 'error' : 'valid'"
      :message="message"
    ></form-message>

    <div class="c-title">Авторизация</div>

    <form class="c-forim" @submit.prevent="submitForm()">
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
          <p>Пароль должен содержать больше 6 символов</p>
        </div>
      </div>

      <div class="remember">
        <app-checkbox
          :model-value="remember"
          @change="remember = $event"
        ></app-checkbox>
        <span class="remember-text">Запомнить меня</span>
      </div>

      <button
        class="button button-g c-form__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Войти
      </button>

      <router-link to="/registration" v-slot="{navigate}">
        <button
          @click="navigate"
          :disabled="submitStatus === 'PENDING'"
          class="button button-white c-form__item"
        >
          Зарегистироваться
        </button>
      </router-link>
    </form>
  </form-base>
</template>

<script>
import { mapActions } from "vuex";

import { required, minLength } from "vuelidate/lib/validators";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import FormMessage from "@/components/auth/FormMessage.vue";
import FormBase from "@/components/auth/FormBase.vue";
import { validationMixin } from "vuelidate";

export default {
  components: {
    AppCheckbox,
    FormMessage,
    FormBase,
  },
  data() {
    return {
      login: "",
      password: "",
      remember: false,
      submitStatus: null,
      showMessage: false,
      message: "",
    };
  },
  mixins: [validationMixin],
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
      this.showMessage = false;

      if (!this.$v.$invalid) {
        this.submitStatus = "PENDING";

        try {
          await this.authorize({
            email: this.login,
            password: this.password,
            remember: this.remember,
          });

          this.submitStatus = "SUBMIT";
          this.message =
            "Вы успешно авторизованы. Сейчас вы будете перенаправлены на главную страницу.";

          setTimeout(() => {
            this.$router.push("main");
          }, 1500);
        } catch (error) {
          if (error?.response?.status == 422) {
            this.message =
              "Учетная запись  с указанными логином и паролем не существует";
          } else {
            this.message =
              "При авторизации произошла ошибка, повторите попытку позже";
          }

          this.submitStatus = "ERROR";
        }

        this.showMessage = true;
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