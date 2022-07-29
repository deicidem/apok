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

        <th class="files-header" v-for="(header, i) in headers" :key="i">
          {{ header.title }}
        </th>

        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, i) in groups" :key="i">
        <td class="col-checkbox center">
          <app-checkbox
            :mini="true"
            :model-value="item.selected"
            @change="$emit('select', { index: i, value: $event })"
          />
        </td>
        <td class="group-wrapper-value">
          {{ item.title }}
        </td>
        <td class="group-wrapper-value">
          {{ item.type }}
        </td>
        <td class="group-wrapper-value">
          {{ item.owner.firstName }} {{ item.owner.lastName }}
        </td>
        <td>
          <div class="groups-buttons">
            <app-button
              v-if="item.isOwner"
              class="groups-button"
              type="button-svg button-svg-w"
              tooltip="Подробнее"
              @click="$emit('open', item.id)"
            >
              <i class="icon icon-ic_fluent_open_20_regular"></i
            ></app-button>
            <app-button
              v-if="item.isOwner"
              class="groups-button"
              type="button-svg button-svg-r"
              tooltip="Удалить"
              @click="$emit('delete', item.id)"
            >
              <i class="icon icon-ic_fluent_delete_20_regular"></i
            ></app-button>
            <app-button
              v-else
              class="groups-button"
              type="button-svg button-svg-r"
              tooltip="Выйти"
              @click="$emit('quit', item.id)"
            >
              <i class="icon icon-ic_fluent_sign_out_20_regular"></i
            ></app-button>
          </div>
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

  props: ["groups", "pending"],

  data: () => ({
    headers: [
      {
        title: "Имя группы",
        key: "name",
        active: false,
      },
      {
        title: "Тип группы",
        key: "id",
        active: false,
      },
      {
        title: "Владелец",
        key: "id",
        active: false,
      },
    ],
  }),
  computed: {
    allSelected() {
      let res = true;
      for (let i = 0; i < this.groups.length; i++) {
        if (!this.groups[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
  },
  methods: {
    selectAll(val) {
      for (let i = 0; i < this.groups.length; i++) {
        this.$emit("select", { index: i, value: val });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.groups-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.groups-button {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>