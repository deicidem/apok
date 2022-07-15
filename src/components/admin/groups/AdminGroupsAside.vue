<template>
  <admin-aside>
    <template v-slot:content>
      <admin-groups-aside-form
        v-if="getActiveGroup == null"
      ></admin-groups-aside-form>
      <admin-groups-aside-content v-else></admin-groups-aside-content>
    </template>
    <template v-slot:actions v-if="getActiveGroup != null">
      <admin-aside-actions
        title="Создать группу"
        @show-create="setActiveGroup(null)"
      ></admin-aside-actions>
    </template>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
import AdminGroupsAsideContent from "@/components/admin/groups/AdminGroupsAsideContent.vue";
import AdminGroupsAsideForm from "@/components/admin/groups/AdminGroupsAsideForm.vue";
import AdminAsideActions from "@/components/admin/AdminAsideActions.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminAside,
    AdminGroupsAsideContent,
    AdminGroupsAsideForm,
    AdminAsideActions
  },
  computed: {
    ...mapGetters('admin/groups', ['getActiveGroup']),
  },
  methods: {
    ...mapActions('admin/groups', ['setActiveGroup'])
  }
  
};
</script>

<style lang="scss" scoped>
</style>