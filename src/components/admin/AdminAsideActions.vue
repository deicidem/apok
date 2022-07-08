<template>
  <app-button type="button-g" class="add-user" @click="$emit('show-create')"
    >Создать пользователя</app-button
  >
</template>

<script>
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    AppButton,
  },
};
</script>

<style>
.add-user {
  margin-top: 20px;
  max-width: 240px;
}
</style>