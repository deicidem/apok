<template>
<div class="header__user">
    <div class="user-box" v-show="showUser">
    <div class="user-box-auth">Авторизация</div>
    <div class="user-box-line"></div>
    <div class="user-box-form">
        <form>
        <div class="user-box-input">
            <input type="login" placeholder="логин" />
            <i class="fa fa-sign-in" aria-hidden="true"></i>
        </div>
        <div class="user-box-input">
            <input type="password" placeholder="пароль" />
            <i class="fa fa-key" aria-hidden="true"></i>
        </div>
        <a href="./index.html" class="user-box-button"><p>Войти</p></a>
        <a
            href="./pages/registration.html"
            class="user-box-button-registr"
            >Регистрация</a
        >
        </form>
    </div>
    </div>
</template>

<script>
export default {
  name: "AppAuthorize",
  methods: {
    closeUser($event) {
      let el = document.querySelector(".user-box");
      if ($event.target.classList.contains("user-box__click")) {
        return;
      }
      if (this.showUser) {
        if (!el.contains($event.target)) {
          this.showUser = false;
        }
      }
      this.closeSearch($event);
    },
  },
};
</script>


