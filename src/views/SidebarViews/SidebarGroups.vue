<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои группы</h2>
    </template>

    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
      <groups-sidebar-form
        v-show="showCreateGroupForm"
        @close="showCreateGroupForm = false"
      ></groups-sidebar-form>
    </template>

    <template v-slot:content>
      <div class="groups-wrapper">
        <portal to="group-popup">
          <groups-popup v-if="showGroupPopup" @close="showGroupPopup = false">
          </groups-popup>
        </portal>
        <div class="groups-content">
          <app-search
            @search="filterBySearch($event)"
            @sort="sortBy($event)"
            @clear="fetchAll()"
            :sortOptions="getSortOptions"
            :searchOptions="getSearchOptions"
          ></app-search>

          <groups-information
            :groups="getGroups"
            :pending="isPending"
            @delete="onDelete"
            @select="selectGroup"
            @open="openGroup"
            @quit="onQuit"
          ></groups-information>

          <app-pagination
            :page-count="getPagination.last"
            @changePage="fetchGroups"
            :current-page="getPagination.currentPage"
          ></app-pagination>

          <div class="groups-buttons">
            <app-button
              class="groups-button"
              type="button-r"
              :disabled="
                noItemsSelected || notDeletableItemSelected || isPending
              "
              @click="onDeleteBanch"
            >
              Удалить выбранное
            </app-button>
            <app-button
              class="groups-button"
              type="button-g"
              @click="showCreateGroupForm = true"
            >
              Добавить новую группу
            </app-button>
          </div>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import GroupsInformation from "@/components/groups/GroupsInformation.vue";
import GroupsPopup from "@/components/groups/GroupsPopup.vue";
import SidebarBase from "@/components/SidebarBase.vue";
import GroupsSidebarForm from "@/components/groups/GroupsSidebarForm";
import AppPagination from "@/components/controls/AppPagination";
import "vuescroll/dist/vuescroll.css";
import AppButton from "@/components/controls/AppButton";
import { mapGetters, mapActions } from "vuex";
import AppSearch from "@/components/AppSearch.vue";

export default {
  components: {
    GroupsInformation,
    SidebarBase,
    GroupsSidebarForm,
    AppButton,
    AppSearch,
    AppPagination,
    AppDeleteConfirmation,
    GroupsPopup,
  },

  data: () => ({
    loaded: false,
    showCreateGroupForm: false,
    showGroupPopup: false,
  }),

  async mounted() {
    await this.fetchGroups();
    this.loaded = true;
  },

  computed: {
    ...mapGetters("groups", [
      "getGroups",
      "getPagination",
      "isPending",
      "getSortOptions",
      "getSearchOptions",
    ]),

    noItemsSelected() {
      let groups = this.getGroups;
      let res = true;
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
    notDeletableItemSelected() {
      let groups = this.getGroups;
      let res = false;
      for (let i = 0; i < groups?.length; i++) {
        if (groups[i]?.selected && !groups[i]?.isOwner) {
          res = true;
          break;
        }
      }
      return res;
    },
  },

  methods: {
    ...mapActions("groups", [
      "fetchGroups",
      "fetchAll",
      "sortBy",
      "filterBySearch",
      "setActiveGroup",
      "deleteGroups",
      "selectGroup",
      "deleteGroup",
      "quitGroup",
    ]),
    openGroup(id) {
      this.setActiveGroup(id);
      this.showGroupPopup = true;
    },
    async onQuit(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите покинуть эту группу?",
        message:
          "Выход из этой группы приведет к потере всех связанных с ней данных.",
        actionMessage: "Покинуть",
      });
      if (ok) {
        this.pending = true;
        await this.quitGroup(id);
        this.pending = false;
      }
    },

    async onDelete(id) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эту группу?",
        message:
          "Удаление этой группы приведет к потере всех связанных с ней данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteGroup(id);
        this.pending = false;
      }
    },

    async onDeleteBanch() {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эти группы?",
        message:
          "Удаление этих групп приведет к потере всех связанных с ними данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteGroups();
        this.pending = false;
      }
    },
  },
};
</script>


<style scoped lang="scss">
.groups {
  &-wrapper {
    padding: 30px;
    .links {
      font-size: 16px;
      margin-bottom: 10px;
      ul {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        list-style: none;
      }
      li {
        margin: 0 10px;
        padding: 0;
        cursor: pointer;
        &.active {
          color: $color-main;
        }
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  &-content {
    width: 100%;
    height: 100%;
  }

  &-buttons {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-button {
    flex: 1 1 auto;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>