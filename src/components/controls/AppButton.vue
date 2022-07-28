<template>
  <div class="button__wrapper" :class="classes">
    <button class="button" :disabled="disabled" @click="$emit('click', true)">
      <slot></slot>
    </button>

    <span class="tooltiptext" v-if="tooltip != null">
      {{ tooltip }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    active: Boolean,
    disabled: Boolean,
    tooltip: {
      type: String,
      default: null,
    },
    size: String,
    static: Boolean,
  },

  computed: {
    image() {
      if (this.icon != undefined) {
        const icon = this.icon.toLowerCase();
        return require(`@/assets/img/${icon}`);
      }
      return "";
    },

    classes() {
      let result = this.type;
      if (this.active) result += " active";
      if (this.static) result += " static";
      if (this.size == "big") result += " big";
      if (this.size == "small") result += " small";
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 24px;
  height: 100%;
  width: 100%;
  font-family: inherit;
  color: $white;
  text-align: center;
  font-size: 0.875rem;
  border-radius: 7px;
  border: none;
  box-shadow: $shadow_small;
  cursor: pointer;
  overflow: hidden;
  // transition-delay: 0.2s;
  transition: all 0.2s ease-out;

  &__wrapper {
    height: 36px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      .tooltiptext {
        display: block;
      }
      .button {
        &:not(:disabled) {
          // &:hover {
          // transition-delay: 0s;
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba($black, 0.2);
          // }

          &:after {
            left: 100%;
          }
        }
      }
    }
    &:active {
      .button {
        &:not(:disabled) {
          transition: all 0.1s ease-out;
          transform: translateY(1px);
          box-shadow: 0 0px 2px rgba($black, 0.1);
          &:after {
            left: 0%;
          }
        }
      }
    }
  }

  // &:hover + .tooltiptext {
  //   display: block;
  // }

  &:disabled {
    cursor: no-drop;

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

  // &:not(:disabled) {
  //   &:hover {
  //     transition-delay: 0s;
  //     transform: translateY(-1px);
  //     box-shadow: 0 2px 6px rgba($black, 0.2);
  //   }

  //   &:active {
  //     transition: all 0.1s ease-out;
  //     transform: translateY(1px);
  //     box-shadow: 0 0px 2px rgba($black, 0.1);
  //   }

  //   &:hover:after {
  //     left: 100%;
  //   }

  //   &:active:after {
  //     left: 0%;
  //   }
  // }

  &-g {
    .button {
      &::after {
        background: $gradient;
      }
    }
  }

  &-white-gr {
    .button {
      color: $color-main;

      &::after {
        background: $gradient-w;
      }
    }
  }

  &-white {
    .button {
      background: $white;
      color: $color-main;
    }
  }

  &-r {
    .button {
      color: $white;

      &::after {
        background: $gradient-r;
      }
    }
  }

  &-svg {
    width: 30px;
    height: 30px;

    .button {
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-main;
      font-size: 20px;
      box-shadow: 0 2px 4px rgba(#000, 0.15);

      &::after {
        background: $gradient-w;
      }
    }
     &:hover {
      .button:not(:disabled) {
        // &:hover {
        box-shadow: 0 2px 6px rgba(#000, 0.2);
        // }
      }
    }
    &:active {
      .button:not(:disabled) {
        transition: all 0.1s ease-out;
        transform: translateY(1px);
        box-shadow: 0 0px 2px rgba($black, 0.1);
      }
    }
   
    &-white {
      .button {
        color: $color-main;
        &::after {
          background: $white;
        }
      }
    }

    &.active {
      .button {
        color: $white;

        &::after {
          background: $gradient;
        }
      }
    }
  }

  &-svg-r {
    .button {
      color: $color-red;
      font-size: 20px;
      // &:hover + .tooltiptext {
      //   display: block;
      //   color: $color-red;
      // }
    }
    &:hover {
      .tooltiptext {
        display: block;
        color: $color-red;
      }
    }
  }
}

.big {
  &.button-g {
    height: 44px;
  }

  &.button-white {
    height: 44px;
  }

  &.button-svg {
    width: 40px;
    height: 40px;
    .button {
      padding: 10px;
      font-size: 30px;
    }
  }
}

.small {
  &.button-g {
    height: 28px;
    .button {
      font-size: 12px;
    }
  }

  &.button-white {
    height: 28px;
    .button {
      font-size: 12px;
    }
  }

  &.button-svg {
    width: 40px;
    height: 40px;
    .button {
      padding: 10px;
      font-size: 30px;
    }
  }

  &.button-svg-white {
    width: 28px;
    height: 28px;
    .button {
      padding: 10px;
      font-size: 20px;
    }
  }
}
</style>