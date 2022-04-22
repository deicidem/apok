<template>
  <header class="header">
    <h1 class="title">Автоматизация процессов оценки качества данных ДЗЗ</h1>
    <div class="header-items">
      <app-auth-popup class="auth-wrapper" v-show="authPopup == true">
      </app-auth-popup>
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <router-link to="/"><img src="@/assets/img/logo.svg"></router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/tutorial">Руководства пользователя</router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/help">Помощь</router-link>
          </li>
        </ul>
      </nav>
      <div class="header-menu">
        <div class="header-menu__text">Добро пожаловать!</div>
        <div class="header-menu__buttons">
          <button class="button button-o header-menu__button">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>

          <button
            class="button button-o header-menu__button"
            @click="toggle"
          >
            <i class="fa fa-user" aria-hidden="true"></i>
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
      authPopup: false,
    };
  },
  methods: {
    toggle() {
      this.authPopup = !this.authPopup
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: absolute;
  right: 100px;
  top: 140px;
  z-index: 30;
}
.button {
  background: $gradient;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
}

.button-o {
  background: $gradient-w;
  color: $color-main-dark;
  cursor: pointer;
}
.title {
  position: relative;
  font-size: 1.5rem;
  padding: 10px;
  text-align: center;
  background: $gradient;
  box-shadow: $shadow-big;
  color: #fff;
  font-weight: 400;
}

.user-box {
  display: none;
}

.search-box {
  display: none;
}
.header-items {
  display: flex;
}
.header {
  z-index: 10;
  position: relative;
  &-user {
    display: none;
  }
  &-items {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 100px;
    box-shadow: $shadow-big;
  }

  &-nav {
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        margin-right: 50px;
        a {
          color: #000;
          font-size: 20px;
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
      margin-left: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
      margin-top: 0;
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
</style>