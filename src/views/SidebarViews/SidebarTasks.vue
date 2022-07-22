<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои задачи</h2>
    </template>

    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    </template>

    <template v-slot:content>
      <div class="tasks__wrapper">
        <app-search
          @search="filterBySearch($event)"
          @sort="sortBy($event)"
          @clear="fetchAll()"
          :sortOptions="getSortOptions"
          :searchOptions="getSearchOptions"
        ></app-search>
        <app-table v-if="tasks != null" :disabled="isPending">
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox
                  :modelValue="allSelected"
                  @change="selectAll($event)"
                />
              </th>

              <th
                v-for="(header, i) in headers"
                :key="i"
                @click="sortBy(header.key, i)"
                class="tasks-header"
              >
                <template v-if="header.active">
                  <span v-if="sortDir == 'asc'" class="tasks-sort">
                    <i class="fa-solid fa-arrow-down-short-wide"></i>
                  </span>

                  <span v-else class="tasks-sort">
                    <i class="fa-solid fa-arrow-down-wide-short"></i>
                  </span>
                </template>
                {{ header.title }}
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody v-for="(item, i) in tasks" :key="item.id">
            <tr>
              <td class="col-checkbox center">
                <app-checkbox
                  :mini="true"
                  :model-value="item.selected"
                  @change="selectTask({ index: i, value: $event })"
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
                      @click="showResult(i, item)"
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
                      @click="toggleNote()"
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
                      @click="onDelete(i)"
                    >
                      <i class="icon icon-ic_fluent_delete_20_regular"></i>
                    </app-button>
                  </div>
                </div>
              </td>
            </tr>

            <tr
              class="tr_note tr_preview"
              v-show="showNote"
              v-if="item.note != null"
            >
              <td td colspan="6">
                <task-note :note="item.note" @close="showNote = false"></task-note>
              </td>
            </tr>

            <tr
              class="tr_preview"
              v-show="item.result.active"
              v-if="item.result != null"
            >
              <td colspan="6">
                <task-result
                  :views="item.result.views"
                  :files="item.result.files"
                  :taskIndex="i"
                  @close="showResult(i, item)"
                ></task-result>
              </td>
            </tr>
          </tbody>
        </app-table>

        <app-pagination
          :page-count="getPagination.last"
          @changePage="fetchTasks"
          :current-page="getPagination.currentPage"
        ></app-pagination>

        <div class="tasks-buttons">
          <app-button
            class="tasks-button"
            type="button-r"
            :disabled="noItemsSelected || notDeletableItemSelected || pending"
            @click="onDeleteBanch"
          >
            Удалить выбранное
          </app-button>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import AppTable from "@/components/table/AppTable.vue";
import TaskResult from "@/components/tasks/TaskResult.vue";
import TaskNote from "@/components/tasks/TaskNote.vue";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation.vue";
import { mapGetters, mapActions } from "vuex";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import SidebarBase from "@/components/SidebarBase.vue";
import AppButton from "@/components/controls/AppButton.vue";
import AppProgress from "@/components/controls/AppProgress.vue";
import AppPagination from "@/components/controls/AppPagination.vue";
import AppSearch from "@/components/AppSearch.vue";

export default {
  name: "SidebarTasks",

  components: {
    AppCheckbox,
    AppTable,
    AppDeleteConfirmation,
    TaskResult,
    TaskNote,
    SidebarBase,
    AppButton,
    AppProgress,
    AppPagination,
    AppSearch,
  },

  data() {
    return {
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
      reportType: false,
      pictureType: false,
      pending: false,
      loaded: false,
      showNote: false,
    };
  },

  computed: {
    ...mapGetters("tasks", {
      tasks: "getTasks",
      sortDir: "getSortDir",
      getPagination: "getPagination",
      isPending: "isPending",
      getSearchOptions: "getSearchOptions",
      getSortOptions: "getSortOptions"
    }),

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

    noItemsSelected() {
      let tasks = this.tasks;
      let res = true;
      for (let i = 0; i < tasks?.length; i++) {
        if (tasks[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },

    notDeletableItemSelected() {
      let tasks = this.tasks;
      let res = false;
      if (tasks == null) {
        return false;
      }
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].selected && !tasks[i].deletable) {
          res = true;
          break;
        }
      }
      return res;
    },
  },

  methods: {
    ...mapActions("tasks", [
      "setTaskActive",
      "sortTasksBy",
      "fetchTasks",
      "reload",
      "selectTask",
      "deleteTasks",
      "deleteTask",
      "fetchAll", 
      "sortBy",
      "filterBySearch"
    ]),

    selectAll(val) {
      for (let i = 0; i < this.tasks.length; i++) {
        this.selectTask({ index: i, value: val });
      }
    },

    showResult(i, task) {
      if (task.result != null) {
        this.setTaskActive({ index: i, val: !task.result.active });
      }
    },

    toggleNote() {
      if (this.showNote) {
        this.showNote = false;
      } else {
        this.showNote = true;
      }
    },

    async onDelete(i) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эту задачу?",
        message:
          "Удаление этой задачи приведет к потере всех связанных с ней данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteTask(i);
        this.pending = false;
      }
    },

    async onDeleteBanch() {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эти задачи?",
        message:
          "Удаление этих задач приведет к потере всех связанных с ними данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.pending = true;
        await this.deleteTasks();
        this.pending = false;
      }
    },
  },

  async created() {
    console.log("start");
    if (this.tasks == null) {
      await this.fetchTasks();
    } else {
      await this.reload();
    }
    console.log("end");
    this.loaded = true;
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-direction: column;
  max-height: 100%;

  &-buttons {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  &-button {
    width: auto;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }

  .tr_preview {
    border: none;
  }

  &-header {
    position: relative;
  }

  &-sort {
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translate(-50%, -50%);
    color: $color-main;
    font-size: 12px;
  }

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

  &__wrapper {
    margin: 30px;

    &-table {
      height: inherit;
      overflow-x: auto;
      margin-top: 0px;
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

@media screen and (max-width: 1440px) {
  .tasks {
    &__wrapper {
      margin: 20px;
    }
    th,
    td {
      padding: 6px 10px;
      line-height: 130%;

      font-weight: 400;
    }
    .col-checkbox {
      width: 24px;
    }
    .col-id {
      width: 40px;
    }
  }
}
</style>