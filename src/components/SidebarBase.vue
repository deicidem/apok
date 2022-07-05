<template>
  <div class="c">
    <header class="c-header">
      <slot name="header"></slot>
    </header>
    <slot name="popups"></slot>
    <app-loader v-if="!loaded"></app-loader>
    <vuescroll :ops="scrollOps" v-else>
      <slot name="content"></slot>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import AppLoader from "@/components/controls/AppLoader.vue";
// import VsPagination from "@vuesimple/vs-pagination";
import { mapGetters } from "vuex";

export default {
  components: {
    vuescroll,
    AppLoader,
    // VsPagination,
  },
  props: ["loaded"],
  computed: {
    ...mapGetters(["scrollOps"]),
  },
};
</script>

<style lang="scss" scoped>
.c {
  display: flex;
  flex-direction: column;
  max-height: 100%;

  &-header {
    position: relative;
    margin: 0;
    padding: 6px;
    background: $gradient;
    box-shadow: $shadow-small;
  }

  &-title {
    margin: 0;
    color: $white;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
  }
}

.__rail-is-vertical {
  bottom: 5px !important;
  top: 5px !important;
  right: 5px !important;
}
</style>