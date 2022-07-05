<template>
  <admin-aside-content title="Создать пользователя">
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
          (!$v.password.confirm.sameAs || !$v.password.confirm.required) &&
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

      <button
        class="button button-g c-form__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Создать
      </button>
    </form>
  </admin-aside-content>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AppInput from "@/components/controls/AppInput.vue";
export default {
  components: {
    AdminAsideContent,
    AppInput,
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
};
</script>

<style lang="scss" scoped>
.c {
  position: relative;
  background: $gradient-w;
  width: 300px;
  padding: 30px 40px 30px 40px;
  border-radius: 10px;
  border: none;
  &-title {
    text-align: center;
    font-size: 20px;
    color: $black;
    margin-bottom: 20px;
  }
  &-form {
    margin: 30px auto 0 auto;
    width: 400px;
    background: $white;
    border-radius: 10px;
    box-shadow: $shadow-small;
    padding: 30px;
    &__input {
      margin-top: 30px;
      &:first-child{
        margin: 0;
      }
    }
    &__item {
      margin-top: 20px;
      width: 100%;
      height: 44px;
      font-size: 16px;
      background: $white;
    }
  }
  &-remember {
    display: flex;
    margin-top: 20px;
    width: 100%;
    &__text {
      margin-left: 10px;
      color: $text-grey;
      font-size: 14px;
    }
  }
}
</style>