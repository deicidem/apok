<template>
  <div class="group-user" v-if="getActiveGroup != null || this.getSelectedUsers.length != 0">
    <div class="group-user__content">
      <div class="group-user__text">Группа: {{getActiveGroup != null ? getActiveGroup.title : "Не выбрана"}}</div>
      <div class="group-user__text">Выбрано пользователей: {{getSelectedUsers.length}}</div>
    </div>
    <app-button type="button-g" @click="addUsers({groupId: getActiveGroup.id, users: getSelectedUsers})">Добавить в группу</app-button>
  </div>  
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AppButton
  },
  computed: {
    ...mapGetters('admin/groups', ['getActiveGroup']),
    ...mapGetters('admin/users', ['getUsers', 'getSelectedUsers']),
  },
  methods: {
    ...mapActions('admin/groups', ['addUsers'])
  }
}
</script>

<style lang="scss" scoped>
  .group-user {
    text-align: left;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__content {
      margin-right: 50px;
    }
    &__text {
      font-size: 12px;
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>