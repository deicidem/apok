<template>
  <form-base>
    <div class="c-title">Восстановление пароля</div>

    <form class="c-form" @submit.prevent>
      <app-input
        class="c-form__input"
        :value="password.password"
        type="password"
        @input="$v.password.password.$model = $event"
        :invalid="
          (!$v.password.password.minLength || !$v.password.password.required) &&
          formInvalid
        "
        icon="icon icon-ic_fluent_lock_closed_20_regular"
        label="Пароль"
        :error="
          !$v.password.password.required
            ? 'Введите значение'
            : !$v.password.password.minLength
            ? 'Пароль должен содержать не меньше 8 символов'
            : null
        "
      ></app-input>

      <app-input
        class="c-form__input"
        :value="password.confirm"
        type="password"
        @input="$v.password.confirm.$model = $event"
        :invalid="
          (!$v.password.confirm.sameAsPassword ||
            !$v.password.confirm.required) &&
          formInvalid
        "
        icon="icon icon-ic_fluent_lock_closed_20_regular"
        label="Повторите пароль"
        :error="
          !$v.password.confirm.required
            ? 'Введите значение'
            : !$v.password.confirm.sameAsPassword
            ? 'Пароли не совпадают'
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  props: ["pending"],
  components: {
    AppInput,
    AppButton,
    FormBase,
  },
  data() {
    return {
      password: {
        password: null,
        confirm: null,
      },
      submitStatus: null,
    };
  },
  validations: {
    password: {
        password: {
          required,
          minLength: minLength(8),
        },
        confirm: {
          required,
          sameAsPassword: sameAs("password"),
        },
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
        this.$emit("submit", {
          password: this.password,
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