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
  transition-delay: 0.2s;
  transition: all 0.2s ease-out;

  &__wrapper {
    height: 36px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover + .tooltiptext {
    display: block;
  }

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

  &:not(:disabled) {
    &:hover {
      transition-delay: 0s;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba($black, 0.2);
    }

    &:active {
      transition: all 0.1s ease-out;
      transform: translateY(1px);
      box-shadow: 0 0px 2px rgba($black, 0.1);
    }

    &:hover:after {
      left: 100%;
    }

    &:active:after {
      left: 0%;
    }
  }

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

      &:hover {
        box-shadow: 0 2px 6px rgba(#000, 0.2);
      }

      &:active {
        transition: all 0.1s ease-out;
        transform: translateY(1px);
        box-shadow: 0 0px 2px rgba($black, 0.1);
      }
    }

    &-white {
      .button {
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
      &:hover + .tooltiptext {
        display: block;
        color: $color-red;
      }
    }
  }

  &-small {
    &-white {
      .button {
        padding: 2px 8px;
        font-size: 12px;
        background: $white;
        color: $color-main;
      }
    }

    &-svg {
      .button {
        padding: 10px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color-main;
        font-size: 20px;
        box-shadow: 0 2px 4px rgba(#000, 0.15);

        &::after {
          background: $white;
        }

        &:hover {
          box-shadow: 0 2px 6px rgba(#000, 0.2);
        }

        &:active {
          transition: all 0.1s ease-out;
          transform: translateY(1px);
          box-shadow: 0 0px 2px rgba($black, 0.1);
        }
      }
    }
  }

  &-big {
    &-white {
      height: 44px;

      .button {
        background: $white;
        color: $color-main;
      }
    }

    &-g {
      .button {
        height: 44px;

        &::after {
          background: $gradient;
        }
      }
    }

    &-svg {
      .button {
        padding: 10px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color-main;
        font-size: 30px;
        box-shadow: 0 2px 4px rgba(#000, 0.15);

        &::after {
          background: $gradient-w;
        }

        &:hover {
          box-shadow: 0 2px 6px rgba(#000, 0.2);
        }

        &:active {
          transition: all 0.1s ease-out;
          transform: translateY(1px);
          box-shadow: 0 0px 2px rgba($black, 0.1);
        }
      }
    }
  }
}
</style>