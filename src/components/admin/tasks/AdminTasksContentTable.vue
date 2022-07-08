<template>
  <admin-content-table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Дата создания</th>
        <th>Статус</th>
        <th>Пользователь</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="task in tasks"
        :key="task.id"
        @click="$emit('select', task.id)"
        class="row"
        :class="{ active: activeTaskId == task.id }"
      >
        <td>{{ task.id }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.date }}</td>
        <td v-if="!isNaN(+task.status)">Выполняется: {{ task.status }}%</td>

        <td v-else>{{ task.status }}</td>
        <td>{{ task.user }}</td>
      </tr>
    </tbody>
  </admin-content-table>
</template>

<script>
import AdminContentTable from "@/components/admin/AdminContentTable";

export default {
  props: ["tasks", "activeTask"],
  components: {
    AdminContentTable,
  },
  computed: {
    activeTaskId() {
      return this.activeTask == null ? null : this.activeTask.id;
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