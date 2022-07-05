<template>
  <div class="admin-main">
    <h1 ref="header" class="admin-main-title">Пользователи</h1>
    <div class="admin-main-wrapper" :style="height">
      <div class="admin-main-content">
        <slot name="content"></slot>
      </div>
      <div class="admin-main-aside">
        <slot name="aside"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      contentHeight: 0,
      didMount: false
    };
  },
  computed: {
    height() {
      if (this.didMount) {
        let styles = window.getComputedStyle(this.$refs.header);
        let mb = parseInt(styles.marginBottom);
        let height = this.$refs.header.offsetHeight;
        return { maxHeight: "calc(100% - " +  (mb + height)+ "px)" };
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