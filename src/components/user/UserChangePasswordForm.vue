<template>
  <div class="password-popup">
    <div class="password-popup__card">
      <div class="password-popup__line">
        <p>Поменять пароль</p>
        <div class="password-popup__cross" @click="$emit('close')">
          <img svg-inline src="@/assets/img/cross/cross.svg" />
        </div>
      </div>
      <form
        class="password-popup__wrapper"
        @submit.prevent="submitForm()"
        method="POST"
      >
        <div class="input-wrapper">
          <input
            required
            placeholder=" "
            v-model="$v.currentPassword.$model"
            class="input input-withIcon"
            :class="{
              invalid: !$v.currentPassword.required && submitStatus === 'ERROR',
            }"
          />
          <label class="input-label">Текущий пароль</label>
          <img
            svg-inline
            :class="
              !$v.currentPassword.required && submitStatus === 'ERROR'
                ? 'invalidIcon'
                : 'input-img'
            "
            src="@/assets/img/form-icons/lock-icon.svg"
          />
          <div
            v-if="!$v.currentPassword.required && submitStatus === 'ERROR'"
            class="error-tooltip"
          >
            <p>Введите значение</p>
          </div>
        </div>

        <div class="input-wrapper">
          <input
            required
            placeholder=" "
            v-model="$v.password.$model"
            class="input input-withIcon"
            :class="{
              invalid:
                (!$v.password.required || !$v.password.minLength) &&
                submitStatus === 'ERROR',
            }"
          />
          <label class="input-label">Новый пароль</label>
          <img
            svg-inline
            :class="
              (!$v.password.required || !$v.password.minLength) &&
              submitStatus === 'ERROR'
                ? 'invalidIcon'
                : 'input-img'
            "
            src="@/assets/img/form-icons/lock-icon.svg"
          />
          <div
            v-if="!$v.password.required && submitStatus === 'ERROR'"
            class="error-tooltip"
          >
            <p>Введите значение</p>
          </div>
          <div
            v-if="!$v.password.minLength && submitStatus === 'ERROR'"
            class="error-tooltip"
          >
            <p>Пароль должен содержать более 8 символов</p>
          </div>
        </div>

        <div class="input-wrapper">
          <input
            required
            placeholder=" "
            v-model="$v.passwordConfirmation.$model"
            class="input input-withIcon"
            :class="{
              invalid:
                !$v.passwordConfirmation.sameAs && submitStatus === 'ERROR',
            }"
          />
          <label class="input-label">Подтвердить пароль</label>
          <img
            svg-inline
            :class="
              !$v.passwordConfirmation.sameAs && submitStatus === 'ERROR'
                ? 'invalidIcon'
                : 'input-img'
            "
            src="@/assets/img/form-icons/lock-icon.svg"
          />
          <div
            v-if="!$v.passwordConfirmation.sameAs && submitStatus === 'ERROR'"
            class="error-tooltip"
          >
            <p>Пароли не совпадают</p>
          </div>
        </div>

        <div class="password-popup__button">
          <button
            class="button button-g password-popup__btn"
            type="submit"
            :disabled="submitStatus === 'PENDING'"
          >
            Подтвердить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
      submitStatus: null,
    };
  },
  validations: {
    currentPassword: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    passwordConfirmation: {
      required,
      sameAs: sameAs("password"),
    },
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        console.log("Form successfully submitted");
        this.submitStatus = "PENDING";
      } else {
        this.submitStatus = "ERROR";
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.password-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background: rgba($black, 0.5);
  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
  }
  &__line {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient;
    height: 50px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    p {
      color: $white;
      font-size: 20px;
    }
  }
  &__cross {
    position: absolute;
    right: 10px;

    width: 18px;
    cursor: pointer;
    svg path {
      fill: $white;
    }
  }
  &__wrapper {
    width: 400px;
    padding: 30px;
  }
  &__input {
    margin-top: 10px;
  }
  &__button {
    margin: 10px auto;
    width: 300px;
  }
  &__btn {
    width: 100%;
    font-size: 16px;
    height: 40px;
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
    path {
      fill: $color-red;
    }
  }
}
.invalidIcon {
  position: absolute;
  max-width: 26px;
  right: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  path {
    fill: $color-red;
  }
}
.error {
  &-tooltip {
    position: absolute;
    right: -240px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 2s ease-out;

    display: flex;
    align-items: center;

    height: 49px;
    width: 240px;
    background: linear-gradient(
      to right,
      rgb(235, 96, 96, 0.6),
      rgb(141, 70, 70, 0.6)
    );
    color: $white;
    font-size: 14px;
    border-radius: 10px;
    p {
      margin-left: 8px;
    }
  }
}
</style>