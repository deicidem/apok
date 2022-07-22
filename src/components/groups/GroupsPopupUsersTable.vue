<template>
  <app-table :disabled="pending">
    <thead>
      <tr>
        <th class="col-checkbox center">
          <app-checkbox
            :model-value="allSelected"
            class="checkbox-big"
            @change="selectAll"
          />
        </th>

        <th class="groups-header" v-for="(header, i) in headers" :key="i">
          {{ header.title }}
        </th>

        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, i) in users" :key="i">
        <td class="col-checkbox center">
          <app-checkbox
            :mini="true"
            :model-value="item.selected"
            @change="$emit('select', { index: i, value: $event })"
          />
        </td>

        <td>
          {{ item.firstName }}
        </td>
        <td>
          {{ item.lastName }}
        </td>
        <td>
          {{ item.organisation }}
        </td>

        <td>
          <app-button
            type="button-svg button-svg-r"
            tooltip="Удалить"
            @click="$emit('delete', item.id)"
          >
            <i class="icon icon-ic_fluent_delete_20_regular"></i
          ></app-button>
        </td>
      </tr>
    </tbody>
  </app-table>
</template>

<script>
import AppTable from "@/components/table/AppTable";
import AppCheckbox from "@/components/controls/AppCheckbox";
import AppButton from "@/components/controls/AppButton";

export default {
  components: {
    AppTable,
    AppCheckbox,
    AppButton,
  },

  props: ["users", "pending"],

  data: () => ({
    headers: [
      {
        title: "Имя",
        key: "firstName",
        active: false,
      },
      {
        title: "Фамилия",
        key: "lastName",
        active: false,
      },
      {
        title: "Организация",
        key: "organisation",
        active: false,
      },
    ],
  }),
  computed: {
    allSelected() {
      let res = true;
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
        this.$emit("select", { index: i, value: val });
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>