<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои группы</h2>
    </template>

    <template v-slot:popups>
      <groups-sidebar-form
        v-show="showPopup"
        @close="showPopup = false"
      ></groups-sidebar-form>
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

          <app-button
            class="group-button"
            type="button-g"
            @click="showPopup = true"
          >
            Добавить новую группу
          </app-button>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import GroupsInformation from "@/components/groups/GroupsInformation.vue";
import SidebarBase from "@/components/SidebarBase.vue";
import GroupsSidebarForm from "@/components/groups/GroupsSidebarForm";
import AppPagination from "@/components/controls/AppPagination";
import "vuescroll/dist/vuescroll.css";
import AppButton from "@/components/controls/AppButton";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    GroupsInformation,
    SidebarBase,
    AppPagination,
    GroupsSidebarForm,
    AppButton,
  },

  data: () => ({
    loaded: false,
    showPopup: false,
  }),

  async mounted() {
    await this.fetchGroups();
    this.loaded = true;
  },

  computed: {
    ...mapGetters("groups", ["getGroups", "getPagination", "isPending"]),
  },

  methods: {
    ...mapActions("groups", ["fetchGroups"]),
  },
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

.group {
  &-button {
    max-width: 230px;
    margin: 20px auto;
  }
}
</style>