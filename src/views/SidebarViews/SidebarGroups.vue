<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои группы</h2>
    </template>

    <template v-slot:popups>
      <add-group v-show="showPopup" @close="showPopup = false"></add-group>
    </template>

    <template v-slot:content>
      <div class="person-wrapper">
        <div class="person-content">
          <groups-information :groups="getGroups"></groups-information>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import GroupsInformation from "@/components/groups/GroupsInformation";
import AddGroup from "@/components/groups/AddGroup";
import SidebarBase from "@/components/SidebarBase";
import "vuescroll/dist/vuescroll.css";
import {mapGetters, mapActions} from "vuex"
export default {
  components: {
    GroupsInformation,
    SidebarBase,
    AddGroup,
  },
  data: () => ({
    loaded: false,
  }),
  async mounted() {
    await this.loadGroups();
    this.loaded = true;
  },
  computed: {
    ...mapGetters('groups', ['getGroups'])
  },
  methods: {
    ...mapActions('groups', ['loadGroups'])
  }
};
</script>


<style scoped lang="scss">
.person {
  &-wrapper {
    padding: 30px;
  }

  &-content {
    width: 100%;
    height: 100%;
  }
}
</style>