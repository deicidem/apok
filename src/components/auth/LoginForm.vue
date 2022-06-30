<template>
  <div class="form">
    <form-message
      v-show="showMessage"
      :status="submitStatus == 'ERROR' ? 'error' : 'valid'"
      :message="message"
    ></form-message>
    <div class="form-title">Авторизация</div>
    <form class="form-wrapper" @submit.prevent="submitForm()" method="POST">
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
        <span>Введите значение</span>
      </div>
      <div v-if="!$v.login.minLength && formInvalid" class="error-tooltip">
        <span>Логин должен содержать больше 6 символов</span>
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
        <span>Введите значение</span>
      </div>
      <div v-if="!$v.password.minLength && formInvalid" class="error-tooltip">
        <span>Пароль должен содержать больше 8 символов</span>
      </div>

      <div class="remember">
        <app-checkbox
          :model-value="remember"
          @change="remember = $event"
        ></app-checkbox>
        <p class="remember-text">Запомнить меня</p>
      </div>
      <button
        class="button button-g form-wrapper__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Войти
      </button>
      <router-link to="/registration">
        <button
          type="submit"
          :disabled="submitStatus === 'PENDING'"
          class="button button-white form-wrapper__item"
        >
          Зарегистироваться
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { required, minLength } from "vuelidate/lib/validators";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import FormMessage from "@/components/auth/FormMessage.vue";

export default {
  components: {
    AppCheckbox,
    FormMessage,
  },
  data() {
    return {
      login: "",
      password: "",
      remember: false,
      submitStatus: null,
      showMessage: false,
      message: "",
    };
  },
  validations: {
    login: {
      required,
      minLength: minLength(6),
    },
    password: {
      required,
      minLength: minLength(6),
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
.remember {
  display: flex;
  margin-top: 20px;
  width: 100%;
  &-text {
    margin-left: 10px;
    color: $text-grey;
    font-size: 14px;
  }
}

.authorize {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  background: url("@/assets/img/background/apok.png");
  background-size: cover;

  .form {
    position: relative;
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
    &-message {
      display: flex;
      align-items: center;
      left: 0;
      bottom: calc(100% + 20px);
      position: absolute;
      width: 100%;
      padding: 15px;
      background: $gradient-w;
      box-shadow: $shadow-big;
      border-radius: 10px;
      color: $color-main;
      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        color: $color-main;
        width: 35px;
        height: 35px;
        margin-right: 20px;
        .icon {
          line-height: 0;
        }
      }
      &__text {
        text-align: left;
        font-size: 16px;
      }
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