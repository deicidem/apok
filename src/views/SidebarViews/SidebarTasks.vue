<template>
  <div class="tasks">
    <h2 class="sidebar-title">Мои задачи</h2>
    <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    <vuescroll :ops="scrollOps">
      <div class="tasks__wrapper">
        <app-table v-if="tasks != null">
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
                    <img
                      svg-inline
                      src="@/assets/img/sort-asc.svg"
                      alt="Сортировка"
                    />
                  </span>
                  <span v-else class="tasks-sort">
                    <img
                      svg-inline
                      src="@/assets/img/sort-desc.svg"
                      alt="Сортировка"
                    />
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
              <!-- <td>{{ `${item.date.getDate()}.${item.date.getMonth() + 1}.${item.date.getFullYear()}` }}</td> -->
              <td>{{ item.date.toLocaleDateString() }}</td>
              <!--  -->
              <td v-if="!isNaN(+item.status)">
                Выполняется: {{ item.status }}%
                <div class="tasks-table__progress">
                  <div
                    class="tasks-table__progress__value"
                    :style="{ width: +item.status + '%' }"
                  ></div>
                </div>
              </td>
              <td v-else>{{ item.status }}</td>
              <td>
                <div class="tasks-table__buttons">
                  <div class="button__wrapper">
                    <button
                      v-if="item.result != null"
                      @click="showResult(i, item)"
                      class="button button-svg button-white tasks-button"
                    >
                      <img
                        svg-inline
                        src="@/assets/img/results-info.svg"
                        alt="Изображение"
                      />
                    </button>
                    <span class="tooltiptext">Посмотреть результат</span>
                  </div>
                  <div class="button__wrapper">
                    <button
                      class="button button-white button-svg-r"
                      :disabled="!item.deletable"
                      @click="onDelete(i)"
                    >
                      <img
                        svg-inline
                        src="@/assets/img/trash.svg"
                        alt="Удалить"
                      />
                    </button>
                    <span class="tooltiptext">Удалить</span>
                  </div>
                </div>
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
        <div class="tasks-buttons">
          <button
            class="button button-r"
            :disabled="noItemsSelected || notDeletableItemSelected"
            @click="onDeleteBanch"
          >
            Удалить выбранное
          </button>
          <button class="button button-g" :disabled="noItemsSelected">
            Добавить в избранное
          </button>
        </div>
      </div>

      <!-- <vs-pagination :total-pages="5"></vs-pagination> -->
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
// import VsPagination from "@vuesimple/vs-pagination";
import AppTable from "@/components/table/AppTable";
import TaskResult from "@/components/tasks/TaskResult";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";
import AppCheckbox from "@/components/controls/AppCheckbox";

export default {
  name: "SidebarTasks",
  components: {
    AppCheckbox,
    AppTable,
    vuescroll,
    AppDeleteConfirmation,
    // VsPagination,
    TaskResult,
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
    };
  },
  computed: {
    ...mapGetters(["scrollOps"]),
    ...mapGetters("tasks", {
      tasks: "getTasks",
      sortDir: "getSortDir",
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
      "load",
      "reload",
      "selectTask",
      "deleteTasks",
      "deleteTask",
    ]),
    selectAll(val) {
      console.log(1);
      for (let i = 0; i < this.tasks.length; i++) {
        this.selectTask({ index: i, value: val });
      }
    },
    sortBy(key, ind) {
      this.headers.forEach((el, i) => {
        el.active = i == ind;
      });
      this.sortTasksBy(key);
    },
    showResult(i, task) {
      if (task.result != null) {
        this.setTaskActive({ index: i, val: !task.result.active });
      }
    },
    async onDelete(i) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эту задачу?",
        message:
          "Удаление этой задачи приведет к потере всех связанных с ней данных.",
      });
      if (ok) {
        console.log("You have successfully delete this page.");
        this.deleteTask(i);
      } else {
        console.log("You chose not to delete this page. Doing nothing now.");
      }
    },
    async onDeleteBanch() {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эти задачи?",
        message:
          "Удаление этих задач приведет к потере всех связанных с ними данных.",
      });
      if (ok) {
        console.log("You have successfully delete this page.");
        this.deleteTasks();
      } else {
        console.log("You chose not to delete this page. Doing nothing now.");
      }
    },
  },
  async mounted() {
    if (this.tasks == null) {
      await this.load();
    } else {
      await this.reload();
    }
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
    .button {
      width: auto;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
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
    left: 0;
    top: 60%;
    transform: translate(-50%, -50%);
    svg path {
      fill: $color-main;
    }
  }
  &-table {
    &__buttons {
      display: flex;
      justify-content: space-between;
    }
    &__button {
      text-align: left;
      font-size: 12px;
      background: none;
      border: none;
      color: $color-main;
      &:hover {
        cursor: pointer;
        color: $color-main-light;
      }
    }
    &__progress {
      margin-top: 5px;
      width: 120px;
      border-radius: 3px;
      height: 10px;
      background: $gradient-w;
      box-shadow: inset 1px 1px 3px rgba($black, 0.15);
      overflow: hidden;
      &__value {
        border-radius: 3px;
        height: 100%;
        background-image: linear-gradient(
          to right,
          $color-main-dark,
          $color-main-light,
          $color-main-dark
        );
        transition: width 0.3s ease-out;
        box-shadow: $shadow-small;
        background-size: 400%;
        animation: progress 16s ease-out infinite;
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
  &-button {
    margin: auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    background: $gradient-w;
    &.active {
      background: $color-main;
      svg path {
        fill: $white;
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

@keyframes progress {
  0% {
    background-position: 400%;
  }
  100% {
    background-position: -400%;
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