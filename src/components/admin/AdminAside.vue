<template>
  <div class="admin-aside">
    <div class="admin-aside-content" :style="height">
      <slot name="content"></slot>
    </div>
    <div class="admin-aside-actions" ref="actions">
      <slot name="actions" ></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      didMount: false
    };
  },
  computed: {
    height() {
      if (this.didMount) {
        return { maxHeight: "calc(100% - " +  (this.$refs.actions.offsetHeight)+ "px)" };
      } 
      return { maxHeight: "auto" }
    },
  },
  mounted() {
    this.didMount = true;
  },
};
</script>

<style lang="scss" scoped>
.admin-aside {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
}
</style>