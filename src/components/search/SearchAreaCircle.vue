<template>
  <search-area-base class="c">
    <form class="c-form">
      <div class="input-wrapper c-inputs">
        <masked-input
          placeholder=" "
          class="input input-withIcon c-input"
          v-model.trim="$v.lat.$model"
          :class="{
            invalid:
              (!$v.lat.minLength || !$v.lat.required) &&
              submitStatus === 'ERROR',
          }"
          :mask="inputMaskLat"
        />

        <label class="input-label c-label"> Широта </label>

        <p
          class="c-input__letter"
          :class="{
            invalidLetter:
              (!$v.lat.minLength || !$v.lat.required) &&
              submitStatus === 'ERROR',
          }"
        >
          Ю
        </p>

        <div
          v-if="!$v.lat.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>

        <div
          v-if="!$v.lat.minLength && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Значение должно превышать 8 символов</p>
        </div>
      </div>

      <div class="input-wrapper c-inputs">
        <masked-input
          placeholder=" "
          class="input c-input"
          v-model.trim="$v.lng.$model"
          :class="{
            invalid:
              (!$v.lng.minLength || !$v.lng.required) &&
              submitStatus === 'ERROR',
          }"
          :mask="inputMaskLng"
        />
        <label class="input-label c-label"> Долгота </label>
        <p
          class="c-input__letter"
          :class="{
            invalidLetter:
              (!$v.lng.minLength || !$v.lng.required) &&
              submitStatus === 'ERROR',
          }"
        >
          В
        </p>

        <div
          v-if="!$v.lng.required && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Введите значение</p>
        </div>

        <div
          v-if="!$v.lng.minLength && submitStatus === 'ERROR'"
          class="error-tooltip"
        >
          <p>Значение должно превышать 8 символов</p>
        </div>
      </div>

      <div class="input-wrapper c-inputs">
        <app-input
          class="c-form__input"
          :value="rad"
          @input="$v.rad.$model = $event"
          :invalid="(!$v.rad.numeric || !$v.rad.required) && submitStatus === 'ERROR'"
          label="Радиус (км)"
          :error="
            !$v.rad.required
              ? 'Введите значение'
              : !$v.rad.numeric
              ? 'Значение может содержать только цифры'
              : null
          "
        ></app-input>
      </div>
    </form>
    <div class="c-wrapper">
      <button @click="submitForm" class="button button-g c-button">
        Загрузить на карту
      </button>

      <button class="button button-r c-button" @click="$emit('remove')">
        Убрать с карты
      </button>
    </div>
  </search-area-base>
</template>

<script>
import SearchAreaBase from "@/components/search/SearchAreaBase.vue";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import MaskedInput from "vue-masked-input";
import AppInput from "@/components/controls/AppInput.vue";
export default {
  components: {
    MaskedInput,
    SearchAreaBase,
    AppInput,
  },
  data: () => ({
    submitStatus: null,

    inputMaskLat: {
      pattern: `111°11'11"`,
      formatCharacters: {
        N: {
          validate: (char) => /[nsNS]/.test(char),
          transform: (char) => char.toUpperCase(),
        },
      },
    },
    placeholderLat: "000°00'00\"",
    inputMaskLng: {
      pattern: `111°11'11"`,
      formatCharacters: {
        E: {
          validate: (char) => /[ewEW]/.test(char),
          transform: (char) => char.toUpperCase(),
        },
      },
    },
    placeholderLng: "000°00'00\"",

    lng: "",
    lat: "",
    rad: "",
  }),
  validations() {
    return {
      lng: {
        required,
        minLength: minLength(6),
      },
      lat: {
        required,
        minLength: minLength(6),
      },
      rad: {
        required,
        numeric,
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.$emit("submit", { lng: this.lng, lat: this.lat, rad: this.rad });
      } else {
        this.submitStatus = "ERROR";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.c {
  display: flex;
  align-items: flex-start;
  &-button {
    margin-left: auto;
    max-width: 200px;
    width: 190px;
    &:last-child {
      margin-top: 20px;
    }
  }
  &-form {
    display: flex;
    align-items: flex-start;
    &__input {
      max-width: 120px;
    }
  }
  &-inputs {
    margin-left: 16px;
    &:first-child {
      margin-left: 0;
    }
    &:focus-within .c-label {
      top: -20px;
      font-size: 12px;
    }
  }
  &-label {
    top: 8px;
    left: -10px;
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
  .invalidLetter {
    background: $gradient-r;
  }
  .error {
    &-tooltip {
      transition: all 2s ease-out;

      width: 120px;
      margin-top: 6px;
      line-height: 110%;
      color: $color-red;
      font-size: 12px;
      border-radius: 10px;
    }
  }
  &-input {
    width: 120px;
    height: 35px;
    margin: 0;
    &:focus .c-label,
    &:not(:placeholder-shown) ~ label {
      top: -20px;
      font-size: 12px;
    }
    &__letter {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 0 10px 10px 0;
      color: $white;
      line-height: 35px;
      text-align: center;
      margin: 0;
      font-size: 16px;
      background: $gradient;
      width: 30px;
      height: 35px;
    }
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
}
</style>