<template>
  <admin-aside-content :title="title">
    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    </template>
    <admin-files-aside-content-info
      v-if="getActiveFile != null"
      :file="getActiveFile"
      @update="updateFile"
      @delete="onDelete"
    ></admin-files-aside-content-info>
    <admin-files-aside-content-links
      v-if="getActiveFile != null"
      @filterByUser="filterByUser(getActiveFile.user.id)"
    ></admin-files-aside-content-links>
  </admin-aside-content>
</template>

<script>
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AdminFilesAsideContentInfo from "@/components/admin/files/AdminFilesAsideContentInfo.vue";
import AdminFilesAsideContentLinks from "@/components/admin/files/AdminFilesAsideContentLinks.vue";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminAsideContent,
    AdminFilesAsideContentInfo,
    AdminFilesAsideContentLinks,
    AppDeleteConfirmation,
  },
  computed: {
    ...mapGetters("admin/files", ["getActiveFile"]),
    title() {
      if (this.getActiveFile != null) {
        return `Файл: ${this.getActiveFile.name}`;
      }
      return "Файл не выбрана";
    },
  },
  methods: {
    ...mapActions("admin/files", ["updateFile", "deleteFile", "filterByUser"]),
    async onDelete(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить этот файл?",
        message:
          "Удаление этого файла приведет к потере всех связанных с ним данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteFile(id);
        this.pending = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>