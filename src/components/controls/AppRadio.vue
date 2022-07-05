<template>
  <label class="radio__label">
    <input
      class="radio__input"
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)"
    />
    <span class="radio-fake"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    modelValue: { default: "" },
    value: { type: String, default: undefined },
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.radio__label {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.radio__input {
  display: none;

  &:checked + .radio-fake {
    background: $gradient;

    &::before {
      opacity: 1;
    }
  }
}

.radio-fake {
  position: relative;

  display: inline-block;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: $gradient-w;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.radio-fake::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;
  width: 8px;
  height: 8px;
  transform: translate(-50%, -50%);
  font-size: 14px;
  border-radius: 50%;
  opacity: 1;
  background: $white;
  transition: 0.1s ease-out;
}
</style>