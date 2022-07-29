<template>
  <app-table :disabled="pending">
    <thead>
      <tr>
        <th class="col-checkbox center">
          <app-checkbox :modelValue="allSelected" @change="selectAll($event)" />
        </th>

        <th
          v-for="(header, i) in headers"
          :key="i"
          class="tasks-header"
        >
          {{ header.title }}
        </th>

        <th></th>
      </tr>
    </thead>

    <tbody>
      <template v-for="(item, i) in tasks">
        <tr :key="item.id + '-info'">
          <td class="col-checkbox center">
            <app-checkbox
              :mini="true"
              :model-value="item.selected"
              @change="$emit('select', { index: i, value: $event })"
            />
          </td>

          <td class="col-id center">{{ item.id }}</td>

          <td>{{ item.title }}</td>

          <td>{{ item.date }}</td>

          <td v-if="!isNaN(+item.status)">
            Выполняется: {{ item.status }}%
            <app-progress :value="+item.status"></app-progress>
          </td>

          <td v-else>{{ item.status }}</td>

          <td>
            <div class="tasks-table__buttons">
              <div class="button__wrapper">
                <app-button
                  v-if="item.result != null"
                  @click="$emit('show-result', {index: i, task: item})"
                  tooltip="Результат"
                  type="button-svg"
                  class="tasks-table__button"
                >
                  <i class="icon icon-ic_fluent_open_20_regular"></i>
                </app-button>
              </div>

              <div class="button__wrapper">
                <app-button
                  v-if="item.note != null"
                  @click="$emit('show-note', {index: i, value: !item.noteActive})"
                  tooltip="Заметки"
                  type="button-svg"
                  class="tasks-table__button"
                >
                  <i class="icon icon-ic_fluent_pen_20_regular"></i>
                </app-button>
              </div>

              <div class="button__wrapper">
                <app-button
                  type="button-svg button-svg-r"
                  :disabled="!item.deletable || pending"
                  tooltip="Удалить"
                  @click="$emit('delete', i)"
                >
                  <i class="icon icon-ic_fluent_delete_20_regular"></i>
                </app-button>
              </div>
            </div>
          </td>
        </tr>

        <tr
          v-if="item.note != null"
          v-show="item.noteActive"
          :key="item.id + '-note'"
          class="tr_extra"
        >
          <td colspan="6">
            <slot :task="item" :index="i"  name="note"></slot>
          </td>
        </tr>

        <tr
          class="tr_extra"
          v-show="item.result.active"
          v-if="item.result != null"
          :key="item.id + '-preview'"
        >
          <td colspan="6">
            <slot :task="item" :index="i" name="result"></slot>
          </td>
        </tr>
      </template>
    </tbody>
  </app-table>
</template>

<script>
import AppTable from "@/components/table/AppTable.vue";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import AppButton from "@/components/controls/AppButton.vue";
import AppProgress from "@/components/controls/AppProgress.vue";
export default {
  components: {
    AppTable,

    AppCheckbox,
    AppButton,
    AppProgress,
  },
  props: ["pending", 'tasks'],
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
  methods: {
    selectAll(val) {
      for (let i = 0; i < this.tasks.length; i++) {
        this.$emit('select', { index: i, value: val });
      }
    },
    showResult(i, task) {
      if (task.result != null) {
        this.$emit('showResult', { index: i, val: !task.result.active });
      }
    },
  },
  computed: {
    allSelected() {
      let res = true;
      for (let i = 0; i < this.tasks.length; i++) {
        if (!this.tasks[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },
  }
};
</script>

<style lang="scss" scoped>
.tr_extra {
  border-top: none;
}
.tasks {
  &-table {
    &__buttons {
      display: flex;
      justify-content: flex-end;
    }

    &__button {
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .green {
    color: $color-main;
  }

  .col-checkbox {
    width: 40px;
  }

  .center {
    text-align: center;
  }

  thead {
    input {
      width: 20px;
      height: 20px;

      background: #eff2f2;
      border-radius: 50%;
      border: none;
    }
  }

  tbody {
    tr {
      position: relative;
    }

    input {
      width: 16px;
      height: 16px;

      background: #eff2f2;
      border-radius: 50%;
      border: none;
    }

    input {
      width: 16px;
      height: 16px;

      background: #eff2f2;
      box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      border: none;
    }
  }
}
</style>