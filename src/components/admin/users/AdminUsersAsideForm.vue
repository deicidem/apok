<template>
  <div class="admin-users-aside-form">
    <form-registration
      class="form"
      title="Создание пользователя"
      @close="$emit('close')"
    ></form-registration>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import FormRegistration from "@/components/auth/FormRegistration";

export default {
  components: {
    FormRegistration,
  },

  data() {
    return {
      firstName: null,
      lastName: null,
      mail: null,
      password: {
        password: null,
        confirm: null,
      },
      submitStatus: null,
      showMessage: false,
      message: null,
    };
  },

  validations() {
    return {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      mail: {
        required,
        email,
      },
      password: {
        password: {
          required,
          minLength: minLength(8),
        },
        confirm: {
          required,
          sameAsPassword: sameAs("password"),
        },
      },
    };
  },

  computed: {
    formInvalid() {
      return this.submitStatus === "FORM_INVALID";
    },
  },

  methods: {
    ...mapActions("admin/users", ["createUser"]),
    async submitForm() {
      this.showMessage = false;

      if (!this.$v.$invalid) {
        this.submitStatus = "PENDING";
        try {
          await this.createUser({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.mail,
            password: this.password,
          });

          this.submitStatus = "SUBMIT";
          this.message = "Пользователь успешно создан";
        } catch (error) {
          this.message = "При регистрации произошла ошибка";

          this.submitStatus = "ERROR";
        }

        this.showMessage = true;
      } else {
        this.submitStatus = "FORM_INVALID";
        return;
      }
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

  width: 100%;
  height: 100%;
  background: rgba($black, 0.5);
  backdrop-filter: blur(2px);
}

.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-shadow: $shadow-small;
  border-radius: 10px;
  background: $gradient-w;
}
</style>