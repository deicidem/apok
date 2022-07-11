<template>
  <admin-aside-block title="Связанные объекты">
    <nav class="admin-aside-links">
      <ul>
        <li >
          <router-link
          class="admin-aside-links-item"
            :to="{ path: '/admin/tasks', query: { userId: user.id } }"
            >Задачи</router-link
          >
        </li>
        <li >
          <router-link class="admin-aside-links-item"
            :to="{ path: '/admin/files', query: { userId: user.id } }"
            >Файлы</router-link
          >
        </li>
        <li>  
          <router-link  class="admin-aside-links-item" to="/admin/dzzs">Снимки</router-link>
        </li>
        <li>
          <router-link class="admin-aside-links-item" to="/admin/groups">Группы</router-link>
        </li>
      </ul>
    </nav>
  </admin-aside-block>
</template>

<script>
import AdminAsideBlock from "@/components/admin/AdminAsideBlock";
export default {
  props: ["user"],
  components: {
    AdminAsideBlock,
  },
};
</script>

<style lang="scss" scoped>
.admin-aside-links {
  ul {
    margin: 0;
    display: flex;
    padding: 0;
    list-style: none;

    li {
      font-size: 14px;
      margin-right: 20px;
    }
  }

  &-item {
    color: $color-main-dark;
    text-decoration: underline;
  }
}
</style>