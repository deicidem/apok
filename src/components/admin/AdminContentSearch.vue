<template>
  <div class="component">
    <form class="component-form" @submit.prevent="$emit('submit', localValue)">
      <app-input
        label="Введите..."
        :model-value="localValue"
        @input="localValue = $event"
      ></app-input>
      <app-button class="component-button" type="button-white">Найти </app-button>
    </form>
    <app-button class="component-button" type="button-white" @click="$emit('all')">Все записи </app-button>
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

  data: () => ({
    localValue: null,
  }),
};
</script>

<style lang="scss" scoped>
.component {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  &-form {
    display: flex;
    height: auto;
  }
  &-button {
    margin-left: 20px;
  }
}
</style>