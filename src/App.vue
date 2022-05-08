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
    &:hover {
      background: $color-main;
    }
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

// ____________________input__________________
.input:active .input-label {
  display: block;
}
.input {
  display: block;
  padding: 8px 15px;

  font-size: 14px;

  border-radius: 10px;
  border: none;
  border: 1px solid rgb($text-grey, 0.2);
  box-shadow: $shadow-small;
  color: $color-main-dark;
  &:active {
    border: 1px solid $color-main;
    outline: none;
  }
  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }
  &:focus ~ .input-label,
  &:valid ~ label {
    top: -20px;
    font-size: 12px;
    color: $color-main;
  }

  &-img {
    position: absolute;
    max-width: 26px;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &-withIcon {
    padding-right: 36px;
    padding: 15px 15px;
  }
  &-label {
    display: none;
  }
  &-wrapper {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    width: 300px;
    margin: 0 auto 30px auto;
    &:focus-within .input-label {
      color: $color-main;
    }

    .input-label {
      position: absolute;
      top: 15px;

      display: inline-block;
      width: 300px;
      padding-left: 15px;

      font-size: 14px;
      color: $text-grey;

      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
      pointer-events: none;
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
  .input {
    font-size: 10px;
    padding: 12px 10px;
    &-img{
      max-width: 22px;
    }
    &-wrapper {
      .input-label {
        top: 8px;
      }
    }
  }
}
/*______________________________________*/
</style>