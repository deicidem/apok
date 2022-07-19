<template>
  <admin-main :title="title" :loading="loading">
    <template v-slot:header-block>
      <admin-content-group-user></admin-content-group-user>
    </template>
    <template v-slot:content>
      <admin-users-content></admin-users-content>
    </template>
    <template v-slot:aside>
      <admin-users-aside></admin-users-aside>
    </template>
  </admin-main>
</template>

<script>
import AdminMain from "@/components/admin/AdminMain.vue";
import AdminUsersContent from "@/components/admin/users/AdminUsersContent.vue";
import AdminUsersAside from "@/components/admin/users/AdminUsersAside.vue";
import AdminContentGroupUser from "@/components/admin/AdminContentGroupUser.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminMain,
    AdminUsersContent,
    AdminUsersAside,
    AdminContentGroupUser
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('admin/users', ['getUsers', 'getUsersMap', 'getUsersGroup']),
    title() {
      if (this.getUsersGroup != null) {
        return `Пользователи (Группа - ${this.getUsersGroup.title})`
      } else {
        return `Пользователи`
      }
    }
  },
  methods: {
    ...mapActions('admin/users', ['fetchUsers', 'filterByGroup', 'setActiveUser', 'reloadUsers', 'fetchAll'])
  },
  async mounted() {
    
    if (this.$route.query?.groupId) {
      await this.filterByGroup(this.$route.query?.groupId);
    } else {
      if (this.getUsers != null) {
        await this.reloadUsers();
      } else {
        await this.fetchAll();
      }
    }
    if (this.$route.query?.userId) {
      this.setActiveUser(this.$route.query?.userId)
    }
    this.loading = false;
  },
};
</script>

<style>
</style>