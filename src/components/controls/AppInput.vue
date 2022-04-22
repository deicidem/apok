<template>
  <label class="input-wrapper">
    <span class="input-label">{{ label }}</span>

    <masked-input
      v-if="mask != ''"
      :mask="mask"
      :placeholder="placeholder"
      type="text"
      class="input"
      v-model="localValue"
    />
    <input v-else type="text" class="input" v-model="localValue" />
  </label>
</template>

<script>
import MaskedInput from "vue-masked-input";

export default {
  components: {
    MaskedInput,
  },
  props: {
    value: String,
    label: String,
    mask: {
      type: [String, Object],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      localValue: null,
    };
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
.input {
  margin-top: 2px;
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  border: 1px solid rgb($text-grey, 0.2);
  box-shadow: $shadow-small;
  font-size: 14px;
  color: $color-main-dark;
  &:active {
    outline: 1px solid $color-main;
  }
  &-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    &:focus-within .input-label {
      color: $color-main;
    }
  }
  &:focus-visible {
    outline: 1px solid $color-main;
  }
  &-label {
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
    color: $text-grey;
  }
}
</style>