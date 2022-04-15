<template>
  <section class="authorize">
    <div class="container">
      <div class="back">
        <div class="back-arrow">
          <img src="@/assets/img/arrow-w.svg" />
        </div>
        <p class="back-subtitle">Назад</p>
      </div>

      <div class="form">
        <div class="form-title">Регистрация</div>

        <form class="form-wrapper">
          <app-input
            class="form-wrapper__item"
            label="почтовый адрес"
            v-model="user.mail"
          >
          </app-input>

          <app-input
            class="form-wrapper__item"
            label="логин"
            v-model="user.login"
          >
          </app-input>

          <app-input
            class="form-wrapper__item"
            label="пароль"
            v-model="user.password"
          >
          </app-input>

          <app-input
            class="form-wrapper__item"
            label="повторите пароль"
            v-model="user.passwordSecond"
          >
          </app-input>

          <app-button @click="submit" class="form-wrapper__item button"
            >Зарегистироваться</app-button
          >
          <router-link class="form-wrapper__item" to="/login">
            <app-button type="white" class="form-wrapper__item button"
              >Авторизоваться</app-button
            >
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";

import { mapActions } from "vuex";

export default {
  components: {
    AppButton,
    AppInput,
  },
  data() {
    return {
      user: {
        mail: "",
        login: "",
        password: "",
        passwordSecond: "",
      },
    };
  },
  methods: {
    ...mapActions("users", {
      addUser: "addUser",
    }),
    submit() {
      this.addUser(this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.authorize {
  position: absolute;
  top: 0;
  z-index: 1;
  left: 0;
  background: url("@/assets/img/authorize__background.png");
  width: 100%;
  height: 100%;
  background-size: cover;
  .back {
    margin: 40px;
    display: flex;
    align-items: center;
    &-arrow {
      width: 30px;
    }
    p {
      margin-left: 10px;
      color: #fff;
    }
  }

  .form {
    background: $gradient-w;
    margin: 30px 0 0 0;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    border: none;
    box-shadow: $shadow-big;
    margin: 10% auto;
    &-title {
      text-align: center;
      font-size: 24px;
      color: $text-grey;
      margin: 20px 0;
    }
    &-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      &__item {
        width: 300px;
        margin: 10px auto;
        font-size: 18px;
        input {
          position: relative;
        }
      }
      &__icon {
        position: absolute;
      }
      .button {
        height: 40px;
      }
    }
  }
}
</style>