<template>
  <admin-content-table :disabled="pending">
    <thead>
      <tr>
        <th>ID</th>
        <th>Имя</th>
        <th>Тип</th>
        <th>Дата создания</th>
        <th>Пользователь</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="file in files"
        :key="file.id"
        @click="$emit('select', file.id)"
        class="row"
        :class="{ active: activeFileId == file.id }"
      >
        <td>{{ file.id }}</td>
        <td class="dzz-name">{{ file.name }}</td>
        <td>{{ file.type }}</td>
        <td>{{ file.date }}</td>
        <td>{{ file.user != null ? file.user.firstName + ' ' + file.user.lastName : "Администратор"}} </td>
      </tr>
    </tbody>
  </admin-content-table>
</template>

<script>
import AdminContentTable from "@/components/admin/AdminContentTable";
export default {
  props: ["files", "activeFile", "pending"],
  components: {
    AdminContentTable,
  },
  computed: {
    activeFileId() {
      return this.activeFile == null ? null : this.activeFile.id;
    },
  },
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