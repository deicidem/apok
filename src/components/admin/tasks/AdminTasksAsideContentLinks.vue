<template>
  <admin-aside-block title="Связанные объекты">
    <nav class="admin-aside-links">
      <ul>
         <li @click="$emit('filterByUser')">
          <a>Все файлы этого пользователя</a>
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
      a {
        color: $text-grey;
        cursor: pointer;
      }
    }
  }

}
</style>