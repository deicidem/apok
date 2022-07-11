<template>
  <admin-aside-block title="Информация о файле">
    <div class="person-wrapper">
      <div class="person-wrapper__text">
        <div class="content-info__information">
          <div
            class="content-info__editable"
            v-for="(item, key) in info"
            :key="key"
          >
            <p class="person-wrapper__title">Имя</p>
            <div class="person-edit">
              {{group.name}}
            </div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Дата добавления</p>
            <div class="person-edit">
              {{group.date}}
            </div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Тип</p>
              <div class="person-edit" >{{ group.type }}</div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Пользователь</p>
            <div class="person-edit">
              <router-link :to="{ path: '/admin/users', query: { userId: group.userId }}">
                {{group.userName}}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="content-info__buttons">
        <app-button
          type="button-r"
          @click="$emit('delete', group.id)"
          :disabled="!group.deletable"
          class="content-info__button"
        >
          Удалить
        </app-button>
      </div>
    </div>
  </admin-aside-block>
</template>

<script>
import AdminAsideBlock from "@/components/admin/AdminAsideBlock";
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    AdminAsideBlock,
    AppButton,
  },
  props: ["group"],
  data() {
    return {
      info: {
        name: {
          title: "Имя",
          value: null,
        },
        date: {
          title: "Фамилия",
          value: null,
        },
        type: {
          title: "Почта",
          value: null,
        },
        user: {
          title: "Пользователь",
          value: null,
        },
      },
      showPopup: false,
    };
  },
  mounted() {
    this.info.name.value = this.group.name;
    this.info.date.value = this.group.date;
    this.info.type.value = this.group.type;
    this.info.user.value = this.group.user;
  },
  watch: {
    group() {
      this.info.name.value = this.group.name;
      this.info.date.value = this.group.date;
      this.info.type.value = this.group.type;
      this.info.user.value = this.group.user;
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding: 20px;

  border-radius: 10px;
  background: $white;
  box-shadow: $shadow-small;
  margin-top: 20px;

  &-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-title {
    font-weight: 400;
    font-size: 18px;
    color: $black;
    margin-bottom: 20px;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    &__text {
      display: flex;
      flex-direction: column;
    }

    &__title {
      margin: 0;
      color: $color-main;
      line-height: 20px;
      font-size: 14px;
      width: 110px;
    }

    &__info {
      color: $black;
      margin-bottom: 14px;
      font-size: 14px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__buttons {
      margin-top: 20px;
      display: flex;
    }

    &__button {
      margin-right: 20px;
      flex: 1 1 auto;
      &:last-child {
        margin-right: 0;
      }
    }

    &__editable {
      display: flex;
      align-items: center;
      margin-bottom: 14px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.check {
  color: $text-grey;
  font-size: 14px;
  padding-left: 20px;
  line-height: 20px;
}
</style>