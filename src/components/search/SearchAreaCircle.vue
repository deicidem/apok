<template>
  <search-area-base class="c">
    <form class="coordinates-form" @submit.prevent="submitForm()">
      <div class="input-wrapper coordinates-inputs">
        <masked-input
          placeholder=" "
          class="input input-withIcon coordinates-input"
          v-model.trim="lat"
          :class="{ invalid: v$.lat.$error }"
          :mask="inputMaskLat"
        />
        <label class="input-label coordinates-label"> Широта </label>
        <p
          class="coordinates-input__letter"
          :class="{ invalidLetter: v$.lng.$error }"
        >
          Ю
        </p>

        <p v-if="v$.lat.$error" class="error-tooltip">
          {{ v$.lat.$errors[0].$message }}
        </p>
      </div>

      <div class="input-wrapper coordinates-inputs">
        <masked-input
          placeholder=" "
          class="input coordinates-input"
          v-model.trim="lng"
          :class="{ invalid: v$.lng.$error }"
          :mask="inputMaskLng"
        />
        <label class="input-label coordinates-label"> Долгота </label>
        <p
          class="coordinates-input__letter"
          :class="{ invalidLetter: v$.lng.$error }"
        >
          В
        </p>

        <p v-if="v$.lng.$error" class="error-tooltip">
          {{ v$.lng.$errors[0].$message }}
        </p>
      </div>

      <div class="input-wrapper coordinates-inputs">
        <input
          placeholder=" "
          class="input coordinates-input"
          v-model.trim="rad"
          :class="{ invalid: v$.rad.$error }"
          id="radius"
        />
        <label class="input-label coordinates-label"> Радиус (км) </label>

        <p v-if="v$.rad.$error" class="error-tooltip">
          {{ v$.rad.$errors[0].$message }}
        </p>
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