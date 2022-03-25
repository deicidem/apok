<template>
  <section class="hero">
    <!-- <div class="user-box">
            <div class="user-box-auth">Авторизация</div>
            <div class="user-box-line"></div>
            <div class="user-box-form">
                <form>
                    <div class="user-box-input">
                        <input type="login" placeholder="логин">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </div>
                    <div class="user-box-input">
                        <input type="password" placeholder="пароль">
                        <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <a href="./index.html" class="user-box-button"><p>Войти</p></a>
                    <a href="./pages/registration.html" class="user-box-button-registr">Регистрация</a>
                </form>
            </div>
        </div>

        <div class="search-box">
            <div class="search-box-title">Введите запрос</div>
            <div class="user-box-line"></div>
            <div class="user-box-input">
                <input type="text" placeholder="поиск">
                <i class="fa fa-search" aria-hidden="true"></i>
            </div>
        </div> -->
    <div class="sidebar-block">
      <app-sidebar
        @close="sidebarCollapsed = true"
        @open="sidebarCollapsed = false"
      ></app-sidebar>
    </div>

    <div class="map" :class="sidebarCollapsed ? '' : 'collapsed'">
      <app-map></app-map>
    </div>
  </section>
</template>

<script>
import AppMap from "@/components/AppMap.vue";
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  name: "MainView",
  components: {
    AppMap,
    AppSidebar,
  },
  data() {
    return {
      sidebarCollapsed: false,
    };
  },
  methods: {
    onSidebarOpen() {
      this.sidebarCollapsed = false;
    },
    onSidebarClose() {
      this.sidebarCollapsed = true;
    }
  },
};
</script>

<style lang="scss">
.hero {
  width: 100%;
  margin: 20px;
  position: relative;
}
.map {
  height: 100%;
  position: relative;
  margin-left: auto;
  &.collapsed {
    max-width: 60%;
  }
}

</style>