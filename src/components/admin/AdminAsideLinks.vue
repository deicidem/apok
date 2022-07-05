<template>
  <div class="links-wrapper">
    <h3 class="links-wrapper-title">Объекты пользователя</h3>
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
  border-radius: 10px;
  box-shadow: $shadow-small;
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
        font-size: 14px;
        margin-right: 20px;
        text-decoration: underline;
      }
    }
  }
}
</style>