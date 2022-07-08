<template>
  <form class="hero" @submit.prevent="$emit('submit', localValue)">
    <app-input
      label="Введите..."
      :model-value="localValue"
      @input="localValue = $event"
    ></app-input>
    <app-button class="hero-button" type="button-white">Найти </app-button>
  </form>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
import AppInput from "@/components/controls/AppInput.vue";

export default {
  components: {
    AppButton,
    AppInput,
  },

  data: () => ({
    localValue: null,
  }),
};
</script>

<style lang="scss" scoped>
.hero {
  margin-top: 30px;
  display: flex;
  height: auto;

  &-button {
    margin-left: 20px;
  }
}
</style>