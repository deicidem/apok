<template>
  <div>
    <h2>Plan</h2>
    <app-button>Использовать карту</app-button>
    <app-button type="white">Использовать карту</app-button>
    <app-button type="white-g">Использовать карту</app-button>
    <app-button type="white-r">Использовать карту</app-button>
    <app-button type="red">Использовать карту</app-button>
    <app-input label="Фамилия" v-model="val"></app-input>
    {{val}}
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue"
import AppInput from "@/components/controls/AppInput.vue"
export default {
  components: {
    AppButton,
    AppInput
  },
  data() {
    return {
      val: "инпут"
    }
  },
}
</script>

<style lang="scss" scoped>
  div {
    padding: 20px;
  }
</style>