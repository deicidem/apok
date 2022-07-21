<template>
  <admin-aside>
    <template v-slot:content>
      <admin-groups-aside-form
        v-show="showPopup"
        @close="showPopup = false"
      ></admin-groups-aside-form>

      <admin-groups-aside-content></admin-groups-aside-content>
    </template>

    <template v-slot:actions>
      <admin-aside-actions
        title="Создать группу"
        @show-create="setActiveGroup(null)"
        @showPopup="showPopup = true"
      ></admin-aside-actions>
    </template>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
import AdminGroupsAsideContent from "@/components/admin/groups/AdminGroupsAsideContent.vue";
import AdminGroupsAsideForm from "@/components/admin/groups/AdminGroupsAsideForm.vue";
import AdminAsideActions from "@/components/admin/AdminAsideActions.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showPopup: false,
    };
  },

  components: {
    AdminAside,
    AdminGroupsAsideContent,
    AdminGroupsAsideForm,
    AdminAsideActions,
  },

  computed: {
    ...mapGetters("admin/groups", ["getActiveGroup"]),
  },

  methods: {
    ...mapActions("admin/groups", ["setActiveGroup"]),
  },
};
</script>

<style lang="scss" scoped>
</style>