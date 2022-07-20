<template>
  <div class="admin-main">
    <h1 ref="header" class="admin-main-title">
      {{ loading ? "Загрузка..." : title }}
      <div class="admin-main-header-block">
        <slot name="header-block"></slot>
      </div>
    </h1>

    <div class="admin-main-wrapper" :style="height">
      <app-loader v-show="loading"> </app-loader>
      <div class="admin-main-content" v-if="!loading">
        <slot name="content"></slot>
      </div>
      <div class="admin-main-aside" v-if="!loading">
        <slot name="aside"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoader from "@/components/controls/AppLoader";
export default {
  components: {
    AppLoader,
  },
  props: ["title", "loading"],
  data() {
    return {
      contentHeight: 0,
      didMount: false,
    };
  },

  computed: {
    height() {
      if (this.didMount) {
        let styles = window.getComputedStyle(this.$refs.header);
        let mb = parseInt(styles.marginBottom);
        let height = this.$refs.header.offsetHeight;
        return { maxHeight: "calc(100% - " + (mb + height) + "px)" };
      }
      return { maxHeight: "auto" };
    },
  },

  mounted() {
    this.didMount = true;
  },
};
</script>

<style lang="scss" scoped>
.admin-main {
  background: $gradient-w;
  margin-left: 30px;
  width: 100%;
  border-radius: 20px;
  box-shadow: $shadow-big;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  position: relative;
  overflow: hidden;

  &-header-block {
    background: #fff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  &-content {
    flex: 1 1 60%;
    max-height: 100%;
  }

  &-aside {
    flex: 1 1 40%;
    margin-left: 20px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-title {
    position: relative;
    width: 100%;
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
    font-weight: 400;
    text-align: center;
  }

  &-wrapper {
    flex: 1 1 auto;
    display: flex;
    width: 100%;
    max-height: 100%;
  }
}
</style>