<template>
  <app-table class="results-table" :disabled="pending">
    <thead>
      <tr>
        <th></th>
        <th
          v-for="(header, i) in headers"
          :key="i"
          class="results-table__header"
        >
          {{ header.title }}
        </th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(item, i) in results"
        :key="i"
        :class="{
          selectable:
            selectable.value &&
            !(
              item.selected.value == selectable.value &&
              item.selected.type != selectable.type
            ),
          [`selected-${item.selected.type + 1}`]: item.selected.value,
        }"
        @click="select(i, item.selected.value)"
      >
        <td class="results-table__buttons">
          <div class="results-circle"></div>

          <div class="button__wrapper results-table__button">
            <app-button
              class="results-button"
              type="button-svg"
              tooltip="Границы"
              :active="results[i].polygonActive"
              @click="
                $emit('show-polygon', {
                  index: i,
                  id: item.id,
                  geography: item.geography,
                })
              "
            >
              <i class="icon icon-ic_fluent_select_object_20_regular"></i>
            </app-button>
          </div>

          <div class="button__header results-table__button">
            <app-button
              class="results-button"
              type="button-svg"
              tooltip="Изображение"
              :active="results[i].imageActive"
              @click="
                $emit('show-image', {
                  index: i,
                  id: item.id,
                  preview: item.previewPath,
                  geography:
                    item.geography == null ? null : item.geography.bbox,
                })
              "
            >
              <i class="icon icon-ic_fluent_image_20_regular"></i>
            </app-button>
          </div>
        </td>

        <td class="dzz-name">{{ item.name }}</td>

        <td>{{ item.satelite }}</td>

        <td>{{ item.date }}</td>

        <td>{{ item.cloudiness }}%</td>

        <td class="results-table__buttons">
          <div class="button__wrapper results-table__button">
            <app-button
              type="button-svg"
              class="results-button"
              tooltip="Подробнее"
              :active="results[i].cardActive"
              @click="$emit('show-card', i)"
            >
              <i class="icon icon-ic_fluent_textbox_more_20_regular"></i>
            </app-button>
          </div>
        </td>
      </tr>
    </tbody>
  </app-table>
</template>

<script>
import AppTable from "@/components/table/AppTable.vue";
import AppButton from "@/components/controls/AppButton.vue";
export default {
  components: {
    AppTable,
    AppButton,
  },
  props: ["pending", "results", "selectable"],
  data: () => ({
    headers: [
      {
        title: "Идентификатор",
        key: "name",
        active: false,
      },
      {
        title: "Аппарат",
        key: "name",
        active: false,
      },
      {
        title: "Дата съемки",
        key: "date",
        active: false,
      },
      {
        title: "Облачность",
        key: "cloudiness",
        active: false,
      },
    ],
  }),
  methods: {
    select(i, selected) {
      if (this.selectable.value) {
        this.$emit('select', {
          index: i,
          value: this.selectable.value,
          selected: !selected,
          type: this.selectable.type,
        });
      }
    },
  }
};
</script>

<style>
</style>