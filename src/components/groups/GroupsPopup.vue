<template>
  <div class="groups-popup__wrapper">
    <div class="groups-popup">
      <div class="groups-popup__header">
        <div class="groups-popup__header__back">Назад</div>
        <h4 class="groups-popup__header__title">
          Группа: Центр иновационных технологий
        </h4>
      </div>
      <div class="groups-popup__content">
        <groups-popup-info ></groups-popup-info>
        <groups-popup-users class="groups-popup__content__users"></groups-popup-users>
      </div>
    </div>
  </div>
</template>

<script>
import GroupsPopupInfo from "@/components/groups/GroupsPopupInfo.vue"
import GroupsPopupUsers from "@/components/groups/GroupsPopupUsers.vue"
export default {
  components: {
    GroupsPopupInfo,
    GroupsPopupUsers
  }
};
</script>

<style lang="scss" scoped>
.groups-popup {
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
    &__back {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      color: $color-main; 
    }
    &__title {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
    }
  }
  &__content {
    &__users {
      max-width: 60%;
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