<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои группы</h2>
    </template>
    <template v-slot:content>
      <div class="person-wrapper">
        <div class="person-content">
          <groups-information :groups="getGroups"></groups-information>
            <app-pagination
            :page-count="getPagination.last"
            @changePage="fetchGroups"
            :current-page="getPagination.currentPage"
          ></app-pagination>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import GroupsInformation from "@/components/groups/GroupsInformation.vue";
import SidebarBase from "@/components/SidebarBase.vue";
import AppPagination from "@/components/controls/AppPagination";
import "vuescroll/dist/vuescroll.css";
import {mapGetters, mapActions} from "vuex"
export default {
  components: {
    GroupsInformation,
    SidebarBase,
    AppPagination,
  },
  data: () => ({
    loaded: false,
  }),
  async mounted() {
    await this.fetchGroups();
    this.loaded = true;
  },
  computed: {
    ...mapGetters('groups', ['getGroups', "getPagination", "isPending"])
  },
  methods: {
    ...mapActions('groups', ['fetchGroups'])
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