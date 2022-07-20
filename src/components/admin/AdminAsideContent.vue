<template>
  <div class="aside-info">
    <slot name="popups"></slot>
    <h3 class="aside-info-title">{{ title }}</h3>
    <vuescroll :ops="scrollOps">
      <div class="aside-info-content">
        <slot></slot>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import { mapGetters } from "vuex";

export default {
  components: {
    vuescroll,
  },

  props: ["title"],

  computed: {
    ...mapGetters(["scrollOps"]),
  },
};
</script>

<style lang="scss" scoped>
.aside-info {
  position: relative;
  background: $white;
  width: 100%;
  border-radius: 10px;
  box-shadow: $shadow-big;
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  overflow: hidden;

  &-title {
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    margin: 0;
    margin-bottom: 7px;
  }

  &-content {
    padding: 10px 20px 20px;
  }
}
</style>