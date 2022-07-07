<template>
  <div class="progress">
    <div class="progress-value" :style="{ width: value + '%' }"></div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
.progress {
  margin-top: 5px;
  width: 120px;
  border-radius: 3px;
  height: 10px;
  background: $gradient-w;
  box-shadow: inset 1px 1px 3px rgba($black, 0.15);
  overflow: hidden;
  &-value {
    border-radius: 3px;
    height: 100%;
    background-image: linear-gradient(
      to right,
      $color-main-dark,
      $color-main-light,
      $color-main-dark
    );
    transition: width 0.3s ease-out;
    box-shadow: $shadow-small;
    background-size: 400%;
    animation: progress 16s ease-out infinite;
  }
}

@keyframes progress {
  0% {
    background-position: 400%;
  }
  100% {
    background-position: -400%;
  }
}

</style>