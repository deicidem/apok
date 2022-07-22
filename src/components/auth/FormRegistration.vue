<template>
  <form-base>
    <div class="c-title">{{ title }}</div>

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
        :value="phone"
        @input="$v.phone.$model = $event"
        :invalid="(!$v.phone.numeric || !$v.phone.required) && formInvalid"
        icon="icon icon-ic_fluent_call_20_regular"
        label="Контактный номер"
        :error="
          !$v.phone.required
            ? 'Введите значение'
            : !$v.phone.numeric
            ? 'Поле принимает на вход только цифры'
            : null
        "
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
        :value="organisation"
        @input="$v.organisation.$model = $event"
        :invalid="(!$v.organisation.required) && formInvalid"
        icon="icon icon-ic_fluent_people_team_20_regular"
        label="Организация"
        :error="
          !$v.mail.required
            ? 'Введите значение'
            : null
        "
      >
      </app-input>

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

      <div class="c-remember" v-show="title == 'Регистрация'">
        <app-checkbox></app-checkbox>
        <span class="c-remember__text"
          >Cогласие на обработку персональных данных</span
        >
      </div>

      <app-button
        v-show="title == 'Регистрация'"
        type="button-g"
        size="big"
        class="c-form__item"
        :disabled="pending"
      >
        Зарегистироваться
      </app-button>

      <app-button
        v-show="title == 'Создание пользователя'"
        type="button-g"
        size="big"
        class="c-form__item"
        :disabled="pending"
      >
        Создать
      </app-button>

      <router-link
        v-show="title == 'Регистрация'"
        to="/login"
        v-slot="{ navigate }"
      >
        <app-button
          type="button-white"
          size="big"
          @click="navigate"
          :disabled="pending"
          class="c-form__item"
        >
          Войти
        </app-button>
      </router-link>
    </form>
  </form-base>
</template>

<script>
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import {
  required,
  minLength,
  sameAs,
  email,
  numeric,
} from "vuelidate/lib/validators";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  components: {
    FormBase,
    AppInput,
    AppButton,
    AppCheckbox,
  },

  props: ["title", "pending"],


  data() {
    return {
      firstName: null,
      lastName: null,
      mail: null,
      organisation: null,
      phone: null,
      password: {
        password: null,
        confirm: null,
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
      phone: {
        required,
        numeric,
      },
      mail: {
        required,
        email,
      },
      organisation: {
        required,
        minLength: minLength(8),
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
    submitForm() {
      if (!this.$v.$invalid) {
        this.submitStatus = "SUBMIT";
        this.$emit('submit', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.mail,
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
.c {
  &-inputs {
    &:focus-within .c-label {
      font-size: 13px;
      top: -25%;
    }
  }

  &-cross {
    position: absolute;
    top: 10px;
    right: 14px;
    font-size: 20px;
    cursor: pointer;
    color: $color-main;
  }

  &-label {
    top: 50%;
    transform: translateY(-50%);
  }

  &-input {
    margin-top: 30px;
    padding: 15px 60px 15px 24px;
    width: 320px;
    height: 50px;

    &:focus .c-label,
    &:not(:placeholder-shown) ~ label {
      font-size: 13px;
      top: -25%;
    }

    &-img {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      margin: 0;

      i {
        font-size: 30px;
      }
    }
  }
}
</style>