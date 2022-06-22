<template>
  <button class="button" @click="$emit('click')" :class="type">
    <span class="button-content">
      <slot></slot>
      <img v-show="icon != undefined" :src="image" alt="" />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    textGradient: String,
    icon: String,
  },
  computed: {
    image() {
      if (this.icon != undefined) {
        const icon = this.icon.toLowerCase();
        return require(`@/assets/img/${icon}`);
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
.button-content {
  color: $white;
}
.white {
  .button-content {
    color: $color-main;
  }
  background: $gradient_w;

  &-g {
    background: $gradient_w;
    .button-content {
      color: $color-main;
    }
    @supports (background-clip: text) {
      .button-content {
        background: $gradient;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  &-r {
    background: $gradient_w;
    .button-content {
      color: $color-red;
    }
    @supports (background-clip: text) {
      .button-content {
        background: $gradient-r;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

.red {
  color: $white;
  background: $gradient_r;
}
</style>