<template>
  <admin-aside-block title="Информация о задаче">
    <div class="person-wrapper">
      <div class="person-wrapper__text">
        <div class="person-wrapper__information">
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Название</p>
            <div class="person-edit">
              {{task.title}}
            </div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Дата добавления</p>
            <div class="person-edit">
              {{task.date}}
            </div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Статус</p>
              <div class="person-edit" v-if="!isNaN(+task.status)">
                Выполняется: {{ task.status }}%
              </div>
              <div class="person-edit" v-else>{{ task.status }}</div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Пользователь</p>
            <div class="person-edit">
              Андрей Почитаев
            </div>
          </div>
        </div>
      </div>

      <div class="person-wrapper__buttons">
        <app-button
          type="button-r"
          @click="$emit('delete', task.id)"
          :disabled="!task.deletable"
          class="person-wrapper__button"
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
  props: ["task"],
};
</script>



<style scoped lang="scss">
.person {
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

  &-wrapper {
    display: flex;
    justify-content: space-between;

    &__text {
      display: flex;
    }

    &__title {
      margin: 0;
      color: $color-main;
      line-height: 30px;
      font-size: 14px;
      margin-right: 10px;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__button {
      margin-bottom: 20px;
      width: 220px;
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

.editme {
  width: 200px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgb($text-grey, 0.2);
  box-shadow: $shadow-small;
  color: $color-main;
  padding-left: 10px;

  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }
}

.check {
  color: $text-grey;
  font-size: 14px;
  margin-left: 30px;
  padding-left: 10px;
  line-height: 30px;
  width: 200px;
}
</style>