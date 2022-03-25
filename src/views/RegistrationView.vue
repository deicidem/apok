<template>
  <section class="registr">
        <div class="container">
          <router-link to="login" class="exit">Назад</router-link>
            <div class="language">EN | RU</div>
            <div class="form">
                <div class="title">Регистрация</div>
                <form>
                    <div class="input">
                        <input type="email" placeholder="почтовый адрес" v-model="user.mail">
                        <i class="fa fa-solid fa-envelope"></i>
                    </div>
                    <div class="input">
                        <input type="login" placeholder="логин" v-model="user.login">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </div>
                    <div class="input">
                        <input type="password" placeholder="пароль" v-model="user.password">
                        <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div class="input">
                        <input type="password" placeholder="повторите пароль" v-model="user.passwordSecond">
                        <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <a @click="submit" class="button-registr">Регистрация</a>
                </form>
                <a href="./authorize.html" class="registr-form__sign-in">Авторизоваться</a>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      user: {
        mail:"",
        login: "",
        password: "",
        passwordSecond: ""
      }
    }
  },
  methods: {
    ...mapActions('users', {
      addUser: 'addUser'
    }),
    submit() {
      this.addUser(this.user)
    }
  }
}
</script>

<style lang="scss">
  .registr {
    position: absolute;
    top: 0;
    z-index: 1;
    left: 0;
  }
</style>