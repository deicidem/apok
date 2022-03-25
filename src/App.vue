<template>
  <div class="wrapper" @click="closeUser($event)">
    <header>
      <div class="project__name">
        <div class="project__wrapper">
          <div class="project__title">
            Автоматизация процессов оценки качества данных ДЗЗ
          </div>
        </div>
      </div>
      <div class="header__wrapper">
        <div class="links__wrapper">
          <div class="header__item logo">
            <router-link to="/">Home</router-link>
            <!-- <img src="@/assets/logo.png" /> -->
          </div>
          <div class="header__item">
            <router-link to="/about">About</router-link>
            <!-- <a href="./pages/manual.html">Руководства пользователя</a> -->
          </div>
          <div class="header__item">
            <!-- <a href="./pages/help.html">События</a> -->
          </div>
          <div class="header__item">
            <!-- <a href="./pages/help.html">Помощь</a> -->
          </div>
        </div>
        <div class="header__user">
          <div class="user-box" v-show="showUser">
            <div class="user-box-auth">Авторизация 1</div>
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

          <div class="search-box" v-show="showSearch">
            <div class="search-box-title">запрос</div>
            <div class="user-box-line"></div>
            <div class="user-box-input">
              <input type="text" placeholder="поиск" />
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
          <div class="user__item">Добро пожаловать!</div>
          <div class="user__item">
            <i
              @click="showSearch = !showSearch"
              id="search-box__click"
              class="fa fa-search search-box__click"
              aria-hidden="true"
            ></i>
            <i
              @click="showUser = !showUser"
              id="user-box__click"
              class="fa fa-user user-box__click"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUser: false,
      showSearch: false,
    };
  },
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
    closeSearch($event) {
      let el = document.querySelector(".search-box");
      if ($event.target.classList.contains("search-box__click")) {
        return;
      }
      if (this.showSearch) {
        if (!el.contains($event.target)) {
          this.showSearch = false;
        }
      }
    },
  }, 
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  color: #868686;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  font-family: Helvetica, sans-serif;
  min-width: 1024px;
  width: 100%;
  overflow: visible;
}


header,
nav,
section,
footer,
main,
article {
  display: block;
}

a {
  text-decoration: none;
}

img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  display: block;
}

.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1 1 auto;
  display: flex;
}

.container {
  max-width: 1920px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  box-sizing: border-box;
}

.authorize {
  background: url("@/assets/authorize__background.png");
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}

.registr {
  background: url("@/assets/authorize__background.png");
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}

.language {
  color: #ffffff;
  font-size: 24px;
  text-align: right;
  margin-top: 50px;
  font-weight: 400;
}

.form {
  position: absolute;
  top: 35%;
  left: 40%;
}

.title {
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  color: #ffffff;
}

.input {
  width: 100%;
  box-sizing: border-box;
  border: 4px solid transparent;
  outline: none;
  position: relative;
  margin-top: 30px;
  transition: 0.5s;
  border-radius: 4px;
}

.input input {
  padding: 20px 0;
  padding-left: 50px;
  outline: none;
  width: 400px;
  font-size: 16px;
  border-radius: 4px;
  border: 0;
}

.input:focus-within {
  border: 4px solid #618580;
  box-shadow: 0 0 16px 0 #618580;
  -webkit-box-shadow: 0 0 16px 0 #618580;
  -moz-box-shadow: 0 0 16px 0 #618580;
}

.input:focus-within .fa {
  color: #618580;
}

.input i {
  position: absolute;
  top: 18px;
  left: 10px;
  font-size: 24px;
}

.button {
  background: rgb(97, 133, 128, 0.6);
  border: 3px solid #618580;
  margin-top: 30px;
  border-radius: 35px;
  font-size: 22px;
  color: #ffffff;
  display: block;
  text-align: center;
  line-height: 59px;
  font-weight: 400;
}

.button-registr {
  border: 3px solid #618580;
  margin-top: 30px;
  border-radius: 35px;
  font-size: 22px;
  color: #ffffff;
  display: block;
  text-align: center;
  line-height: 59px;
  font-weight: 400;
}

.button:hover {
  box-shadow: 0 0 16px 0 #618580;
  -webkit-box-shadow: 0 0 16px 0 #618580;
  -moz-box-shadow: 0 0 16px 0 #618580;
  transition: all 0.4s ease-out;
}

.button-registr:hover {
  box-shadow: 0 0 16px 0 #618580;
  -webkit-box-shadow: 0 0 16px 0 #618580;
  -moz-box-shadow: 0 0 16px 0 #618580;
  transition: all 0.4s ease-out;
}

