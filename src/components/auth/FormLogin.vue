<template>
  <form-base >
    <div class="c-title">Авторизация</div>

    <form class="c-form" @submit.prevent>
      <app-input
        class="c-form__input"
        :value="login"
        @input="$v.login.$model = $event"
        :invalid="(!$v.login.email || !$v.login.required) && formInvalid"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Электронная почта"
        :error="
          !$v.login.required
            ? 'Введите значение'
            : !$v.login.email
            ? 'Введите корректный почтовый адрес'
            : null
        "
      ></app-input>

      <app-input
        class="c-form__input"
        :value="password"
        type="password"
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

      <app-button
        type="button-g"
        class="c-form__item"
        :disabled="pending"
        @click="submitForm"
      >
        Войти
      </app-button>

      <router-link to="/registration" custom v-slot="{ navigate }">
        <app-button
          type="button-white"
          class="c-form__item"
          @click="navigate"
          :disabled="pending"
        >
          Зарегистироваться
        </app-button>
      </router-link>
    </form>
  </form-base>
</template>

<script>

import { required, minLength,email } from "vuelidate/lib/validators";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  props: ['pending'],
  components: {
    AppCheckbox,
    AppInput,
    AppButton,
    FormBase,
  },
  data() {
    return {
      login: null,
      password: null,
      remember: false,
      submitStatus: null,
    };
  },
  validations: {
    login: {
      required,
      email,
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
    submitForm() {
      if (!this.$v.$invalid) {
        this.submitStatus = "SUBMIT";
        this.$emit('submit', {
            email: this.login,
            password: this.password,
            remember: this.remember,
          });
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