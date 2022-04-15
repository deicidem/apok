<template>
  <label class="input-wrapper">
    <span class="input-label">{{ label }}</span>
    <input type="text" class="input" v-model="localValue" />
  </label>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
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
  padding: 5px 10px;
  border-radius: 15px;
  border: none;
  box-shadow: $shadow-small;
  font-size: 14px;
  color: $color-main-dark;
  &-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
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