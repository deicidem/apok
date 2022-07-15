<template>
  <admin-content-table>
    <thead>
      <tr>
        <th class="col-checkbox center">
          <app-checkbox
            :model-value="allSelected"
            class="checkbox-big"
            @change="selectAll"
          />
        </th>
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
        <td class="col-checkbox center">
          <app-checkbox
            :mini="true"
            :model-value="user.selected"
            @change="$emit('check', { id: user.id, value: $event })"
          />
        </td>
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
import AppCheckbox from "@/components/controls/AppCheckbox";
export default {
  props: ["users", "activeUser"],

  components: {
    AdminContentTable,
    AppCheckbox,
  },

  computed: {
    activeUserId() {
      return this.activeUser == null ? null : this.activeUser.id;
    },
    allSelected() {
      let res = true;
      if (this.users == null) {
        return false;
      }
      for (let i = 0; i < this.users.length; i++) {
        if (!this.users[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
  },
  methods: {
    selectAll(val) {
      for (let i = 0; i < this.users.length; i++) {
        this.$emit("check", { id: this.users[i].id, value: val });
      }
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