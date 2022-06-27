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
.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-arrow {
    svg path {
      fill: $color-main;
    }
  }
  &-subtitle {
    margin: 0 0 0 10px;
    color: $color-main;
  }
}
.remember {
  display: flex;
  margin: 0 auto;
  width: 300px;
  &-text {
    margin-left: 10px;
    color: $text-grey;
    font-size: 14px;
  }
}
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
  .form {
    background: $gradient-w;
    margin: 30px 0 0 0;
    width: 400px;
    padding: 30px;
    border-radius: 10px;
    border: none;
    box-shadow: $shadow-big;
    &-title {
      text-align: center;
      font-size: 20px;
      color: $black;
      margin-bottom: 20px;
    }
    &-wrapper {
      &__item {
        width: 300px;
        height: 40px;
        margin: 10px auto;
        font-size: 16px;
      }
    }
  }
}
.invalid {
  border: 1px solid $color-red;
  transition: all 1s ease-out;
  color: $color-red;
  &:focus ~ .input-label,
  &:not(:placeholder-shown) ~ label {
    color: $color-red;
  }
  &:focus ~ .invalidIcon {
    path {
      fill: $color-red;
    }
  }
}
.invalidIcon {
  position: absolute;
  max-width: 26px;
  right: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  path {
    fill: $color-red;
  }
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