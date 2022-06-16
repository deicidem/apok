<template>
  <div class="files">
    <h2 class="sidebar-title">Мои файлы</h2>
    <vuescroll :ops="scrollOps">
      <div class="files__wrapper">
        <app-table>
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox :model-value="allSelected" class="checkbox-big" @change="selectAll" />
              </th>
              <th
                v-for="(header, i) in headers"
                :key="i"
                @click="sortBy(header.key, i)"
                class="files-header"
              >
                <template v-if="header.active">
                  <span v-if="sortDir == 'asc'" class="files-sort">
                    <img
                      svg-inline
                      src="@/assets/img/sort-asc.svg"
                      alt="Сортировка"
                    />
                  </span>
                  <span v-else class="files-sort">
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

          <tbody>
            <tr v-for="(item, i) in files" :key="item.id">
              <td class="col-checkbox center">
                <app-checkbox :mini="true" :model-value="item.selected" @change="selectFile({index: i, value: $event})" />
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <!-- <td>{{ `${item.date.getDate()}.${item.date.getMonth() + 1}.${item.date.getFullYear()}` }}</td> -->
              <td>{{ item.date.toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </app-table>
        <div class="files-buttons">
          <button class="button button-r" @click="deleteFiles">Удалить выбранное</button>
          <button class="button button-g">Добавить в избранное</button>
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
import { mapGetters, mapActions } from "vuex";
import AppCheckbox from "@/components/controls/AppCheckbox";

export default {
  name: "SidebarTasks",
  components: {
    AppCheckbox,
    AppTable,
    vuescroll,
    // VsPagination,
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
          title: "Имя",
          key: "name",
          active: false,
        },
        {
          title: "Тип",
          key: "type",
          active: false,
        },
        {
          title: "Дата добавления",
          key: "date",
          active: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["scrollOps"]),
    ...mapGetters("users", {
      files: "getFiles",
      sortDir: "getSortDir",
    }),
    allSelected() {
      let res = true
      for (let i = 0; i < this.files.length; i++) {
        if (!this.files[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    }
  },
  methods: {
    ...mapActions("users", ["sortFilesBy", "loadFiles", "deleteFiles", "selectFile"]),
    selectAll(val) {
      for (let i = 0; i < this.files.length; i++) {
        this.selectFile({index: i, value: val})        
      }
    },
    sortBy(key, ind) {
      this.headers.forEach((el, i) => {
        el.active = i == ind;
      });
      this.sortFilesBy(key);
    },
    onCheck(val) {
      console.log(val);
    },
  },
  async mounted() {
    await this.loadFiles();
  },
};
</script>

<style lang="scss" scoped>
.td-results {
  position: relative;
}
.files {
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
        fill: #fff;
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
  .files {
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