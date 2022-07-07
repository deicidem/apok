<template>
  <form-base>
    <div class="password-popup">
      <div class="password-popup__card">
        <div class="password-popup__line">
          <p>Поменять пароль</p>
          <div class="password-popup__cross" @click="$emit('close')">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div class="password-popup-form">
          <form class="c-form" @submit.prevent="submitForm()" method="POST">
            <app-input
              label="Текущий пароль"
              :value="currentPassword"
              @input="$v.currentPassword.$model = $event"
              class="c-form__input"
              icon="icon icon-ic_fluent_lock_closed_20_regular"
              :invalid="!$v.currentPassword.required && formInvalid"
              :error="!$v.currentPassword.required ? 'Введите значение' : null"
            ></app-input>

            <app-input
              label="Новый пароль"
              :value="password"
              @input="$v.password.$model = $event"
              class="c-form__input"
              icon="icon icon-ic_fluent_lock_closed_20_regular"
              :invalid="
                (!$v.password.required || !$v.password.minLength) && formInvalid
              "
              :error="
                !$v.password.required
                  ? 'Введите значение'
                  : !$v.password.minLength
                  ? 'Пароль должен содержать не меньше 8 символов'
                  : null
              "
            ></app-input>

            <app-input
              label="Подтвердить пароль"
              :value="passwordConfirmation"
              @input="$v.passwordConfirmation.$model = $event"
              class="c-form__input"
              icon="icon icon-ic_fluent_lock_closed_20_regular"
              :invalid="!$v.passwordConfirmation.sameAs && formInvalid"
              :error="
                !$v.passwordConfirmation.required
                  ? 'Введите значение'
                  : !$v.passwordConfirmation.sameAsPassword
                  ? 'Пароли не совпадают'
                  : null
              "
            ></app-input>

            <div class="password-popup__button">
              <app-button
                type="submit button-g"
                class="password-popup__btn"
                :disabled="submitStatus === 'PENDING'"
              >
                Подтвердить
              </app-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </form-base>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import AppButton from "@/components/controls/AppButton";
import AppInput from "@/components/controls/AppInput";
import FormBase from "@/components/auth/FormBase.vue";

export default {
  components: {
    AppButton,
    AppInput,
    FormBase,
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
        this.$emit("submit", {
          currentPassword: this.currentPassword,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        });
        this.submitStatus = "PENDING";
      } else {
        this.submitStatus = "ERROR";
        return;
      }
    },
  },

  computed: {
    formInvalid() {
      return this.submitStatus === "FORM_INVALID";
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

  &-form {
    width: 380px;
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

// .invalid {
//   border: 1px solid $color-red;
//   transition: all 1s ease-out;
//   color: $color-red;

//   &:focus ~ .input-label,
//   &:not(:placeholder-shown) ~ label {
//     color: $color-red;
//   }

//   &:focus ~ .invalidIcon {
//     color: $color-red;
//   }
// }

// .invalidIcon {
//   position: absolute;
//   right: 0;
//   top: 36%;
//   transform: translate(-50%, -50%);
//   color: $color-red;
// }

// .error {
//   &-tooltip {
//     margin: 2px 0 0 0;
//     text-align: left;
//     font-size: 12px;
//     color: $color-red;

//     p {
//       margin: 0;
//     }
//   }
// }
</style>