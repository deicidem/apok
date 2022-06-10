<template>
  <div class="tasks" >
    <h2 class="sidebar-title">Мои задачи</h2>
    <vuescroll :ops="scrollOps">
      <div class="tasks__wrapper">
        <app-table v-if="tasks != null">
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox class="checkbox-big" @change="onCheck($event)" />
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
            </tr>
          </thead>

          <tbody v-for="(item, i) in tasks" :key="item.id">
            <tr @click="showResult(i, item)">
              <td class="col-checkbox center">
                <app-checkbox :mini="true" @change="onCheck($event)" />
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
                <button class="tasks-table__button" v-if="item.result != null">
                  Посмотреть результат
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="6" class="td_preview">
                <app-preview
                  v-show="item.result.active"
                  v-if="item.result != null"
                  :views="item.result.views"
                  :files="item.result.files"
                  :taskIndex="i"
                ></app-preview>
              </td>
            </tr>
          </tbody>
        </app-table>
      </div>
      <!-- <vs-pagination :total-pages="5"></vs-pagination> -->
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
// import VsPagination from "@vuesimple/vs-pagination";
import { mapGetters, mapActions } from "vuex";
import AppTable from "@/components/table/AppTable";
import AppCheckbox from "@/components/controls/AppCheckbox";
import AppPreview from "@/components/cards/AppPreview";

export default {
  name: "SidebarTasks",
  components: {
    AppTable,
    AppCheckbox,
    vuescroll,
    AppPreview,
    // VsPagination,
  },
  data() {
    return {
      headers: [
        {
          title: "Номер",
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
        {
          title: "Результат",
          key: "result",
          active: false,
        },
      ],
      reportType: false,
      pictureType: false,
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,
          wheelScrollDuration: 500,
        },
        scrollPanel: {
          scrollingX: false,
          speed: 300,
          easing: "easeOutQuad",
        },
        rail: {
          background: "#000",
          opacity: 0.1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#6BA2A6",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["scrollOps"]),
    ...mapGetters("tasks", {
      tasks: "getTasks",
      sortDir: "getSortDir",
    }),
  },
  methods: {
    ...mapActions("tasks", ["setTaskActive", "sortTasksBy", "load"]),
    onCheck(val) {
      console.log(val);
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
  },
  async mounted() {
    await this.load()
  }
};
</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-header {
    position: relative;
  }
  &-sort {
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &-table {
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
      margin-top: 3px;
      width: 120px;
      border-radius: 3px;
      height: 10px;
      background: $gradient-w;
      box-shadow: inset 1px 1px 3px rgba(#000, 0.15);
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
    background: #ffffff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px;
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
  .col-id {
    width: 70px;
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