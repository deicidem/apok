<template>
  <div>
    <nav class="links" v-if="getActiveGroup.typeId == 2">
      <ul>
        <li @click="onChangeTable(false)" :class="{active: !getShowRequests}">Пользователи</li>
        |
        <li @click="onChangeTable(true)" :class="{active: getShowRequests}">Запросы на подтверждение</li>
      </ul>
    </nav>
    <app-search
      @search="filterBySearch($event)"
      @sort="sortBy($event)"
      @clear="fetchAll()"
      :sortOptions="getSortOptions"
      :searchOptions="getSearchOptions"
    ></app-search>
    <groups-popup-users-table
      :users="getUsers"
      :owner="getActiveGroup.owner.id"
      :pending="isPending"
      @select="selectUser"
      @delete="onExclude"
      :isRequests="isRequests"
      @verify="onVerify"
    ></groups-popup-users-table>
    <app-pagination
      :page-count="getPagination.last"
      @changePage="fetchUsers"
      :current-page="getPagination.currentPage"
    ></app-pagination>
  </div>
</template>

<script>
import AppPagination from "@/components/controls/AppPagination.vue";
import AppSearch from "@/components/AppSearch.vue";
import { mapGetters, mapActions } from "vuex";
import GroupsPopupUsersTable from "@/components/groups/GroupsPopupUsersTable.vue";
export default {
  components: {
    GroupsPopupUsersTable,
    AppSearch,
    AppPagination,
  },
  props: ["confirmRef"],
  data: () => ({
    isRequests: false,
  }),
  mounted() {
    this.isRequests = this.getShowRequests;
  },
  computed: {
    ...mapGetters("groupUsers", [
      "getUsers",
      "getPagination",
      "isPending",
      "getSortOptions",
      "getSearchOptions",
      "getShowRequests"
    ]),
    ...mapGetters("groups", ["getActiveGroup"]),
    noItemsSelected() {
      let users = this.getUsers;
      let res = true;
      for (let i = 0; i < users.length; i++) {
        if (users[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
  },
  methods: {
    ...mapActions("groupUsers", [
      "fetchUsers",
      "fetchAll",
      "sortBy",
      "filterBySearch",
      "deleteGroups",
      "selectUser",
      "deleteGroup",
      "exclude",
      "verify",
      "changeShowRequests"
    ]),
    async onExclude(id) {
      const ok = await this.confirmRef.show({
        title: "Вы уверены, что хотите исключить этого пользователя?",
        message:
          "Исключение этого пользователя приведет к потере всех связанных с ним данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.exclude(id);
        this.pending = false;
      }
    },
    async onVerify(id) {
      await this.verify(id);
    },
    async onChangeTable(val) {
      await this.changeShowRequests(val);
      this.isRequests = val;
    }
  },
};
</script>

<style lang="scss" scoped>
.links {
  font-size: 18px;
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
</style>