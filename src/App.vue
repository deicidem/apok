<template>
  <div class="wrapper" @click="closeUser($event)">
    <app-header></app-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
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
  color: #c7c7c7;
  font-size: 16px;
  line-height: 1.5;
  font-family: "Montserrat", sans-serif;
  min-width: 1024px;
  width: 100%;
  overflow: visible;
  font-weight: 400;
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
  width: 100%;
  display: block;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1 1 auto;
  padding: 20px;
  background: #dfdfdf;
}

/* _____________________button__________________ */

.button {
  font-family: inherit;
  background: $gradient;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow_small;
  padding: 0 24px;
  height: 35px;
  text-align: center;
  font-size: 0.875rem;
  cursor: pointer;
  &-white {
    color: $color-main-dark;
    background: $gradient_w;
  }
  &-g {
    background: $gradient;
    color: #fff;
  }
  &-r {
    background: $gradient-r;
    color: #fff;
  }
  &-svg {
    background: $gradient_w;
    width: 30px;
    height: 30px;
    padding: 7px;
    img{
      max-width: 16px;
    }
  }
}
</style>