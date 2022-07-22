<template>
  <page-base :show-menu="false">
    <section class="authorize">
      <div class="authorize-wrapper">
        <form-message
          v-show="showMessage"
          :error="error"
          :message="message"
        ></form-message>
        <form-login :pending="pending" @submit="onSubmit"></form-login>
      </div>
    </section>
  </page-base>
</template>

<script>
import { mapActions } from "vuex";
import PageBase from "@/components/PageBase.vue";
import FormLogin from "../components/auth/FormLogin.vue";
import FormMessage from "@/components/auth/FormMessage.vue";

export default {
  components: {
    FormLogin,
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
    ...mapActions("users", {
      authorize: "authorizeUser",
    }),
    async onSubmit(params) {
      this.showMessage = false;
      this.pending = true;
      try {
        await this.authorize(params);

        this.message =
          "Вы успешно авторизованы. Сейчас вы будете перенаправлены на главную страницу.";
        this.error = false;
        setTimeout(() => {
          this.$router.push("main");
        }, 1500);
      } catch (error) {
        if (error?.response?.status == 422) {
          this.message =
            "Учетная запись  с указанными логином и паролем не существует";
        } else {
          this.message =
            "При авторизации произошла ошибка, повторите попытку позже";
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