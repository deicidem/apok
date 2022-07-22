<template>
  <div class="password-popup">
    <div class="password-popup__wrapper">
      <div class="password-popup__cross" @click="$emit('close')">
          <i class="icon icon-ic_fluent_dismiss_20_regular"></i>
        </div>
        <form-message
          v-show="showMessage"
          :error="error"
          :message="message"
        ></form-message>
        <user-change-password-form :pending="pending" @submit="onSubmit"></user-change-password-form>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UserChangePasswordForm from "@/components/user/UserChangePasswordForm.vue";
import FormMessage from "@/components/auth/FormMessage.vue";

export default {
  components: {
    UserChangePasswordForm,
    FormMessage,
  },

  data: () => ({
    showMessage: false,
    message: null,
    error: false,
    pending: false,
  }),

  methods: {
    ...mapActions("users", ["updatePassword"]),
    async onSubmit(params) {
      this.showMessage = false;
      this.pending = true;
      try {
        await this.updatePassword(params);

        this.message =
          "Пароль успешно изменен";
        this.error = false;
      } catch (error) {
        if (error?.response?.status == 422) {
          this.message =
            "Учетная запись  с указанными логином и паролем не существует";
        } else {
          this.message =
            "При измении пароля произошла ошибка";
        }
        this.error = true;
      }
      this.pending = false;
      this.showMessage = true;
    },
  },
};
</script>

<style scoped lang="scss">
.password-popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba($black, 0.5);
  &__wrapper {
    position: relative;
  }
  &__cross {
    z-index: 10;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: $white;
  }
}
</style>
