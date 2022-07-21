<template>
  <admin-aside-content :title="title">
    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    </template>
    
    <admin-groups-aside-content-info
      v-if="getActiveGroup != null"
      :group="getActiveGroup"
      @update="updateGroup"
      @delete="onDelete"
    ></admin-groups-aside-content-info>

    <admin-groups-aside-content-links
      v-if="getActiveGroup != null"
      :group="getActiveGroup"
    ></admin-groups-aside-content-links>
  </admin-aside-content>
</template>

<script>
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AdminGroupsAsideContentInfo from "@/components/admin/groups/AdminGroupsAsideContentInfo.vue";
import AdminGroupsAsideContentLinks from "@/components/admin/groups/AdminGroupsAsideContentLinks.vue";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminAsideContent,
    AdminGroupsAsideContentInfo,
    AdminGroupsAsideContentLinks,
    AppDeleteConfirmation,
  },
  computed: {
    ...mapGetters("admin/groups", ["getActiveGroup"]),
    title() {
      if (this.getActiveGroup != null) {
        return `Группа: ${this.getActiveGroup.title}`;
      }
      return "Группа не выбрана";
    },
  },
  methods: {
    ...mapActions("admin/groups", ["updateGroup", "deleteGroup"]),
    async onDelete(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эту группу файл?",
        message:
          "Удаление этой группы приведет к потере всех связанных с ней данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteGroup(id);
        this.pending = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>