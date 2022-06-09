<template>
  <div class="person">
    <div class="person-title">Основная информация</div>
    <div class="person-wrapper">
      <div class="person-wrapper__text">
        <div class="person-wrapper__information">
          <div
            class="person-wrapper__editable"
            v-for="(item, i) in user"
            :key="i"
          >
            <p class="person-wrapper__title">{{ item.title }}</p>
            <div class="person-edit">
              <div
                :contenteditable="item.editable && editable"
                @blur="onEdit"
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
          class="button button-white person-wrapper__button"
          v-show="!editable"
          @click="editable = !editable"
        >
          Редактировать
        </button>
        <button
          v-show="editable"
          @click="editable = !editable"
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
      <app-password-popup
        v-show="showPopup"
        @close="showPopup = false"
      ></app-password-popup>
    </portal>
  </div>
</template>

<script>
import AppPasswordPopup from "@/components/cards/AppPasswordPopup.vue";

export default {
  components: {
    AppPasswordPopup,
  },
  data() {
    return {
      user: [
        {
          title: "Имя",
          value: "Ann",
          editable: true,
        },
        {
          title: "Фамилия",
          value: "Afanaseva",
          editable: true,
        },
        {
          title: "Почта",
          value: "Ann@mail.ru",
          editable: false,
        },
      ],
      editable: false,
      showPopup: false,
    };
  },
  methods: {
    onEdit(evt) {
      var newName = evt.target.innerHTML;
      this.name = newName;
    },
  },
};
</script>


<style scoped lang="scss">
.person {
  padding: 20px;

  border-radius: 10px;
  background: #fff;
  box-shadow: $shadow-big;
  &-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-title {
    font-weight: 400;
    font-size: 1.25rem;
    color: #000;
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
      color: #000;
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
  padding-left:10px;
  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }
}
.check {
  color: $text-grey;
  font-size: 14px;
  margin-left: 30px;
  padding-left:10px;
  line-height: 30px;

  width: 200px;
}
</style>