<template>
  <section class="authorize">
    <registration-form></registration-form>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import RegistrationForm from "@/components/auth/RegistrationForm";

export default {
  components: {
    RegistrationForm,
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
  text-align: center;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: url("@/assets/img/background/authorize__background.png");
  background-size: cover;
}
</style>