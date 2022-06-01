<template>
  <div class="tasks">
    <h2 class="sidebar-title">Мои задачи</h2>
    <vuescroll :ops="ops">
      <div class="tasks__wrapper">
        <app-table>
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox class="checkbox-big" @input="onCheck($event)" />
              </th>
              <th v-for="(h, i) in headers" :key="i">{{ h }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in tasks" :key="item.id">
              <td class="col-checkbox center">
                <app-checkbox :mini="true" @input="onCheck($event)" />
              </td>
              <td class="col-id center">{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.date }}</td>
              <td class="green">{{ item.status }}</td>
              <td class="green">{{ item.result }}</td>
            </tr>
          </tbody>
        </app-table>
      </div>
      <app-preview></app-preview>
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
          background: "#476D70",
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
.preview {
  padding: 20px;
  width: 100%;
  &-picture {
    margin: 20px auto;
    img {
      height: auto;
      width: auto;
      max-width: 450px;
      max-height: 350px;
    }
  }
  &-btns {
    margin-top: 20px;
    display: flex;
    button {
      margin-right: 20px;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    box-shadow: $shadow-big;

    &__nav {
      display: flex;
      margin-top: 10px;
      ul {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;

        list-style: none;
      }
      .line {
        height: 12px;
        border-left: 1px solid $color-main;
      }
      li {
        margin: 0 8px 0 0;
        list-style-type: none;
        button {
          padding: 0;
          margin: 0;

          font-family: inherit;
          border: none;
          background: none;
          color: #000;
          cursor: pointer;
          &:hover {
            color: $color-main;
          }
          &.active {
            color: $color-main;
          }
        }
      }
    }
    &__files {
      margin-right: 20px;
      ul {
        margin-top: 10px;
        color: $color-main;
        text-decoration: underline;
      }
      li {
        list-style-type: none;
        margin-top: 4px;
        font-size: 14px;
        cursor: pointer;
      }
    }
    &__title {
      font-size: 16px;
      color: #000;
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