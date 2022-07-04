<template>
  <form-base :show-menu="false">
    <form-message
      v-show="showMessage"
      :status="formInvalid ? 'error' : 'valid'"
      :message="message"
    ></form-message>

    <div class="c-title">Авторизация</div>

    <form class="c-form" @submit.prevent="submitForm()">
      <app-input
        class="c-form__input"
        :value="login"
        @input="$v.login.$model = $event"
        :invalid="(!$v.login.minLength || !$v.login.required) && formInvalid"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Логин"
        :error="
          !$v.login.required
            ? 'Введите значение'
            : !$v.login.minLength
            ? 'Логин должен содержать больше 8 символов'
            : null
        "
      ></app-input>

      <app-input
        class="c-form__input"
        :value="password"
        @input="$v.password.$model = $event"
        :invalid="
          (!$v.password.minLength || !$v.password.required) && formInvalid
        "
        icon="icon icon-ic_fluent_lock_closed_20_regular"
        label="Пароль"
        :error="
          !$v.password.required
            ? 'Введите значение'
            : !$v.password.minLength
            ? 'Пароль должен содержать не менее 8 символов'
            : null
        "
      ></app-input>

      <div class="c-remember">
        <app-checkbox
          :model-value="remember"
          @change="remember = $event"
        ></app-checkbox>
        <span class="c-remember__text">Запомнить меня</span>
      </div>

      <button
        class="button button-g c-form__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Войти
      </button>

      <router-link to="/registration" v-slot="{ navigate }">
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
import AppInput from "@/components/controls/AppInput.vue";
import FormMessage from "@/components/auth/FormMessage.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  components: {
    AppCheckbox,
    AppInput,
    FormMessage,
    FormBase,
  },
  data() {
    return {
      login: null,
      password: null,
      remember: false,
      submitStatus: null,
      showMessage: false,
      message: null,
    };
  },
  validations: {
    login: {
      required,
      minLength: minLength(8),
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  computed: {
    formInvalid() {
      return this.submitStatus === "FORM_INVALID";
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
        this.submitStatus = "FORM_INVALID";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>