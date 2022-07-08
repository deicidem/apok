<template>
  <admin-main title="Пользователи" :loading="loading">
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
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminMain,
    AdminUsersContent,
    AdminUsersAside,
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('admin/users', ['getUsersMap']),
  },
  methods: {
    ...mapActions('admin/users', ['loadUsers', 'setActiveUser'])
  },
  async mounted() {
    await this.loadUsers();
    if (this.$route.query?.userId) {
      this.setActiveUser(this.$route.query?.userId)
    }
    this.loading = false;
  },
};
</script>

<style>
</style>