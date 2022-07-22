<template>
  <div class="admin-groups-aside-form">
    <div class="admin-groups-aside-form__wrapper">
      <div class="admin-groups-aside-form__cross" @click="$emit('close')">
        <i class="icon icon-ic_fluent_dismiss_20_regular"></i>
      </div>
      <form-message
        v-show="showMessage"
        :error="error"
        :message="message"
      ></form-message>
      <add-group
        :pending="pending"
        @submit="onSubmit"
      ></add-group>
    </div>
  </div>
</template>

<script>
import AddGroup from "@/components/groups/AddGroup.vue";
import { mapActions } from "vuex";
import FormMessage from "@/components/auth/FormMessage.vue";
export default {
  components: {
    AddGroup,
    FormMessage,
  },
  data: () => ({
    showMessage: false,
    message: null,
    error: false,
    pending: false,
  }),
  methods: {
    ...mapActions("admin/groups", ["createGroup"]),
    async onSubmit(params) {
      this.showMessage = false;
      this.pending = true;
      try {
        await this.createGroup(params);
        this.message =
          "Группа успешно создана";
        this.error = false;
      } catch (error) {
        if (error?.response?.status == 422) {
          this.message =
            "Учетная запись  с указанными логином и паролем не существует";
        } else {
          this.message =
            "При создании группы произошла ошибка";
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
.admin-groups-aside-form {
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
    position: absolute;
    top: 10px;
    right: 14px;
    font-size: 20px;
    cursor: pointer;
    color: $color-main;
  }
}
</style>