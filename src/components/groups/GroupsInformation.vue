<template>
  <div class="group">
    <div class="group-wrapper">
      <app-table>
        <thead>
          <tr>
            <th class="col-checkbox center">
              <app-checkbox />
            </th>

            <th class="files-header" v-for="(header, i) in headers" :key="i">
              {{ header.title }}
            </th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, key) in groups" :key="key">
            <td class="col-checkbox center">
              <app-checkbox :mini="true" />
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
              <app-button type="button-svg button-svg-r" tooltip="Удалить">
                <i class="icon icon-ic_fluent_delete_20_regular"></i
              ></app-button>
            </td>
          </tr>
        </tbody>
      </app-table>

      <app-button
        class="group-button"
        type="button-g"
        @click="showPopup = true"
      >
        Добавить новую группу
      </app-button>
    </div>
    <portal to="group-popup">
      <add-group
        v-show="showPopup"
        @close="showPopup = false"
      ></add-group>
    </portal>
  </div>
</template>

<script>
import AppTable from "@/components/table/AppTable";
import AppCheckbox from "@/components/controls/AppCheckbox";
import AppButton from "@/components/controls/AppButton";
import AddGroup from "@/components/groups/AddGroup";
export default {
  components: {
    AppTable,
    AppCheckbox,
    AppButton,
    AddGroup,
  },
  props: ['groups'],
  data() {
    return {
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
      showPopup: false,
    };
  },
  
  
};
</script>

<style scoped lang="scss">
.group {
  &-button {
    max-width: 230px;
    margin: 20px auto;
  }
}
</style>