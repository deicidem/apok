<template>
  <div class="hero">
    <app-input label="Введите..."></app-input>
    <app-button class="hero-button" type="button-white"
      >Найти пользователя
    </app-button>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
import AppInput from "@/components/controls/AppInput.vue";
export default {
  components: {
    AppButton,
    AppInput,
  },
};
</script>

<style lang="scss" scoped>
.hero {
  margin-top: 20px;
  display: flex;
  height: auto;

  &-button {
    margin-left: 20px;
  }
}
</style>