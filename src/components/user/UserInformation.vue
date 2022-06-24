<template>
  <div class="person">
    <div class="person-title">Основная информация</div>
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
        <button
          class="button button-white-gr person-wrapper__button"
          v-show="!editable"
          @click="editable = !editable"
        >
          Редактировать
        </button>
        <button
          v-show="editable"
          @click="onEditDone"
          class="button button-g person-wrapper__button"
        >
          Готово
        </button>
        <button
          class="button button-g person-wrapper__button"
          @click="showPopup = true"
        >
          Поменять пароль
        </button>
      </div>
    </div>
    <portal to="password-popup">
      <user-change-password-form
        v-show="showPopup"
        @close="showPopup = false"
        @submit="updatePassword"
      ></user-change-password-form>
    </portal>
  </div>
</template>

<script>
import UserChangePasswordForm from "@/components/user/UserChangePasswordForm";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    UserChangePasswordForm,
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
  computed: {
    ...mapGetters("users", ["getUser"]),
  },
  mounted() {
    this.user.firstName.value = this.getUser.first_name;
    this.user.lastName.value = this.getUser.last_name;
    this.user.email.value = this.getUser.email;
  },
  methods: {
    ...mapActions("users", ["updateUser", "updatePassword"]),

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
  box-shadow: $shadow-big;
  &-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-title {
    font-weight: 400;
    font-size: 1.25rem;
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