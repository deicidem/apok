<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <h1 class="sidebar-title">Панель администратора</h1>
      <ul class="sidebar-links">
        <li class="sidebar-link">Пользователи</li>
        <li class="sidebar-link">Задачи</li>
        <li class="sidebar-link">Файлы</li>
        <li class="sidebar-link">Спутники</li>
        <li class="sidebar-link">Группы</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar {
  background: $white;
  min-width: 280px;
  max-width: 300px;
  border-radius: 20px;
  height: 100%;
  box-shadow: $shadow-big;
  height: auto;
  &-wrapper {
    padding: 20px;
  }

  &-title {
    font-size: 18px;
    font-weight: 400;
  }

  &-links {
    list-style: none;
    margin: 20px 0 0 0;
    padding: 0;
  }

  &-link {
    margin-top: 14px;
  }
}
</style>