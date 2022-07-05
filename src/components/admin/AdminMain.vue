<template>
  <div class="admin-main">
    <h1 class="admin-main-title">Пользователи</h1>
    <div class="admin-main-wrapper">
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
  props: ['title']
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
  &-content {
    flex: 1 1 60%;
  }

  &-aside {
    flex: 1 1 40%;
    margin-left: 20px;
  }

  &-title {
    margin: 0;
    font-size: 22px;
    font-weight: 400;
    text-align: center;
  }

  &-wrapper {
    flex: 1 1 auto;
    margin-top: 30px;
    display: flex;
    width: 100%;
  }
}
</style>