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

          <button @click="submit" class="button button-g form-wrapper__item">
            Зарегистироваться
          </button>
          <router-link class="button-router" to="/login">
            <button class="button button-white form-wrapper__item">
              Авторизоваться
            </button>
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import AppInput from "@/components/controls/AppInput.vue";
import { mapActions } from "vuex";
export default {
  components: {
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
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  background: url("@/assets/img/authorize__background.png");
  background-size: cover;
  .button-router {
    margin: 0 auto;
  }
  .back {
    display: flex;
    align-items: center;
    margin: 40px;
    &-arrow {
      width: 30px;
    }
    p {
      margin-left: 10px;
      color: #fff;
    }
  }

  .form {
    margin: 10% auto;
    width: 400px;
    padding: 20px;

    background: $gradient-w;
    border-radius: 10px;
    border: none;
    box-shadow: $shadow-big;
    &-title {
      margin: 20px 0;

      text-align: center;
      font-size: 24px;

      color: $text-grey;
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