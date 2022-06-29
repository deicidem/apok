<template>
  <section class="authorize">
    <app-auth-popup></app-auth-popup>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import AppAuthPopup from "../components/auth/LoginForm.vue";

export default {
  components: { AppAuthPopup },

  methods: {
    ...mapActions("users", {
      authorize: "authorizeUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
.authorize {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;

  background: url("@/assets/img/background/katod.png");
  background-size: cover;
  .button-router {
    margin: 0 auto;
  }
}
</style>