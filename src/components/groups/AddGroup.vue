<template>
  <div class="group-popup">
    <div class="group-popup-card">
        <p>add group form</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.group-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;
  background: rgba($black, 0.5);

  &-card {
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
  }
}
</style>