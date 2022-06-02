<template>
  <div class="tasks">
    <h2 class="sidebar-title">Мои задачи</h2>
    <vuescroll :ops="ops">
      <div class="tasks__wrapper">
        <app-table>
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox class="checkbox-big" @change="onCheck($event)" />
              </th>
              <th v-for="(h, i) in headers" :key="i">{{ h }}</th>
            </tr>
          </thead>

          <tbody v-for="item in tasks" :key="item.id">
            <tr>
              <td class="col-checkbox center">
                <app-checkbox :mini="true" @change="onCheck($event)" />
              </td>
              <td class="col-id center">{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.date }}</td>
              <td class="green">{{ item.status }}</td>

              <td class="green">Посмотреть результат</td>
            </tr>
            <tr>
              <td colspan="6" class="td_preview">
                <app-preview
                  :views="item.result.views"
                  :files="item.result.files"
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
import { mapGetters } from "vuex";
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
          background: "#83B5B8",
        },
      },
    };
  },
  computed: {
    ...mapGetters("tasks", {
      tasks: "getTasks",
      headers: "getHeaders",
    }),
  },
  methods: {
    onCheck(val) {
      console.log(val);
    },
    showResult() {
      this.reportType = !this.reportType;
      this.pictureType = !this.pictureType;
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-direction: column;
  max-height: 100%;
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
    color: #488589;
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