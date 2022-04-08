<template>
  <div>
    <label class="checkbox__label" >
      <input
        class="checkbox__input"
        type="checkbox"
        @input="$emit('input', $event.target.checked)"
      />
      <span  class="checkbox-fake" :class="mini ? 'mini' : ''"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    mini: Boolean
  }
}
</script>

<style lang="scss" scoped>
.checkbox__input {
  display: none;
  &:checked + .checkbox-fake::before {
    opacity: 1;
  }
}
.checkbox-fake {
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 5px;
  background: $gradient-w;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
  position: relative;
}

.checkbox-fake::before {
  content: "\2714";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  display: block;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: 0.1s ease-out;
  color: #fff;
  background: $gradient;
}
.mini {
  width: 16px;
  height: 16px;
  &::before {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }
}
</style>