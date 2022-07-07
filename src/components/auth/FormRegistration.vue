<template>
  <form-base>
    <form-message
      v-show="showMessage"
      :status="formInvalid ? 'error' : 'valid'"
      :message="message"
    ></form-message>

    <div class="c-title">Регистрация</div>

    <form class="c-form" @submit.prevent="submitForm()">
      <app-input
        class="c-form__input"
        :value="firstName"
        @input="$v.firstName.$model = $event"
        :invalid="!$v.firstName.required && formInvalid"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Имя"
        :error="!$v.firstName.required ? 'Введите значение' : null"
      >
      </app-input>

      <app-input
        class="c-form__input"
        :value="lastName"
        @input="$v.lastName.$model = $event"
        :invalid="!$v.lastName.required && formInvalid"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Фамилия"
        :error="!$v.lastName.required ? 'Введите значение' : null"
      >
      </app-input>

      <app-input
        class="c-form__input"
        :value="mail"
        @input="$v.mail.$model = $event"
        :invalid="(!$v.mail.email || !$v.mail.required) && formInvalid"
        icon="icon icon-ic_fluent_mail_20_regular"
        label="Почтовый адрес"
        :error="
          !$v.mail.required
            ? 'Введите значение'
            : !$v.mail.email
            ? 'Введите корректный почтовый адрес'
            : null
        "
      >
      </app-input>

      <app-input
        class="c-form__input"
        :value="password.password"
        @input="$v.password.password.$model = $event"
        :invalid="
          (!$v.password.password.minLength || !$v.password.password.required) &&
          formInvalid
        "
        icon="icon icon-ic_fluent_mail_20_regular"
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
        @input="$v.password.confirm.$model = $event"
        :invalid="
          (!$v.password.confirm.sameAsPassword ||
            !$v.password.confirm.required) &&
          formInvalid
        "
        icon="icon icon-ic_fluent_mail_20_regular"
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
        type="button-g "
        class="c-form__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Зарегистироваться
      </app-button>

      <router-link to="/login" v-slot="{ navigate }">
        <app-button
          type="button-white"
          @click="navigate"
          :disabled="submitStatus === 'PENDING'"
          class="c-form__item"
        >
          Войти
        </app-button>
      </router-link>
    </form>
  </form-base>
</template>

<script>
import { mapActions } from "vuex";
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import FormMessage from "@/components/auth/FormMessage.vue";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  components: {
    FormMessage,
    FormBase,
    AppInput,
    AppButton,
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
    ...mapActions("users", ["regUser"]),

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
          console.log(error);
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