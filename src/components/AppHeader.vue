<template>
  <header class="header" @click="closeUser">
    <h1 class="title">Комплексная тематическая обработка данных космической съемки</h1>
    <div class="header-items">
      <app-auth-popup v-show="showUser" class="auth-wrapper" ref="authPopup">
      </app-auth-popup>
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <router-link to="/">
              <img src="@/assets/img/катод.svg" alt="Логотип" />
            </router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/tutorial">Руководства пользователя</router-link>
          </li>
        </ul>
      </nav>
      <div class="header-menu">
        <div class="header-menu__text" v-if="isAuth">
          Добро пожаловать, {{ getUser.first_name }}!
        </div>
        <div class="header-menu__buttons">
          <div class="header-menu__button-wrapper">
            <button
              @click="showUser = true"
              ref="showUser"
              class="button button-svg button-white header-menu__button"
            >
              <img svg-inline src="@/assets/img/login-icon.svg" alt="Логин" />
            </button>
            <div class="tooltiptext-header">Авторизоваться</div>
          </div>
          <div class="header-menu__button-wrapper">
            <button
              class="button button-svg button-white header-menu__button"
              @click="logout"
            >
              <img svg-inline src="@/assets/img/logout.svg" alt="Логин" />
            </button>
            <div class="tooltiptext-header">Выйти</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppAuthPopup from "@/components/AppAuthPopup";
import { mapActions, mapGetters } from "vuex";
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
    ...mapActions("users", ["logout"]),
    closeUser($event) {
      if (
        this.$refs.showUser.isEqualNode($event.target) ||
        this.$refs.showUser.contains($event.target) ||
        this.$refs.authPopup.$el.contains($event.target)
      ) {
        return;
      }
      if (this.showUser) {
        this.showUser = false;
      }
    },
  },
  computed: {
    ...mapGetters("users", ["getUser", "isAuth"]),
  },
};
</script>

<style lang="scss" scoped>
.title {
  position: relative;

  padding: 10px;
  margin: 0;

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
.tooltiptext-header {
  position: absolute;
  bottom: 100%;
  right: 60%;
  transform: translate(50%, -50%);

  display: none;
  padding: 2px 5px;

  color: $color-main;
  font-size: 12px;
  background: $gradient-w;
  border-radius: 6px;
  box-shadow: $shadow-small;
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
            height: 60px;
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
      &-wrapper {
        position: relative;
        &:hover .tooltiptext-header {
          display: block;
        }
      }
      svg path {
        fill: $color-main;
      }
      &:hover {
        svg path {
          fill: $color-main-dark;
        }
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