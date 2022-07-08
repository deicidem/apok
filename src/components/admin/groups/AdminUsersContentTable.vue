<template>
  <admin-content-table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Почтовый адрес</th>
        <th>Дата регистрации</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
        @click="$emit('select', user.id)"
        class="row"
        :class="{ active: activeUserId == user.id }"
      >
        <td>{{ user.id }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.date }}</td>
      </tr>
    </tbody>
  </admin-content-table>
</template>

<script>
import AdminContentTable from "@/components/admin/AdminContentTable";
export default {
  props: ["users", "activeUser"],
  components: {
    AdminContentTable,
  },
  computed: {
    activeUserId() {
      return this.activeUser == null ? null : this.activeUser.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  cursor: pointer;
}
.active {
  color: $white;
  background: $gradient;
}
</style>