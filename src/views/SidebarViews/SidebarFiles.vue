<template>
  <div class="tasks">
    <h2 class="sidebar-title">Мои файлы</h2>
    <vuescroll :ops="scrollOps">
      <div class="tasks__wrapper">
        <table>
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox class="checkbox-big" @change="onCheck($event)" />
              </th>
              <th>Имя файла</th>
              <th>Тип файла</th>
              <th>Дата добавления</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="col-checkbox center">
                <app-checkbox :mini="true" @change="onCheck($event)" />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
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
import AppCheckbox from "@/components/controls/AppCheckbox";

export default {
  name: "SidebarTasks",
  components: {
    AppCheckbox,
    vuescroll,
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
  },
  async mounted() {
    await this.load();
  },
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
    left: 0;
    top: 60%;
    transform: translate(-50%, -50%);
    svg path {
      fill: $color-main;
    }
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
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;

  thead {
    background: $gradient-w;
    box-shadow: $shadow-small;
    tr {
      th {
        text-align: left;
        border: none;
        font-size: 12px;
        color: $color-main;
        padding: 8px;
        box-sizing: border-box;
      }
    }
  }
  tbody {
    text-align: left;
    font-size: 12px;
    color: #384342;
    vertical-align: top;
    line-height: 150%;
    border-bottom: 1px solid rgba(71, 109, 112, 0.3);
    &:last-child {
      border-bottom: none;
    }
    tr {
      line-height: 17px;
      td {
        padding: 10px;
        max-width: 150px;
      }
    }
  }
}

@media screen and (max-width: 1440px) {
}
</style>