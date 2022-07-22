<template>
  <div class="c-block">
    <label class="c-input-wrapper" :class="size">
      <input
        placeholder=" "
        class="c-input"
        v-model="localValue"
        :class="{
          'c-invalid': invalid,
          'c-input-with-icon': icon != null,
          [inputClass]: inputClass != null,
        }"
      />
      <div class="c-input-label">{{ label }}</div>

      <i v-if="icon != null" class="c-input-img" :class="iconClass"></i>
    </label>

    <div v-if="error != null && invalid" class="c-error-tooltip">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    invalid: Boolean,
    error: String,
    inputClass: String,
    size: String,
    icon: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      localValue: null,
    };
  },

  computed: {
    iconClass() {
      let res = "";
      if (this.icon != null) {
        res += this.icon;
        if (this.invalid) {
          res += " c-invalid-icon";
        }
      }
      return res;
    },
  },

  mounted() {
    this.localValue = this.value;
  },

  watch: {
    localValue: function () {
      this.$emit("input", this.localValue);
    },

    value: function () {
      this.localValue = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.c-block {
  position: relative;
}

.c-input {
  max-width: 100%;
  display: block;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 7px;
  border: 1px solid transparent;
  box-shadow: $shadow-small;
  color: $color-main;
  line-height: 18px;

  &[type="password"] {
    font-family: Verdana, sans-serif;
  }

  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }

  &:focus ~ .c-input-label,
  &:not(:placeholder-shown) ~ .c-input-label {
    color: $color-main;
    font-size: 13px;
    top: -25%;
  }

  &-img {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    color: $color-main;
    font-size: 30px;
  }

  &-with-icon {
    padding: 15px 60px 15px 24px;
    width: 100%;
  }

  &-label {
    display: none;
  }

  &-wrapper {
    display: block;
    position: relative;

    &:focus-within .c-input-label {
      color: $color-main;
      font-size: 13px;
      top: -25%;
    }
  }
}

.c-input-label {
  text-align: left;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

.c-invalid {
  border: 1px solid $color-red;
  transition: all 1s ease-out;
  color: $color-red;
  &:focus-visible {
    border: 1px solid $color-red;
  }
  &:focus ~ .c-input-label,
  &:not(:placeholder-shown) ~ .c-input-label {
    color: $color-red;
  }
}

.c-invalid-icon {
  color: $color-red;
}

.c-error {
  &-tooltip {
    margin: 2px 0 0 0;
    text-align: left;
    font-size: 12px;
    color: $color-red;

    p {
      margin: 0;
    }
  }
}

.c-input:active .c-input-label {
  display: block;
}

.c-input-wrapper:focus-within svg path {
  fill: $color-main;
}

.small {
  input {
    padding: 4px 15px;
    font-size: 12px;
  }
}
</style>