<template>
  <label class="checkbox__label">
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span class="checkbox-fake" :class="mini ? 'mini' : ''"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: { type: String },
    modelValue: { default: "" },
    trueValue: { default: true },
    falseValue: { default: false },
    mini: Boolean,
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit("change", newValue);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox__label {
  display: flex;
  align-items: center;
}
.checkbox__input {
  display: none;
  &:checked + .checkbox-fake::before {
    opacity: 1;
  }
}
.checkbox-fake {
  position: relative;

  display: inline-block;
  width: 20px;
  height: 20px;

  border: none;
  border-radius: 5px;
  background: $gradient-w;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.15);

  cursor: pointer;
}

.checkbox-fake::before {
  content: "\2714";
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  font-size: 14px;
  border-radius: 5px;
  color: $white;
  background: $gradient;
  opacity: 0;

  transform: translate(-50%, -50%);
  transition: 0.1s ease-out;
}
.mini {
  width: 16px;
  height: 16px;
  &::before {
    width: 16px;
    height: 16px;
    
    font-size: 10px;
    text-align: center;
  }
}
</style>