<template>
  <form-base>
    <form-message
      v-show="showMessage"
      :status="formInvalid ? 'error' : 'valid'"
      :message="message"
    ></form-message>

    <div class="c-title">Авторизация</div>

    <form class="c-form" @submit.prevent="submitForm()">
      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.login.$model"
          :class="{
            invalid: (!$v.login.minLength || !$v.login.required) && formInvalid,
          }"
        />
        <label class="input-label">Логин</label>

        <i
          class="icon icon-ic_fluent_person_20_regular"
          :class="
            (!$v.login.minLength || !$v.login.required) && formInvalid
              ? 'invalidIcon'
              : 'input-img'
          "
        ></i>

        
      </div>
      <div v-if="!$v.login.required && formInvalid" class="error-tooltip">
          Введите значение
        </div>
        <div v-if="!$v.login.minLength && formInvalid" class="error-tooltip">
          Логин должен содержать больше 6 символов
        </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.password.$model"
          :class="{
            invalid:
              (!$v.password.minLength || !$v.password.required) && formInvalid,
          }"
        />
        <label class="input-label">Пароль</label>

        <i
          class="icon icon-ic_fluent_lock_closed_20_regular"
          :class="
            (!$v.password.minLength || !$v.password.required) && formInvalid
              ? 'invalidIcon'
              : 'input-img'
          "
        ></i>
        
      </div>
      
      <div v-if="!$v.password.required && formInvalid" class="error-tooltip">
          Введите значение
        </div>
        <div v-if="!$v.password.minLength && formInvalid" class="error-tooltip">
          Пароль должен содержать больше 6 символов
        </div>

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
import FormMessage from "@/components/auth/FormMessage.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  components: {
    AppCheckbox,
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