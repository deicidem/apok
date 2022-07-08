<template>
  <admin-aside-block title="Связанные объекты">
    <nav class="admin-aside-links">
      <ul>
        <li>
          <router-link class="admin-aside-link" to="/admin/tasks"
            >Задачи</router-link
          >
        </li>
        <li>
          <router-link class="admin-aside-link" to="/admin/files"
            >Файлы</router-link
          >
        </li>
        <li>
          <router-link class="admin-aside-link" to="/admin/dzzs"
            >Снимки</router-link
          >
        </li>
        <li>
          <router-link class="admin-aside-link" to="/admin/groups"
            >Группы</router-link
          >
        </li>
      </ul>
    </nav>
  </admin-aside-block>
</template>

<script>
import AdminAsideBlock from "@/components/admin/AdminAsideBlock";
export default {
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
      text-decoration: underline;
    }
  }
}

.admin-aside-link {
  color: $text-grey;
}
</style>