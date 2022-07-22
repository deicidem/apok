<template>
  <header class="header">
    <h1 class="title">
      <!-- Комплексная тематическая обработка данных космической съемки -->
      <!-- Автоматизированное выявление изменений на местности -->
      Автоматизация процессов оценки качества данных ДЗЗ
    </h1>

    <router-link to="/main" custom v-slot="{ navigate }" v-show="!showMenu">
      <div class="back" @click="navigate">
        <div class="back-arrow">
          <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
        </div>
        <span class="back-subtitle">На главную страницу</span>
      </div>
    </router-link>

    <div v-if="showMenu" class="header-items">
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <router-link to="/">
              <img src="@/assets/img/header-icons/АПОК.svg" alt="Логотип" />
            </router-link>
          </li>

          <li class="header-nav__item">
            <router-link to="/tutorial">Руководства пользователя</router-link>
          </li>
        </ul>
      </nav>

      <div class="header-menu">
        <div class="header-menu__text" v-if="isAuth">
          Добро пожаловать, {{ getUser.firstName }}!
        </div>

        <div class="header-menu__buttons">
          <div class="header-menu-button" v-if="isAuth">
            <app-button
              type="button-svg"
              size="big"
              @click="onLogout"
              tooltip="Выйти"
              ><i class="icon icon-ic_fluent_sign_out_20_regular"></i
            ></app-button>
          </div>

          <div class="header-menu-button" v-else>
            <router-link to="/login" custom v-slot="{ navigate }">
              <app-button
                type="button-svg"
                size="big"
                tooltip="Авторизоваться"
                @click="navigate"
              >
                <i class="icon icon-ic_fluent_person_20_filled"></i>
              </app-button>
            </router-link>
          </div>

          <div class="header-menu-button" v-if="isAuth">
            <router-link to="/admin" custom v-slot="{ navigate }">
              <app-button
                type="button-svg"
                size="big"
                button-class="header-menu__button_custom"
                tooltip="Панель администратора"
                @click="navigate"
              >
                <i class="icon icon-ic_fluent_settings_20_regular"></i>
              </app-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    AppButton,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters("users", ["getUser", "isAuth"]),
  },
  methods: {
    ...mapActions("users", ["logout"]),
    async onLogout() {
      await this.logout();
      this.$router.push("/main");
    },
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
  font-weight: 500;
  background: $gradient;
  box-shadow: $shadow-big;
  color: $white;
}

.back {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  &-arrow {
    color: $white;
  }
  &-subtitle {
    color: $white;
  }
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
    }

    &-button {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
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