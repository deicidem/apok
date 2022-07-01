<template>
  <div class="wrapper">
    <app-header @click="height()" ref="header"></app-header>
    <div class="content" :style="height">
      <router-view></router-view>
      <app-error></app-error>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppError from "@/components/AppError.vue";

export default {
  components: {
    AppHeader,
    AppError,
  },
  data() {
    return {
      contentHeight: 0,
    };
  },
  computed: {
    height() {
      return { maxHeight: "calc(100% - " + this.contentHeight + "px)" };
    },
  },
  mounted() {
    this.contentHeight = this.$refs.header.$el.offsetHeight;
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
html,
body {
  padding: 0;
  margin: 0;
  min-width: 1024px;
  width: 100%;

  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;

  overflow: visible;
  background: $white-dark;
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
  object-position: center;
  width: 100%;
}

svg:focus {
  outline: none;
}

.wrapper {
  position: relative;

  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  padding: 20px;
  max-height: 100%;
  flex: 1 1 auto;
  background: $white-dark;
}

.icon {
  line-height: 0;
}

.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &-arrow {
    display: flex;
    color: $color-main;
    font-size: 24px;
  }
  &-subtitle {
    margin: 0 0 0 10px;
    font-size: 18px;
    color: $color-main;
  }
  &-arrow-w {
    display: flex;
    color: $white;
    font-size: 24px;
  }
  &-subtitle-w {
    margin: 0 0 0 10px;
    font-size: 18px;
    color: $white;
  }
}

/*_____________________button_________________*/
.button {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 35px;
  width: 190px;
  font-family: inherit;
  text-align: center;
  font-size: 0.875rem;
  border-radius: 7px;
  border: none;
  box-shadow: $shadow_small;
  transition: all 0.2s ease-out;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
  color: $white;
  transition-delay: 0.2s;
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover + .tooltiptext {
    display: block;
  }
  &:disabled {
    &:before {
      content: "";
      display: block;
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(#eee, 0.65);
    }
    cursor: no-drop;
  }
  &::after {
    content: "";
    position: absolute;
    height: 150%;
    width: 200%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
    z-index: -1;
  }
  &:not(:disabled) {
    &:hover {
      transition-delay: 0s;
      transform: translateY(-2px);
      box-shadow: 0 2px 10px rgba($black, 0.3);
    }
    &:active {
      transition: all 0.1s ease-out;
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba($black, 0.1);
    }
    &:hover:after {
      left: 100%;
    }
    &:active:after {
      left: 0%;
    }
  }
  &-g {
    &::after {
      background: $gradient;
    }
  }
  &-white-gr {
    &::after {
      background: $gradient-w;
    }
    color: $color-main;
  }
  &-white {
    background: $white;
    color: $color-main;
  }
  &-r {
    color: $white;
    &::after {
      background: $gradient-r;
    }
  }
  &-svg {
    padding: 16px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-main;
    font-size: 20px;
    &::after {
      background: $gradient-w;
    }
    &.active {
      &::after {
        background: $gradient;
      }
    }
  }
  &-svg-r {
    color: $color-red;
    font-size: 20px;
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

  border-radius: 7px;
  border: 1px solid transparent;
  box-shadow: $shadow-small;
  color: $color-main;

  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }

  &:focus ~ .input-label,
  &:not(:placeholder-shown) ~ label {
    color: $color-main;
    font-size: 13px;
    top: -22px;
  }

  &-img {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &-withIcon {
    padding: 15px 36px 15px 24px;
    width: 100%;
    margin-top: 30px;
  }

  &-withoutIcon {
    padding-left: 8px;
    height: 35px;
  }

  &-label {
    display: none;
  }

  &-wrapper {
    position: relative;
    i {
      color: $color-main;
      font-size: 30px;
    }

    &:focus-within .input-label {
      color: $color-main;
      font-size: 13px;
      top: -22px;
    }
  }
}

.input-label {
  position: absolute;
  top: 14px;
  left: 0;

  display: inline-block;
  padding-left: 24px;

  font-size: 14px;
  color: $text-grey;

  transition: 0.3s ease all;
  -moz-transition: 0.3s ease all;
  -webkit-transition: 0.3s ease all;
  pointer-events: none;
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

/*_____________________tooltiptext_____________*/

.tooltiptext {
  position: absolute;
  bottom: 120%;
  left: 50%;
  z-index: 10;

  display: none;
  padding: 2px 5px;

  text-align: center;
  word-break: normal;

  color: $color-main;
  font-size: 12px;
  line-height: 1.3;
  background: $gradient-w;
  border-radius: 5px;
  box-shadow: $shadow-small;
  transform: translateX(-50%);

  &-r {
    color: $color-red;
  }
}

/*_____________________vueScroll______________*/

.__vuescroll {
  display: flex;
  flex-direction: column;
}

.__panel {
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }

  /* ie 10+ */
  & {
    -ms-overflow-style: none;
  }
  width: 100%;
}

.__bar-is-vertical {
  background: $color-main !important;
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

    &-img {
      max-width: 22px;
    }

    &-wrapper {
      .input-label {
        top: 8px;
      }
    }
  }
}
</style>
