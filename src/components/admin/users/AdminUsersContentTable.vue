<template>
  <admin-content-table >
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

    <tbody :class="{disabled}">
      <app-loader v-show="disabled"></app-loader>
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
import AppLoader from "@/components/controls/AppLoader";
export default {
  props: ["users", "activeUser", "disabled"],

  components: {
    AdminContentTable,
    AppCheckbox,
    AppLoader,
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
.disabled {
  position: relative;
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(#eee, 0.5)
  }
}
</style>