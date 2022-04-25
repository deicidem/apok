<template>
  <div class="wrapper">
    <!-- <div class="wrapper" @click="closeUser($event)"> -->
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
  // data() {
  //   return {
  //     showUser: false,
  //     showSearch: false,
  //   };
  // },
  // methods: {
  //   closeUser($event) {
  //     let el = document.querySelector(".user-box");
  //     if ($event.target.classList.contains("user-box__click")) {
  //       return;
  //     }
  //     if (this.showUser) {
  //       if (!el.contains($event.target)) {
  //         this.showUser = false;
  //       }
  //     }
  //     this.closeSearch($event);
  //   },
  // closeSearch($event) {
  //   let el = document.querySelector(".search-box");
  //   if ($event.target.classList.contains("search-box__click")) {
  //     return;
  //   }
  //   if (this.showSearch) {
  //     if (!el.contains($event.target)) {
  //       this.showSearch = false;
  //     }
  //   }
  // },
  // },
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
  min-width: 1024px;
  width: 100%;

  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;

  overflow: visible;
  color: #c7c7c7;
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
  display: block;
  object-fit: cover;
  width: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  padding: 20px;

  flex: 1 1 auto;
  background: #dfdfdf;
}

/*_____________________button_________________*/
.button {
  padding: 0 24px;
  height: 35px;

  font-family: inherit;
  text-align: center;
  font-size: 0.875rem;

  background: $gradient;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow_small;
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
    img {
      max-width: 16px;
    }
  }
}
/*_____________________pagination_____________*/

.vs-pagination {
  &--active a {
    color: $color-main !important;
    font-weight: 600 !important;
    background-color: transparent !important;
  }
  li {
    a {
      color: $text-grey !important;
      &:hover {
        background-color: transparent !important;
        color: $color-main !important;
      }
    }
  }
}
/*_____________________vueScroll______________*/
.__vuescroll {
  display: flex;
  flex-direction: column;
}
.__panel {
  width: 100%;
}

/*______________________________________*/
@media screen and (max-width: 1440px) {
  .button {
    height: 28px;

    font-size: 0.75rem;
  }
}
/*______________________________________*/
</style>