<template>
  <header class="header" @click="closeUser">
    <h1 class="title">Автоматизация процессов оценки качества данных ДЗЗ</h1>
    <div class="header-items">
      <app-auth-popup v-show="showUser" class="auth-wrapper"> </app-auth-popup>
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <router-link to="/"
              ><img src="@/assets/img/logo.svg"
            /></router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/tutorial">Руководства пользователя</router-link>
          </li>
        </ul>
      </nav>
      <div class="header-menu">
        <div class="header-menu__text">Добро пожаловать!</div>
        <div class="header-menu__buttons">

          <button
            @click="showUser = true"
            class="button button-svg header-menu__button"
          >
            <img src="@/assets/img/login-icon.svg" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppAuthPopup from "@/components/AppAuthPopup";

export default {
  components: {
    AppAuthPopup,
  },
  data() {
    return {
      showUser: false,
    };
  },
  methods: {
    closeUser($event) {
      let el = document.querySelector(".auth-popup");
      if ($event.target.classList.contains("header-menu__button")) {
        return;
      }
      if (this.showUser) {
        if (!el.contains($event.target)) {
          this.showUser = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  position: relative;

  padding: 10px;

  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;

  background: $gradient;
  box-shadow: $shadow-big;
  color: #fff;
}
.user-box {
  display: none;
}
.auth-wrapper {
  position: absolute;
  right: 70px;
  top: 170px;
  z-index: 30;
}
.search-box {
  display: none;
}
.header {
  z-index: 10;
  position: relative;
  &-user {
    display: none;
  }
  &-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 100px;

    background: #fff;
    box-shadow: $shadow-big;
  }
  &-nav {
    ul {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;

      list-style: none;
      li {
        margin-right: 50px;
        a {
          color: #000;
          font-size: 20px;
          img {
            max-height: 60px;
          }
        }
      }
    }
  }
  &-menu {
    display: flex;
    align-items: center;
    &__text {
      margin-right: 50px;
      font-size: 1.25rem;
      color: #000;
    }
    &__buttons {
      display: flex;
      align-items: center;
    }
    &__button {
      margin-right: 20px;
      width: 40px;
      height: 40px;
      img {
        max-width: 100%;
      }
      // На IE 11 не работает
      @supports (background-clip: text) {
        i {
          background: $gradient;
          background-clip: text;
          color: rgba(0, 0, 0, 0);
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .title {
    padding: 8px;

    font-size: 1.125rem;
  }
  .header {
    &-items {
      padding: 10px 80px;
    }
    &-menu {
      &__button {
        width: 34px;
        height: 34px;
        margin-right: 16px;
      }
    }
  }
}
</style>