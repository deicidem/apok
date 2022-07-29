<template>
  <admin-aside-block title="Связанные объекты">
    <nav class="admin-aside-links">
      <ul>
        <li>
          <router-link class="admin-aside-links-item" :to="{path: '/admin/users', query: {groupId: group.id}}"
            >Пользователи группы</router-link
          >
        </li>
        <li @click="$emit('filterByOwner')">
          <a>Все группы владельца этой группы</a>
        </li>
      </ul>
    </nav>
  </admin-aside-block>
</template>

<script>
import AdminAsideBlock from "@/components/admin/AdminAsideBlock";
export default {
  props: ['group'],
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