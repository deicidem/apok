<template>
  <div class="form">
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
      <button class="button button-g form-wrapper__item">Войти</button>
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

export default {
  components: { AppCheckbox },
  data() {
    return {
      login: "",
      password: "",
      remember: false,
      submitStatus: null,
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
      if (!this.$v.$invalid) {
        await this.authorize({
          email: this.login,
          password: this.password,
          remember: this.remember,
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