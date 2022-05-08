<template>
<div class="header__user">
    <div class="user-box" v-show="showUser">
    <div class="user-box-auth">Авторизация</div>
    <div class="user-box-line"></div>
    <div class="user-box-form">
        <form>
          <div class="input-wrapper">
            <input class="input input-withIcon" v-model="user.login" required />
            <label class="input-label">Логин</label>

            <img class="input-img" src="@/assets/img/header-logo.svg" />
          </div>
           <div class="input-wrapper">
            <input
              class="input input-withIcon"
              v-model="user.password"
              required
            />
            <label class="input-label">Пароль</label>

            <img class="input-img" src="@/assets/img/lock-icon.svg" />
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


