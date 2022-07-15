<template>
  <admin-aside-block title="Информация о пользователе">
    <div class="content-info">
      <div class="content-info__text">
        <div class="content-info__information">
          <div
            class="content-info__editable"
            v-for="(item, key) in info"
            :key="key"
          >
            <p class="content-info__title">{{ item.title }}</p>

            <div class="content-edit">
              <div
                :contenteditable="item.editable && editable"
                @blur="onEdit($event, key)"
                class="check"
                :class="{ editme: item.editable && editable }"
              >
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-info__buttons">
        <app-button
          type="button-white-gr"
          class="content-info__button"
          v-show="!editable"
          @click="editable = !editable"
        >
          Редактировать
        </app-button>

        <app-button
          type="button-g"
          v-show="editable"
          @click="onEditDone"
          class="content-info__button"
        >
          Готово
        </app-button>

        <app-button
          type="button-r"
          @click="$emit('delete', user.id)"
          class="content-info__button"
        >
          Удалить
        </app-button>

        <app-button
          v-if="user.blocked"
          type="button-r"
          @click="$emit('unblock', user.id)"
          class="content-info__button"
        >
          Разблокировать
        </app-button>

        <app-button
          v-else
          type="button-r"
          @click="$emit('block', user.id)"
          class="content-info__button"
        >
          Заблокировать
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
  props: ["user"],
  data() {
    return {
      info: {
        firstName: {
          title: "Имя",
          value: null,
          editable: true,
        },
        lastName: {
          title: "Фамилия",
          value: null,
          editable: true,
        },
        email: {
          title: "Почта",
          value: null,
          editable: true,
        },
      },

      editable: false,
      showPopup: false,
    };
  },
  mounted() {
    this.info.firstName.value = this.user.firstName;
    this.info.lastName.value = this.user.lastName;
    this.info.email.value = this.user.email;
  },
  methods: {
    onEditDone() {
      this.editable = false;
      this.$emit("update", {
        id: this.user.id,
        firstName: this.info.firstName.value,
        lastName: this.info.lastName.value,
        email: this.info.email.value,
      });
    },
    onEdit(evt, key) {
      this.info[key].value = evt.target.innerText;
    },
  },
  watch: {
    user() {
      this.info.firstName.value = this.user.firstName;
      this.info.lastName.value = this.user.lastName;
      this.info.email.value = this.user.email;
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
      line-height: 30px;
      font-size: 14px;
      width: 90px;
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

.editme {
  width: 280px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgb($text-grey, 0.2);
  box-shadow: $shadow-small;
  color: $color-main;

  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }
}

.check {
  color: $text-grey;
  font-size: 14px;
  padding-left: 20px;
  line-height: 30px;
}
</style>