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
    ...mapGetters('admin/groups', ['getGroupsUser']),
    title() {
      if (this.getGroupsUser != null) {
        return `Группы (Пользователь - ${this.getGroupsUser.name})`
      } else {
        return `Группы`
      }
    }
  },
  methods: {
    ...mapActions('admin/groups', ['loadGroups', 'loadGroupsByUser', 'loadGroupsByOwner', 'loadTypes'])
  },
  async mounted() {
    if (this.$route.query?.userId) {
      await this.loadGroupsByUser(this.$route.query?.userId);
    } else if (this.$route.query?.ownerId) {
      await this.loadGroupsByOwner(this.$route.query?.ownerId);
    } else {
      await this.loadGroups();
    }
    await this.loadTypes();
    this.loading = false;
  },
};
</script>

<style>
</style>