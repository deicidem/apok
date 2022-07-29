<template>
  <div class="groups-popup__wrapper">
    <div class="groups-popup">
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
      <app-loader v-if="!loaded"></app-loader>
      <template v-else>
        <div class="groups-popup__header">
          <div class="groups-popup__header__back" @click="$emit('close')">
            Назад
          </div>
          <h4 class="groups-popup__header__title">
            Группа: {{ getActiveGroup.title }}
          </h4>
        </div>
        <div class="groups-popup__content">
          <groups-popup-info
            class="groups-popup__content__info"
            :confirmRef="$refs.deleteConfirm"
            @close="$emit('close')"
          ></groups-popup-info>
          <groups-popup-users
            class="groups-popup__content__users"
            :confirmRef="$refs.deleteConfirm"
          ></groups-popup-users>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import GroupsPopupInfo from "@/components/groups/GroupsPopupInfo.vue";
import GroupsPopupUsers from "@/components/groups/GroupsPopupUsers.vue";
import AppLoader from "@/components/controls/AppLoader.vue";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    GroupsPopupInfo,
    GroupsPopupUsers,
    AppLoader,
    AppDeleteConfirmation
  },
  data: () => ({
    loaded: false,
  }),
  methods: {
    ...mapActions("groupUsers", ["fetchUsers"]),
  },
  computed: {
    // ...mapGetters("groupUsers"),
    ...mapGetters("groups", ["getActiveGroup"]),
  },
  async mounted() {
    await this.fetchUsers();
    this.loaded = true;
  },
};
</script>

<style lang="scss" scoped>
.groups-popup {
  position: relative;
  width: 1400px;
  min-height: 500px;
  background: $gradient-w;
  border-radius: 20px;
  padding: 30px;
  &__header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    &__back {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      color: $color-main;
    }
    &__title {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }
  }
  &__content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: stretch;
    &__info {
      max-width: 50%;
      width: 100%;
      min-height: 500px;
    }
    &__users {
      margin-left: 20px;
      max-width: 50%;
      width: 100%;
    }
  }
  &__wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba($black, 0.5);
  }
}
</style>