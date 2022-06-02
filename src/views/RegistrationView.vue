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

        <form
          class="form-wrapper"
          id="registration"
          @submit="checkForm"
          action="https://vuejs.org/"
          method="post"
        >
          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="user.login"
              required
            />
            <label class="input-label">Логин</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/login-icon.svg"
            />
          </div>

          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="user.user"
              required
            />
            <label class="input-label">Почтовый адрес</label>

            <img svg-inline class="input-img" src="@/assets/img/mail.svg" />
          </div>

          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="user.password"
              required
            />
            <label class="input-label">Пароль</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/lock-icon.svg"
            />
          </div>

          <div class="input-wrapper">
            <input
              placeholder=" "
              class="input input-withIcon"
              v-model.trim="user.password"
              required
            />
            <label class="input-label">Повторите пароль</label>

            <img
              svg-inline
              class="input-img"
              src="@/assets/img/lock-icon.svg"
            />
          </div>

          <button @click="submit" class="button button-g form-wrapper__item">
            Зарегистироваться
          </button>

          <router-link to="/login">
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errors: [],
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
    checkForm(e) {
      if (this.user.login && this.user.password) {
        return true;
      }

      this.errors = [];

      if (!this.user.login) {
        this.errors.push("Требуется указать логин.");
      }
      if (!this.user.password) {
        this.errors.push("Требуется указать пароль.");
      }

      e.preventDefault();
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

  display: flex;
  flex-direction: column;
  text-align: center;

  width: 100%;
  height: 100%;
  background: url("@/assets/img/authorize__background.png");
  background-size: cover;
}
.back {
  display: flex;
  align-items: center;
  cursor: pointer;
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
  padding: 30px;

  background: $gradient-w;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow-big;
  &-title {
    margin-bottom: 24px;

    text-align: center;
    font-size: 20px;

    color: #000;
  }
  &-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    &__item {
      width: 300px;
      height: 40px;
      margin: 10px auto;

      font-size: 16px;
    }
  }
}
</style>