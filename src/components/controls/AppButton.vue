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
      return this.active ? this.type + " active" : this.type;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 100%;
  width: 100%;
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
    height: 35px;
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

      &::after {
        background: $gradient-w;
      }

      &.active {
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
}
</style>