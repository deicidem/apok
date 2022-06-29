<template>
  <search-area-base class="c">
    <form
          class="coordinates-form"
          @submit.prevent="submitForm()"
          method="POST"
        >
          <div class="input-wrapper coordinates-inputs">
            <masked-input
              placeholder=" "
              class="input input-withIcon coordinates-input"
              v-model.trim="$v.lat.$model"
              :class="{
                invalid:
                  (!$v.lat.minLength || !$v.lat.required) &&
                  submitStatus === 'ERROR',
              }"
              :mask="inputMaskLat"
            />
            <label class="input-label coordinates-label"> Широта </label>
            <p
              class="coordinates-input__letter"
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

          <div class="input-wrapper coordinates-inputs">
            <masked-input
              placeholder=" "
              class="input coordinates-input"
              v-model.trim="$v.lng.$model"
              :class="{
                invalid:
                  (!$v.lng.minLength || !$v.lng.required) &&
                  submitStatus === 'ERROR',
              }"
              :mask="inputMaskLng"
            />
            <label class="input-label coordinates-label"> Долгота </label>
            <p
              class="coordinates-input__letter"
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

          <div class="input-wrapper coordinates-inputs">
            <input
              placeholder=" "
              class="input coordinates-input"
              v-model.trim="$v.rad.$model"
              :class="{
                invalid:
                  (!$v.rad.numeric || !$v.rad.required) &&
                  submitStatus === 'ERROR',
              }"
              id="radius"
            />
            <label class="input-label coordinates-label"> Радиус (км) </label>

            <div
              v-if="!$v.rad.required && submitStatus === 'ERROR'"
              class="error-tooltip"
            >
              <p>Введите значение</p>
            </div>
            <div
              v-if="!$v.rad.numeric && submitStatus === 'ERROR'"
              class="error-tooltip"
            >
              <p>Значение может содержать только цифры</p>
            </div>
          </div>
        </form>
        <div class="coordinates-wrapper">
          <button
            @click="submitForm()"
            class="button button-g coordinates-wrapper__button"
          >
            Загрузить на карту
          </button>

          <button
            class="button button-r coordinates-wrapper__button"
            @click="removeCircle"
          >
            Убрать с карты
          </button>
        </div>
  </search-area-base>
</template>

<script>
import SearchAreaBase from "@/components/search/SearchAreaBase.vue";
export default {
  components: {
    SearchAreaBase,
  },
};
</script>

<style lang="scss" scoped>
.c {
  display: flex;
  align-items: flex-start;
  &-form {
    display: flex;
    align-items: flex-start;
  }
  &-inputs {
    margin-left: 16px;
    &:first-child {
      margin-left: 0;
    }
    &:focus-within .coordinates-label {
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
    &:focus .coordinates-label,
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
    &__button {
      margin-left: auto;
      max-width: 200px;
      width: 190px;
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}
</style>