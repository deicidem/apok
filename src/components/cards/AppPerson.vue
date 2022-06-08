<template>
  <div class="person">
    <div class="person-title">Основная информация</div>
    <div class="person-wrapper">
      <div class="person-wrapper__text">
        <div class="person-wrapper__information">
          <div class="person-wrapper__editable">
            <p class="person-wrapper__title">Имя</p>
            <div class="person-edit">
              <div :contenteditable="editable" @blur="onEdit" :class="{editme, input: editable}" class="check">{{name}}</div>
            </div>
          </div>

          <div class="person-wrapper__editable">
            <p class="person-wrapper__title">Фамилия</p>
            <div class="person-edit">
              <div :contenteditable="editable" @blur="onEdit" :class="{editme, input: editable}" class="check">{{surname}}</div>
            </div>
          </div>

          <div class="person-wrapper__editable">
            <p class="person-wrapper__title">Почта</p>
            <div class="person-edit">
              <div :contenteditable="editable" @blur="onEdit" :class="{editme, input: editable}" class="check">{{mail}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="person-wrapper__buttons">
        <button class="button button-white person-wrapper__button" v-show="!editable" @click="editable = !editable">
          Редактировать
        </button>
        <button v-show="editable" @click="editable = !editable" class="button button-g person-wrapper__button">Готово</button>
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
      showPopup: false,
      name: "Ann",
      surname: "Afanaseva",
      mail: "Ann@gmail.com",
      editable: false,
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
    min-width: 340px;
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
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
.editme {
  width: 100%;
  padding: 3px;
  border: 1px solid $text-grey-light;
  color: $text-grey-light;
  font-size: 14px;
  width: 160px;
  margin-left: 20px;
}
.check {
  color: $text-grey;
  font-size: 14px;
  margin-left: 20px;
  width: 200px;
}
</style>