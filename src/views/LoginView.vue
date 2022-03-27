<template>
  <section class="authorize">
        <div class="container">
            <div class="language">EN | RU</div>
            <div class="form">
                <div class="title">Обработка данных ДЗЗ</div>
                <form>
                    <div class="input">
                        <input type="login" placeholder="логин" v-model="user.login">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </div>
                    <div class="input">
                        <input type="password" placeholder="пароль" v-model="user.password">
                        <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <a @click="authorize(user)"  class="button"><p>Войти</p></a>
                    <!-- <a href="./registration.html" class="button-registr">Регистрация</a> -->
                </form>
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
        login: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions('users', {
      authorize: 'authorizeUser'
    })
  }
}
</script>

<style lang="scss">
  .authorize {
    position: absolute;
    top: 0;
    z-index: 1;
    left: 0;
  }
</style>