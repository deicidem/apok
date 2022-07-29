<template>
  <admin-main :title="title" :loading="loading">
    <template v-slot:header-block>
      <admin-content-group-user></admin-content-group-user>
    </template>
    <template v-slot:content>
      <admin-groups-content></admin-groups-content>
    </template>
    <template v-slot:aside>
      <admin-groups-aside></admin-groups-aside>
    </template>
  </admin-main>
</template>

<script>
import AdminMain from "@/components/admin/AdminMain.vue";
import AdminGroupsContent from "@/components/admin/groups/AdminGroupsContent.vue";
import AdminGroupsAside from "@/components/admin/groups/AdminGroupsAside.vue";
import AdminContentGroupUser from "@/components/admin/AdminContentGroupUser.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminMain,
    AdminGroupsContent,
    AdminGroupsAside,
    AdminContentGroupUser
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('admin/groups', ['getGroupsUser', 'getGroupsOwner']),
    title() {
      let extension = [];
      if (this.getGroupsUser != null) {
        extension.push(`Пользователь - ${this.getGroupsUser.name}`)
      }
      if (this.getGroupsOwner != null) {
        extension.push(`Владелец - ${this.getGroupsOwner.name}`)
      }
      return extension.length > 0 ? `Группы (${extension.join(', ')})` : "Группы";
    }
  },
  methods: {
    ...mapActions('admin/groups', ['fetchGroups', 'filterByUser', 'filterByOwner', 'fetchAll'])
  },
  async mounted() {
    if (this.$route.query?.userId) {
      await this.filterByUser(this.$route.query?.userId);
    } else if (this.$route.query?.ownerId) {
      await this.filterByOwner(this.$route.query?.ownerId);
    } else {
      await this.fetchAll();
    }
    this.loading = false;
  },
};
</script>

<style>
</style>