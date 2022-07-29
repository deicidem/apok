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
        <th
          v-for="(header, i) in headers"
          :key="i"
          class="files-header"
        >
          {{ header.title }}
        </th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, i) in files" :key="item.id">
        <td class="col-checkbox center">
          <app-checkbox
            :mini="true"
            :model-value="item.selected"
            @change="$emit('select', { index: i, value: $event })"
          />
        </td>
        <td>{{ item.id }}</td>
        <td class="dzz-name">{{ item.name }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.date }}</td>
        <td>
          <app-button
            type="button-svg button-svg-r"
            :disabled="!item.deletable || pending"
            @click="$emit('delete', i)"
            :tooltip="item.deletable ? 'Удалить' : 'Файл используется'"
          >
            <i class="icon icon-ic_fluent_delete_20_regular"></i>
          </app-button>
        </td>
      </tr>
    </tbody>
  </app-table>
</template>

<script>
import AppTable from "@/components/table/AppTable.vue";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import AppButton from "@/components/controls/AppButton.vue";
export default {
    components: {
    AppTable,
    AppCheckbox,
    AppButton,
  },
  props: ["pending", 'files'],
  data: () => ({
    headers: [
      {
        title: "№",
        key: "id",
        active: false,
      },
      {
        title: "Задача",
        key: "title",
        active: false,
      },
      {
        title: "Дата добавления",
        key: "date",
        active: false,
      },
      {
        title: "Статус",
        key: "status",
        active: false,
      },
    ],
  }),
  computed: {
    allSelected() {
      let res = true;
      for (let i = 0; i < this.files.length; i++) {
        if (!this.files[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
  },
  methods: {
    selectAll(val) {
      for (let i = 0; i < this.files.length; i++) {
        this.$emit('select', { index: i, value: val });
      }
    },
  }
};
</script>

<style>
</style>