<template>
  <page-base :show-menu="true">
    <template>
      <p class="error-number">404</p>
      <p class="error-text">
        Неверный адрес, либо страница больше не существует
      </p>
      <p class="error-text">
        Перейдите на
        <router-link class="error-link" to="/main"
          >главную страницу</router-link
        >
        сайта
      </p>
    </template>
  </page-base>
</template>

<script>
import PageBase from "@/components/PageBase.vue";
export default {
  components: {
    PageBase,
  },
};
</script>

<style scoped lang="scss">
.error {
  &-number {
    color: $color-main;
    font-size: 200px;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 0;
  }

  &-text {
    margin-top: 10px;
    font-size: 16px;
    color: $black;
    text-align: center;
  }

  &-link {
    color: $color-main;
    border-bottom: 1px solid $color-main;
  }
}
</style>