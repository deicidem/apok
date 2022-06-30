<template>
  <form-base>
    <form-message
      v-show="showMessage"
      :status="formInvalid ? 'error' : 'valid'"
      :message="message"
    ></form-message>

    <div class="c-title">Регистрация</div>

    <form class="c-form" @submit.prevent="submitForm()">
      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.firstName.$model"
          :class="{
            invalid: !$v.firstName.required && formInvalid,
          }"
        />
        <label class="input-label">Имя</label>

        <i
          class="icon icon-ic_fluent_person_20_regular"
          :class="
            !$v.firstName.required && formInvalid ? 'invalidIcon' : 'input-img'
          "
        ></i>

        <div v-if="!$v.firstName.required && formInvalid" class="error-tooltip">
          <span>Введите значение</span>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.lastName.$model"
          :class="{
            invalid: !$v.lastName.required && formInvalid,
          }"
        />
        <label class="input-label">Фамилия</label>

        <i
          class="icon icon-ic_fluent_person_20_regular"
          :class="
            !$v.lastName.required && formInvalid ? 'invalidIcon' : 'input-img'
          "
        ></i>

        <div v-if="!$v.lastName.required && formInvalid" class="error-tooltip">
          <span>Введите значение</span>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.mail.$model"
          :class="{
            invalid: (!$v.mail.email || !$v.mail.required) && formInvalid,
          }"
        />
        <label class="input-label">Почтовый адрес</label>

        <i
          class="icon icon-ic_fluent_mail_20_regular"
          :class="
            (!$v.mail.email || !$v.mail.required) && formInvalid
              ? 'invalidIcon'
              : 'input-img'
          "
        ></i>

        <div v-if="!$v.mail.required && formInvalid" class="error-tooltip">
          <span>Введите значение</span>
        </div>
        <div v-if="!$v.mail.email && formInvalid" class="error-tooltip">
          <span>Введите корректный почтовый адрес</span>
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
              formInvalid,
          }"
        />
        <label class="input-label">Пароль</label>

        <i
          class="icon icon-ic_fluent_lock_closed_20_regular"
          :class="
            (!$v.password.password.minLength ||
              !$v.password.password.required) &&
            formInvalid
              ? 'invalidIcon'
              : 'input-img'
          "
        ></i>

        <div
          v-if="!$v.password.password.required && formInvalid"
          class="error-tooltip"
        >
          <span>Введите значение</span>
        </div>

        <div
          v-if="!$v.password.password.minLength && formInvalid"
          class="error-tooltip"
        >
          <span>
            Пароль должен содержать более
            {{ $v.password.password.$params.minLength.min }} символов
          </span>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.password.confirm.$model"
          :class="{
            invalid:
              (!$v.password.confirm.sameAsPassword ||
                !$v.password.confirm.required) &&
              formInvalid,
          }"
        />
        <label class="input-label">Повторите пароль</label>
        <i
          class="icon icon-ic_fluent_lock_closed_20_regular"
          :class="
            (!$v.password.confirm.sameAsPassword ||
              !$v.password.confirm.required) &&
            formInvalid
              ? 'invalidIcon'
              : 'input-img'
          "
        ></i>

        <div
          v-if="!$v.password.confirm.required && formInvalid"
          class="error-tooltip"
        >
          <span>Введите значение</span>
        </div>

        <div
          v-if="!$v.password.confirm.sameAsPassword && formInvalid"
          class="error-tooltip"
        >
          <span>Пароли не совпадают</span>
        </div>
      </div>

      <button
        class="button button-g c-form__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Зарегистироваться
      </button>

      <router-link to="/login" v-slot="{ navigate }">
        <button
          @click="navigate"
          :disabled="submitStatus === 'PENDING'"
          class="button button-white c-form__item"
        >
          Войти
        </button>
      </router-link>
    </form>
  </form-base>
</template>

<script>
import { mapActions } from "vuex";

import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import FormMessage from "@/components/auth/FormMessage.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  components: {
    FormMessage,
    FormBase,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      mail: null,
      password: {
        password: null,
        confirm: null,
      },
      submitStatus: null,
      showMessage: false,
      message: null,
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
          required,
          sameAsPassword: sameAs("password"),
        },
      },
    };
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
          await this.regUser({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.mail,
            password: this.password,
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