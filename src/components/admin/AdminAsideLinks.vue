<template>
  <div class="links-wrapper">
    <h1 class="links-wrapper-title">Объекты пользователя</h1>
    <nav class="links-wrapper-menu">
      <ul>
        <li>Задачи</li>
        <li>Файлы</li>
        <li>Снимки</li>
        <li>Группы</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.links-wrapper {
  background: $white;
  border-radius: 20px;
  height: 100%;
  box-shadow: $shadow-big;
  margin-left: 20px;
  margin-top: 30px;
  padding: 20px;

  &-title {
    font-size: 18px;
    font-weight: 400;
  }

  &-menu {
    ul {
      margin-top: 20px;
      display: flex;
      padding: 0;
      list-style: none;
      li {
        font-size: 16px;
        margin-right: 20px;
        text-decoration: underline;
      }
    }
  }
}
</style>