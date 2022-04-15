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
    "modelValue": { default: "" },
    "value": { type: String, default: undefined }
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value
    }
  },
}
</script>

<style lang="scss" scoped>
.radio__label {
  margin-right: 4px;
  display: flex;
  align-items: center;
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
  cursor: pointer;
  display: inline-block;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: $gradient-w;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
  position: relative;
}

.radio-fake::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  display: block;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  opacity: 1;
  transition: 0.1s ease-out;
  background: #fff;
}
</style>