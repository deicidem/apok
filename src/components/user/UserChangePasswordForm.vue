<template>
  <div class="password-popup">
    <div class="password-popup__card">
      <div class="password-popup__line">
        <p>Поменять пароль</p>
        <div class="password-popup__cross" @click="$emit('close')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <form
        class="password-popup__wrapper"
        @submit.prevent="submitForm()"
        method="POST"
      >
        <div class="input-wrapper">
          <input
            placeholder=" "
            v-model="$v.currentPassword.$model"
            class="input input-withIcon"
            :class="{
              invalid: !$v.currentPassword.required && submitStatus === 'ERROR',
            }"
          />
          <label class="input-label">Текущий пароль</label>
          <i
            class="icon icon-ic_fluent_lock_closed_20_regular"
            :class="
              !$v.currentPassword.required && submitStatus === 'ERROR'
                ? 'invalidIcon'
                : 'input-img'
            "
          ></i>
          <div
            v-if="!$v.currentPassword.required && submitStatus === 'ERROR'"
            class="error-tooltip"
          >
            <p>Введите значение</p>
          </div>
        </div>

        <div class="input-wrapper">
          <input
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
          <i
            class="icon icon-ic_fluent_lock_closed_20_regular"
            :class="
              (!$v.password.required || !$v.password.minLength) &&
              submitStatus === 'ERROR'
                ? 'invalidIcon'
                : 'input-img'
            "
          ></i>
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
            placeholder=" "
            v-model="$v.passwordConfirmation.$model"
            class="input input-withIcon"
            :class="{
              invalid:
                !$v.passwordConfirmation.sameAs && submitStatus === 'ERROR',
            }"
          />
          <label class="input-label">Подтвердить пароль</label>
          <i
            class="icon icon-ic_fluent_lock_closed_20_regular"
            :class="
              !$v.passwordConfirmation.sameAs && submitStatus === 'ERROR'
                ? 'invalidIcon'
                : 'input-img'
            "
          ></i>
          <div
            v-if="!$v.passwordConfirmation.sameAs && submitStatus === 'ERROR'"
            class="error-tooltip"
          >
            <p>Пароли не совпадают</p>
          </div>
        </div>

        <div class="password-popup__button">
          <app-button
            type="button-g submit"
            class="password-popup__btn"
            :disabled="submitStatus === 'PENDING'"
          >
            Подтвердить
          </app-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    AppButton,
  },
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
    right: 14px;
    font-size: 20px;
    cursor: pointer;
    color: $white;
  }

  &__wrapper {
    width: 400px;
    padding: 0 30px 30px 30px;
  }

  &__button {
    margin: 30px 0 0 0;
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
    color: $color-red;
  }
}

.invalidIcon {
  position: absolute;
  right: 0;
  top: 36%;
  transform: translate(-50%, -50%);
  color: $color-red;
}

.error {
  &-tooltip {
    margin: 2px 0 0 0;
    text-align: left;
    font-size: 12px;
    color: $color-red;

    p {
      margin: 0;
    }
  }
}
</style>