.registr-form__sign-in {
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
  display: block;
  font-weight: 400;
}

.registr-form__sign-in:hover {
  color: #618580;
  transition: all 0.4s ease-out;
}

/* _____________________index.html__________________ */

header {
  z-index: 1;
  box-shadow: 0 0 16px 0 #384342;
  -webkit-box-shadow: 0 0 16px 0 #384342;
  -moz-box-shadow: 0 0 16px 0 #384342;
}

.project__name {
  background-color: #618580;
}

.project__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.project__title {
  width: 50%;
  padding: 16px;
  color: #fff;
  line-height: 150%;
  font-size: 20px;
  text-align: center;
  font-weight: 400;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 0px 20px;
  background-color: #384342;
  border-top: 1px solid #fff;
  

}

.links__wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header__user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.user__item i:hover {
  color: #618580;
  text-shadow: 0 0 16px 0 #618580;
  -webkit-text-shadow: 0 0 16px 0 #618580;
  -moz-text-shadow: 0 0 16px 0 #618580;
}

.user__item {
  text-align: right;
  color: #fff;
  font-weight: 400;
  font-size: 18px;
}

.user__item i {
  margin: 10px;
  font-size: 24px;
}

/* ______________________user-box____________________ */

.user-box {
  display: block;
  position: absolute;
  background-color: #fff;
  width: 300px;
  height: 330px;
  z-index: 30;
  top: 100%;
  right: 0px;
  border-left: 2px solid #618580;
  border-bottom: 2px solid #618580;
  border-right: 2px solid #618580;
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: 0.8s;
}

.user-box-auth {
  text-align: center;
  margin: 10px;
  color: #618580;
  font-weight: 400;
  font-size: 18px;
}

.user-box-line {
  border-top: 2px solid #618580;
  width: 140px;
  margin: 0 auto;
}

.user-box-input {
  box-sizing: border-box;
  border: 2px solid transparent;
  outline: none;
  position: relative;
  margin-top: 16px;
  transition: 0.5s;
  border-radius: 4px;
}

.user-box-input input {
  display: block;
  padding: 10px 0;
  padding-left: 40px;
  margin: 0 auto;
  outline: none;
  font-size: 16px;
  border-radius: 4px;
  border: 2px solid #618580;
}

.user-box-input i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 44px;
  font-size: 24px;
}

.user-box-input:focus-within i {
  color: #618580;
  text-shadow: 0 0 8px 0 #618580;
  -webkit-text-shadow: 0 0 8px 0 #618580;
  -moz-text-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}
.user-box-input:focus-within input {
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}

.user-box-button {
  background: rgb(97, 133, 128, 0.5);
  border: 2px solid #618580;
  margin: 16px 40px;
  border-radius: 35px;
  font-size: 18px;
  color: #ffffff;
  display: block;
  text-align: center;
  line-height: 40px;
  font-weight: 400;
}

.user-box-button-registr {
  border: 2px solid #618580;
  margin: 16px 40px;
  border-radius: 35px;
  font-size: 18px;
  color: #618580;
  display: block;
  text-align: center;
  line-height: 40px;
  font-weight: 400;
}

.user-box-button:hover {
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}

/* ______________________search-box_________________ */

.search-box {
  position: absolute;
  background-color: #fff;
  width: 300px;
  height: 132px;
  z-index: 30;
  top: 100%;
  right: 0px;
  border-left: 2px solid #618580;
  border-bottom: 2px solid #618580;
  border-right: 2px solid #618580;
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: 0.8s;
}

.search-box-title {
  text-align: center;
  margin: 10px;
  color: #618580;
  font-weight: 400;
  font-size: 18px;
}

.search-box-line {
  // border-top: 2px solid #618580;
  width: 140px;
  margin: 0 auto;
}

.user-box-button-registr:hover {
  // box-shadow: 0 0 8px 0 #618580;
  // -webkit-box-shadow: 0 0 8px 0 #618580;
  // -moz-box-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}

header a {
  text-decoration: none;
  color: #fff;
  font-weight: 400;
  font-size: 18px;
  padding: 6px 15px;
  box-sizing: border-box;
}

header a:hover {
  // background: #618580;
  border-radius: 4px;
  transition: background-color 0.6s ease-out;
}

.header__item {
  margin-right: 40px;
}

.logo {
  max-width: 120px;
}

content {
  width: 100%;
}

.menu {
  height: 100%;
}

.sidebar {
  position: absolute;
}
</style>