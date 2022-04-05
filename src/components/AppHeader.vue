<template>
  <header class="header">
    <h1 class="title">Автоматизация процессов оценки качества данных ДЗЗ</h1>
    <div class="header-items">
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <router-link to="/">Главная</router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/about">Руководства пользователя</router-link>
          </li>
        </ul>
      </nav>
      <div class="header-menu">
        <!-- <div class="user-box">
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

          <div class="search-box" >
            <div class="search-box-title">ВВедите запрос</div>
            <div class="user-box-line"></div>
            <div class="user-box-input">
              <input type="text" placeholder="поиск" />
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </div> -->
        <div class="header-menu__text">Добро пожаловать!</div>
        <div class="header-menu__buttons">
          <button class="button button-o header-menu__button">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
          <button class="button button-o header-menu__button">
            <i class="fa fa-user" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.button {
  background: $gradient;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
}

.button-o {
  background: $gradient-w;
  color: $color-main-dark;
}
.title {
  position: relative;
  font-size: 1.5rem;
  padding: 10px;
  text-align: center;
  background: $gradient;
  box-shadow: $shadow-big;
  color: #fff;
}

.header-user {
  display: none;
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
  z-index: 1;
  position: relative;
  &-items {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 100px;
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
          color: rgba(0, 0, 0, 0)
        }
      }
    }
  }
}
</style>