<template>
  <div class="hero">
    <app-header @click="height()" :show-menu="showMenu" ref="header"></app-header>
    <div class="content" :style="height">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  props: {
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  components: {
    AppHeader,
  },
  data() {
    return {
      didMount: false
    };
  },
  computed: {
    height() {
      if (this.didMount) {
        return { maxHeight: "calc(100% - " + this.$refs.header.$el.offsetHeight + "px)" };
      } else {
        return { maxHeight: "auto" }
      }
    },
  },
  mounted() {
    this.didMount = true;
  },
};
</script>

<style>
.hero{
  height: 100%;
}
</style>