<template>
  <admin-aside-content :title="title">
    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    </template>

    <admin-users-aside-content-info
      v-if="getActiveUser != null"
      :user="getActiveUser"
      @update="updateUser"
      @delete="onDelete"
      @block="onBlock"
      @unblock="unblockUser"
    ></admin-users-aside-content-info>

    <admin-users-aside-content-links></admin-users-aside-content-links>
  </admin-aside-content>
</template>

<script>
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AdminUsersAsideContentInfo from "@/components/admin/users/AdminUsersAsideContentInfo.vue";
import AdminUsersAsideContentLinks from "@/components/admin/users/AdminUsersAsideContentLinks.vue";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminAsideContent,
    AdminUsersAsideContentInfo,
    AdminUsersAsideContentLinks,
    AppDeleteConfirmation,
  },

  computed: {
    ...mapGetters("admin", ["getActiveUser"]),
    title() {
      if (this.getActiveUser != null) {
        return `Пользователь: ${this.getActiveUser.firstName} ${this.getActiveUser.lastName}`;
      }
      return "Пользователь не выбран";
    },
  },

  methods: {
    ...mapActions("admin", [
      "updateUser",
      "deleteUser",
      "blockUser",
      "unblockUser",
    ]),
    async onDelete(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить этого пользователя?",
        message:
          "Удаление этого пользователя приведет к потере всех связанных с ним данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteUser(id);
        this.pending = false;
      }
    },

    async onBlock(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите заблокировать этого пользователя?",
        actionMessage: "Заблокировать",
      });
      if (ok) {
        this.pending = true;
        await this.blockUser(id);
        this.pending = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>