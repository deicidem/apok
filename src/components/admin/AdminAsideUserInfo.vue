<template>
  <div class="person">
    <div class="person-title">Личные данные</div>
    <div class="person-wrapper">
      <div class="person-wrapper__text">
        <div class="person-wrapper__information">
          <div
            class="person-wrapper__editable"
            v-for="(item, key) in user"
            :key="key"
          >
            <p class="person-wrapper__title">{{ item.title }}</p>
            <div class="person-edit">
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

      <div class="person-wrapper__buttons">
        <app-button
          type="button-white-gr"
          class="person-wrapper__button"
          v-show="!editable"
          @click="editable = !editable"
        >
          Редактировать
        </app-button>

        <app-button
          type="button-g"
          v-show="editable"
          @click="onEditDone"
          class="person-wrapper__button"
        >
          Готово
        </app-button>

        <app-button type="button-r" class="person-wrapper__button"
          >Удалить</app-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    AppButton,
  },
  data() {
    return {
      user: {
        firstName: {
          title: "Имя",
          value: "Ann",
          editable: true,
        },
        lastName: {
          title: "Фамилия",
          value: "Afanaseva",
          editable: true,
        },
        email: {
          title: "Почта",
          value: "Ann@mail.ru",
          editable: true,
        },
      },

      editable: false,
      showPopup: false,
    };
  },
  mounted() {
    this.user.firstName.value = this.getUser.firstName;
    this.user.lastName.value = this.getUser.lastName;
    this.user.email.value = this.getUser.email;
  },
  methods: {
    onEditDone() {
      this.editable = false;
      this.updateUser({
        firstName: this.user.firstName.value,
        lastName: this.user.lastName.value,
        email: this.user.email.value,
      });
    },

    onEdit(evt, key) {
      this.user[key].value = evt.target.innerText;
    },
  },
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
      width: 80px;
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