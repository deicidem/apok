<template>
  <app-button type="button-g" class="add-user" @click="$emit('show-create')"
    >{{title}}</app-button
  >
</template>

<script>
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    AppButton,
  },
  props: ['title']
};
</script>

<style>
.add-user {
  margin-top: 20px;
  max-width: 240px;
}
</style>