<template>
  <admin-aside-block title="Информация о задаче">
    <div class="content-info">
      <div class="content-info__text">
        <div class="content-info__information">
          <div class="content-info__editable">
            <p class="content-info__title">Название</p>
            <div class="content-edit">
              <div class="check">{{ task.title }}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Дата добавления</p>
            <div class="content-edit">
              <div class="check">{{ task.date }}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Статус</p>
            <div class="content-edit" v-if="!isNaN(+task.status)">
              <div class="check">Выполняется: {{ task.status }}%</div>
            </div>
            <div class="content-edit" v-else>
              <div class="check">{{ task.status }}</div>
            </div>
          </div>
          <div
            class="person-wrapper__editable"
          >
            <p class="person-wrapper__title">Пользователь</p>
            <div class="person-edit">
              <router-link :to="{ path: '/admin/users', query: { userId: task.userId }}">
                {{task.userName}}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="content-info__buttons">
        <app-button
          type="button-r"
          @click="$emit('delete', task.id)"
          :disabled="!task.deletable"
          class="content-info__button"
        >
          Удалить
        </app-button>
      </div>
    </div>

    <!-- <div class="content-wrapper">
      <div class="content-wrapper__text">
        <div class="content-info__information">
          <div
            class="content-info__editable"
            v-for="(item, key) in info"
            :key="key"
          >
            <p class="content-info__title">{{ item.title }}</p>
            <div class="content-edit">
              <div class="check">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-info__buttons">
        <app-button
          type="button-r"
          @click="$emit('delete', task.id)"
          :disabled="!task.deletable"
          class="content-info__button"
        >
          Удалить
        </app-button>
      </div>
    </div> -->
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
  // data() {
  //   return {
  //     info: {
  //       title: {
  //         title: "Название",
  //         value: null,
  //         editable: true,
  //       },
  //       date: {
  //         title: "Дата добавления",
  //         value: null,
  //         editable: true,
  //       },
  //       status: {
  //         title: "Статус",
  //         value: null,
  //         editable: true,
  //       },
  //       user: {
  //         title: "Пользователь",
  //         value: null,
  //         editable: true,
  //       },
  //     },

  //     editable: false,
  //     showPopup: false,
  //   };
  // },
  // mounted() {
  //   this.info.title.value = this.task.title;
  //   this.info.date.value = this.task.date;
  //   this.info.status.value = this.task.status;
  //   this.info.user.value = this.task.user;
  // },
  // watch: {
  //   task() {
  //     this.info.title.value = this.task.title;
  //     this.info.date.value = this.task.date;
  //     this.info.status.value = this.task.status;
  //     this.info.user.value = this.task.user;
  //   },
  // },
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
      width: 100px;
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