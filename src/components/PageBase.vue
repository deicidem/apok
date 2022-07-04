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
  props: ["showMenu"],
  components: {
    AppHeader,
  },
  data() {
    return {
      contentHeight: 0,
    };
  },
  computed: {
    height() {
      return { maxHeight: "calc(100% - " + this.contentHeight + "px)" };
    },
  },
  mounted() {
    this.contentHeight = this.$refs.header.$el.offsetHeight;
  },
};
</script>

<style>
</style>