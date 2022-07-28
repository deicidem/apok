<template>
  <form-base >
    <div class="c-title">Восстановление пароля</div>

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

      <app-button
        type="button-g"
        size="big"
        class="c-form__item"
        :disabled="pending"
        @click="submitForm"
      >
        Войти
      </app-button>
    </form>
  </form-base>
</template>

<script>

import { required, email } from "vuelidate/lib/validators";
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  props: ['pending'],
  components: {
    AppInput,
    AppButton,
    FormBase,
  },
  data() {
    return {
      login: null,
      submitStatus: null,
    };
  },
  validations: {
    login: {
      required,
      email,
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