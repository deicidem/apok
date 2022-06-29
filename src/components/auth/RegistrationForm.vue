<template>
  <div class="form">
    <div class="form-title">Регистрация</div>

    <form
      class="form-wrapper"
      id="registration"
      @submit.prevent="submitForm()"
      method="post"
    >
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
      </div>

      <div v-if="!$v.firstName.required && formInvalid" class="error-tooltip">
        <span>Введите значение</span>
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
      </div>

      <div v-if="!$v.lastName.required && formInvalid" class="error-tooltip">
        <span>Введите значение</span>
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
      </div>

      <div v-if="!$v.mail.required && formInvalid" class="error-tooltip">
        <span>Введите значение</span>
      </div>
      <div v-if="!$v.mail.email && formInvalid" class="error-tooltip">
        <span>Введите корректный почтовый адрес</span>
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
      </div>

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

      <div class="input-wrapper">
        <input
          placeholder=" "
          class="input input-withIcon"
          v-model.trim="$v.password.confirm.$model"
          :class="{
            invalid: !$v.password.confirm.sameAsPassword && formInvalid,
          }"
        />
        <label class="input-label">Повторите пароль</label>
        <i
          class="icon icon-ic_fluent_lock_closed_20_regular"
          :class="
            !$v.password.confirm.sameAsPassword && formInvalid
              ? 'invalidIcon'
              : 'input-img'
          "
        ></i>
      </div>

      <div
        v-if="!$v.password.confirm.sameAsPassword && formInvalid"
        class="error-tooltip"
      >
        <span>Пароли не совпадают</span>
      </div>

      <button
        type="submit"
        :disabled="submitStatus === 'PENDING'"
        class="button button-g form-wrapper__item"
      >
        Зарегистироваться
      </button>

      <router-link to="/login">
        <button class="button button-white form-wrapper__item">Войти</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      mail: "",
      password: {
        password: "",
        confirm: "",
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
      addUser: "addUser",
      regUser: "regUser",
    }),
    async submitForm() {
      if (!this.$v.$invalid) {
        await this.regUser({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.mail,
          password: this.password,
        });
        this.$router.push("main");
        this.submitStatus = "PENDING";
      } else {
        this.submitStatus = "FORM_INVALID";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  background: $gradient-w;
  width: 400px;
  padding: 30px 40px 30px 40px;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;
  &-title {
    text-align: center;
    font-size: 20px;
    color: $black;
    margin-bottom: 20px;
  }
  &-wrapper {
    &__item {
      margin-top: 20px;
      width: 100%;
      height: 44px;
      font-size: 16px;
      background: $white;
    }
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
    color: $color-red;
  }
}
.invalidIcon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  color: $color-red;
}

.error {
  &-tooltip {
    margin: 2px 0 0 0;
    text-align: left;
    font-size: 12px;
    color: rgb(141, 70, 70);
  }
}
</style>