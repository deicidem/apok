<template>
  <section class="authorize">
    <app-registration-popup></app-registration-popup>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import AppRegistrationPopup from "@/components/AppRegistrationPopup";

export default {
  components: {
    AppRegistrationPopup,
  },
  methods: {
    ...mapActions("users", {
      addUser: "addUser",
      regUser: "regUser",
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
  flex-direction: column;
  text-align: center;

  width: 100%;
  height: 100%;
  background: url("@/assets/img/authorize__background.png");
  background-size: cover;
}
</style>