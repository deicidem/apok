<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <h4 class="sidebar-title">Панель администратора</h4>
      
      <ul class="sidebar-list">
        <li class="sidebar-list__item" v-for="(route, i) in routes" :key="i">
          <router-link
            :to="route.path"
            class="sidebar-link"
            active-class="active"
          >
            <i class="icon" :class="route.icon"></i>
            {{ route.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    routes: [
      {
        name: "Пользователи",
        path: "/admin/users",
        icon: "icon-ic_fluent_person_20_regular",
      },
      {
        name: "Задачи",
        path: "/admin/tasks",
        icon: "icon-ic_fluent_clipboard_bullet_list_ltr_20_regular",
      },
      {
        name: "Файлы",
        path: "/admin/files",
        icon: "icon-ic_fluent_folder_20_regular",
      },
      {
        name: "Группы",
        path: "/admin/groups",
        icon: "icon-ic_fluent_people_team_20_regular",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.sidebar {
  background: $white;
  min-width: 310px;
  border-radius: 20px;
  height: 100%;
  box-shadow: $shadow-big;
  height: auto;

  &-wrapper {
    padding: 30px 20px;
  }

  &-title {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }

  &-list {
    list-style: none;
    margin: 20px 0 0 0;
    padding: 0;

    &__item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &-link {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: $black;
    transition: color 0.2s ease-out;
    line-height: 20px;

    .icon {
      margin-right: 10px;
      font-size: 20px;
    }

    &.active {
      color: $color-main;
    }

    &:hover {
      color: $color-main-light;
    }
  }
}
</style>