<template>
  <div class="admin-users-aside-form">
    <div class="admin-users-aside-form__wrapper">
      <div class="admin-users-aside-form__cross" @click="$emit('close')">
        <i class="icon icon-ic_fluent_dismiss_20_regular"></i>
      </div>
      <form-message
        v-show="showMessage"
        :error="error"
        :message="message"
      ></form-message>
      <form-registration
        title="Создание пользователя"
        :pending="pending"
        @submit="onSubmit"
      ></form-registration>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormRegistration from "@/components/auth/FormRegistration";
import FormMessage from "@/components/auth/FormMessage.vue";
export default {
  components: {
    FormRegistration,
    FormMessage,
  },

  data() {
    return {
      showMessage: false,
    message: null,
    error: false,
    pending: false,
    };
  },

  methods: {
    ...mapActions("admin/users", ["createUser"]),
    async onSubmit(params) {
      this.showMessage = false;
      this.pending = true;
      try {
        await this.createUser(params);

        this.message =
          "Пользователь успешно зарегистрирован";
        this.error = false;
      } catch (error) {
        if (error?.response?.status == 422) {
          this.message =
            "Учетная запись  с указанными логином и паролем не существует";
        } else {
          this.message =
            "При регистрации пользователя произошла ошибка";
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
.admin-users-aside-form {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba($black, 0.5);
  backdrop-filter: blur(2px);
  &__wrapper {
    position: relative;
  }
  &__cross {
    position: absolute;
    top: 10px;
    right: 14px;
    z-index: 10;
    font-size: 20px;
    cursor: pointer;
    color: $color-main;
  }
}

// .form {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);

//   box-shadow: $shadow-small;
//   border-radius: 10px;
//   background: $gradient-w;
// }
</style>