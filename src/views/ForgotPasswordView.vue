<template>
  <page-base :show-menu="false">
    <section class="authorize">
      <div class="authorize-wrapper">
        <form-message
          v-show="showMessage"
          :error="error"
          :message="message"
        ></form-message>
        <form-forgot-password :pending="pending" @submit="onSubmit"></form-forgot-password>
      </div>
    </section>
  </page-base>
</template>

<script>
import { mapActions } from "vuex";
import PageBase from "@/components/PageBase.vue";
import FormForgotPassword from "../components/auth/FormForgotPassword.vue";
import FormMessage from "@/components/auth/FormMessage.vue";

export default {
  components: {
    FormForgotPassword,
    PageBase,
    FormMessage,
  },
  data: () => ({
    showMessage: false,
    message: null,
    error: false,
    pending: false,
  }),
  methods: {
    ...mapActions("users", ["forgotPassword"]),
    async onSubmit(params) {
      this.showMessage = false;
      this.pending = true;
      try {
        await this.forgotPassword(params);

        this.message =
          "На вашу электроную почту было отправлено письмо для восстановления пароля";
        this.error = false;
      } catch (error) {
        if (error?.response?.status == 422) {
          this.message =
            "Учетная запись с указанной электронной почтой не найдена";
        } else {
          this.message =
            "При попытке восстановления пароля произошла ошибка";
        }
        this.error = true;
      }
      this.pending = false;
      this.showMessage = true;
    },
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
  background: url("@/assets/img/background/apok.png");
  background-size: cover;
  &-wrapper {
    position: relative;
  }
}
</style>