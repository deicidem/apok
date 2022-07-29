<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои уведомления</h2>
    </template>
    <template v-slot:content>
      <div class="c-wrapper">
        <notification-card
          v-for="item in getNotifications"
          :key="item.id"
          :message="item.message"
          :type="item.type"
          :disabled="isPending"
          :read="item.read"
          @read="markAsRead(item.id)"
          @delete="deleteNotification(item.id)"
        ></notification-card>
        <app-pagination
            :page-count="getPagination.last"
            @changePage="fetchNotifications"
            :current-page="getPagination.currentPage"
          ></app-pagination>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import SidebarBase from "@/components/SidebarBase.vue";
import AppPagination from "@/components/controls/AppPagination.vue";
import NotificationCard from "@/components/notification/NotificationCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    NotificationCard,
    SidebarBase,
    AppPagination
  },
  data: () => ({
    loaded: false,
  }),
  async mounted() {
    await this.fetchNotifications();
    this.loaded = true;
  },
  computed: {
    ...mapGetters("notifications", ["getNotifications", "getPagination", "isPending"]),
  },
  methods: {
    ...mapActions("notifications", ["deleteNotification", "fetchNotifications", "markAsRead"]),
  },
};
</script>

<style lang="scss" scoped>
.c {
  &-wrapper {
    margin: 30px;
  }
}
@media screen and (max-width: 1440px) {
  .notification {
    &-wrapper {
      margin: 20px;
    }
  }
}
</style>