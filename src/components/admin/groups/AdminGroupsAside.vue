<template>
  <admin-aside>
    <template v-slot:content>
      <admin-groups-aside-content ></admin-groups-aside-content>
    </template>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
import AdminGroupsAsideContent from "@/components/admin/groups/AdminGroupsAsideContent.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminAside,
    AdminGroupsAsideContent,
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