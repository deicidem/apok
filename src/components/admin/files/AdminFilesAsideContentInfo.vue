<template>
  <admin-aside-block title="Информация о файле">
    <div class="content-info">
      <div class="content-info__text">
        <div class="content-info__information">
          <div class="content-info__editable">
            <p class="content-info__title">Имя</p>
            <div class="content-edit">
              <div class="check">{{ file.name }}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Дата добавления</p>
            <div class="content-edit">
              <div class="check">{{ file.date }}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Тип</p>
            <div class="content-edit">
              <div class="check">{{ file.type }}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Пользователь</p>
            <div class="content-edit">
              <router-link
                class="check link"
                :to="{ path: '/admin/users', query: { userId: file.user.id } }"
              >
                {{ file.user.firstName }} {{file.user.lastName}}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="content-info__buttons">
        <app-button
          type="button-r"
          @click="$emit('delete', file.id)"
          :disabled="!file.deletable"
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
  props: ["file"],
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
      width: 130px;
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

.link {
  text-decoration: underline;
  color: $color-main-dark;
}
</style>