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

        <app-button
          type="button-g"
          class="person-wrapper__button"
          @click="showPopup = true"
        >
          Поменять пароль
        </app-button>
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
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    UserChangePasswordForm,
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
        phone: {
          title: "Телефон",
          value: "8987654321",
          editable: true,
        },
        organization: {
          title: "Организация",
          value: "Центр инновационных технологий",
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
    this.user.firstName.value = this.getUser.firstName;
    this.user.lastName.value = this.getUser.lastName;
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
    flex-direction: column;
    &__text {
      display: flex;
    }
    &__title {
      margin: 0;
      color: $color-main;
      line-height: 34px;
      width: 120px;
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
      margin-top: 30px;
      display: flex;
      justify-content: space-evenly;
    }
    &__button {
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
  width: 360px;
  padding: 0 10px;
  border-radius: 10px;
  box-shadow: $shadow-small;
  border: 1px solid transparent;
  color: $color-main;
  margin-left: -10px;

  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }
}

.check {
  color: $text-grey;
  font-size: 14px;
  margin-left: 30px;
  padding-left: 8px;
  line-height: 32px;
}
</style>