<template>
  <admin-aside>
    <template v-slot:content>
      <admin-users-aside-form
        v-if="getActiveUser == null"
      ></admin-users-aside-form>
      <admin-users-aside-content v-else></admin-users-aside-content>
    </template>

    <template v-slot:actions v-if="getActiveUser != null">
      <admin-aside-actions
        @show-create="setActiveUser(null)"
      ></admin-aside-actions>
    </template>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
import AdminUsersAsideContent from "@/components/admin/users/AdminUsersAsideContent.vue";
import AdminUsersAsideForm from "@/components/admin/users/AdminUsersAsideForm.vue";
import AdminAsideActions from "@/components/admin/AdminAsideActions.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AdminAside,
    AdminUsersAsideContent,
    AdminUsersAsideForm,
    AdminAsideActions,
  },

  computed: {
    ...mapGetters("admin/users", ["getActiveUser"]),
  },

  methods: {
    ...mapActions("admin/users", ["setActiveUser"]),
  },
};
</script>

<style lang="scss" scoped>
</style>