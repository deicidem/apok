<template>
  <admin-content-table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Тип</th>
        <th>Владелец</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="group in groups"
        :key="group.id"
        @click="$emit('select', group.id)"
        class="row"
        :class="{ active: activeGroupId == group.id }"
      >
        <td>{{ group.id }}</td>
        <td>{{ group.title }}</td>
        <td>{{ group.type }}</td>
        <td>{{ group.owner.firstName }} {{ group.owner.lastName }}</td>
      </tr>
    </tbody>
  </admin-content-table>
</template>

<script>
import AdminContentTable from "@/components/admin/AdminContentTable";
export default {
  props: ["groups", "activeGroup"],
  components: {
    AdminContentTable,
  },
  computed: {
    activeGroupId() {
      return this.activeGroup == null ? null : this.activeGroup.id;
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