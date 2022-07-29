<template>
  <admin-content-table :disabled="pending">
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
        <th>Почта</th>
        <th>Дата регистрации</th>
        <th>Заблокирован</th>
        <th v-if="isGroupUsers"></th>
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
        <td>{{ user.blocked ? 'Заблокирован' : 'Не заблокирован' }}</td>
        <td>
          <app-button
              v-if="isGroupUsers"
              type="button-svg button-svg-r"
              class="groups-button"
              tooltip="Удалить"
              @click="$emit('exclude', user.id)"
            >
              <i class="icon icon-ic_fluent_delete_20_regular"></i
            ></app-button>
        </td>
      </tr>
    </tbody>
  </admin-content-table>
</template>

<script>
import AdminContentTable from "@/components/admin/AdminContentTable";
import AppCheckbox from "@/components/controls/AppCheckbox";
import AppButton from "@/components/controls/AppButton";
export default {
  props: ["users", "activeUser", "pending", "isGroupUsers"],

  components: {
    AdminContentTable,
    AppCheckbox,
    AppButton,
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