<template>
  <header class="header">
    <h1 class="title">
      <!-- Комплексная тематическая обработка данных космической съемки -->
      Автоматизированное выявление изменений на местности
    </h1>

    <div class="header-items">
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <router-link to="/">
              <img src="@/assets/img/АВИМ.svg" alt="Логотип" />
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
          <div class="button__wrapper header-menu__button-wrapper" v-if="isAuth">
            <button
              class="button button-svg button-white-gr header-menu__button"
              @click="onLogout"
            >
              <img svg-inline src="@/assets/img/header-icons/logout.svg" alt="Логин" />
            </button>
            <span class="tooltiptext">Выйти</span>
          </div>
          <div class="button__wrapper header-menu__button-wrapper" v-else>
            <router-link to="/login" custom v-slot="{ navigate }">
              <button
                class="button button-svg button-white-gr header-menu__button"
                @click="navigate"
              >
                <img svg-inline src="@/assets/img/form-icons/login-icon.svg" alt="Логин" />
              </button>
            </router-link>
            <span class="tooltiptext">Авторизоваться</span>
          </div>
          
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("users", ["getUser", "isAuth"]),
  },
  methods: {
    ...mapActions("users", ["logout"]),
    async onLogout() {
      await this.logout();
      this.$router.push('/main');
    }
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
  color: $white;
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

    background: $white;
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
          color: $black;
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
      color: $black;
    }
    &__buttons {
      display: flex;
      align-items: center;
    }
    &__button {
      width: 40px;
      height: 40px;
      &-wrapper {
        position: relative;
        margin-right: 20px;
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