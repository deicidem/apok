<template>
  <page-base :show-menu="false">
    <section class="authorize">
      <form-login></form-login>
    </section>
  </page-base>
</template>

<script>
import { mapActions } from "vuex";
import PageBase from "@/components/PageBase.vue";
import FormLogin from "../components/auth/FormLogin.vue";

export default {
  components: {
    FormLogin,
    PageBase,
  },
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
  width: 100%;
  height: 100%;
  background: url("@/assets/img/background/avim.png");
  background-size: cover;
}

.invalid {
  border: 1px solid $color-red;
  transition: all 1s ease-out;
  color: $color-red;

  &:focus ~ .input-label,
  &:not(:placeholder-shown) ~ label {
    color: $color-red;
  }
}

.invalidIcon {
  position: absolute;
  max-width: 26px;
  right: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.error {
  &-tooltip {
    position: absolute;
    right: -240px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 2s ease-out;

    display: flex;
    align-items: center;

    height: 49px;
    width: 240px;
    background: linear-gradient(
      to right,
      rgb(235, 96, 96, 0.6),
      rgb(141, 70, 70, 0.6)
    );
    color: $white;
    font-size: 14px;
    border-radius: 10px;

    p {
      margin-left: 8px;
    }
  }
}
</style>