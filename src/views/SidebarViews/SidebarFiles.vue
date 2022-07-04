<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои файлы</h2>
    </template>
    <template v-slot:popups>
      <app-delete-confirmation ref="deleteConfirm"></app-delete-confirmation>
    </template>
    <template v-slot:content>
      <div class="files__wrapper">
        <app-table>
          <thead>
            <tr>
              <th class="col-checkbox center">
                <app-checkbox
                  :model-value="allSelected"
                  class="checkbox-big"
                  @change="selectAll"
                />
              </th>
              <th
                v-for="(header, i) in headers"
                :key="i"
                @click="sortBy(header.key, i)"
                class="files-header"
              >
                <template v-if="header.active">
                  <span v-if="sortDir == 'asc'" class="files-sort">
                    <i class="fa-solid fa-arrow-down-short-wide"></i>
                  </span>
                  <span v-else class="files-sort">
                    <i class="fa-solid fa-arrow-down-wide-short"></i>
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
                <app-checkbox
                  :mini="true"
                  :model-value="item.selected"
                  @change="selectFile({ index: i, value: $event })"
                />
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.date.toLocaleDateString() }}</td>
              <td>
                  <app-button
                    type="button-svg button-svg-r"
                    :disabled="!item.deletable || pending"
                    @click="onDelete(i)"
                    :tooltip="item.deletable ? 'Удалить' : 'Файл используется'"
                  >
                    <i class="icon icon-ic_fluent_delete_20_regular"></i>
                  </app-button>
              </td>
            </tr>
          </tbody>
        </app-table>
        <div class="files-buttons">
          <app-button
            class="files-button"
            type="button-r"
            :disabled="noItemsSelected || notDeletableItemSelected || pending"
            @click="onDeleteBanch"
          >
            Удалить выбранное

          </app-button>
          <app-button
            class="files-button"
            type="button-g"
            :disabled="noItemsSelected || pending"
          >
            Добавить в избранное
          </app-button>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
// import VsPagination from "@vuesimple/vs-pagination";
import AppTable from "@/components/table/AppTable";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";
import AppCheckbox from "@/components/controls/AppCheckbox";
import AppButton from "@/components/controls/AppButton";
import SidebarBase from "@/components/SidebarBase.vue";
export default {
  name: "SidebarFiles",
  components: {
    AppCheckbox,
    AppTable,
    AppButton,
    AppDeleteConfirmation,
    // VsPagination,
    SidebarBase,
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
      pending: false,
      loaded: false,
    };
  },
  computed: {
    ...mapGetters("files", {
      files: "getFiles",
      sortDir: "getSortDir",
    }),

    allSelected() {
      let res = true;
      for (let i = 0; i < this.files.length; i++) {
        if (!this.files[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },

    noItemsSelected() {
      let files = this.files;
      let res = true;
      for (let i = 0; i < files.length; i++) {
        if (files[i].selected) {
          res = false;
          break;
        }
      }
      return res;
    },

    notDeletableItemSelected() {
      let files = this.files;
      let res = false;
      for (let i = 0; i < files?.length; i++) {
        if (files[i]?.selected && !files[i]?.deletable) {
          res = true;
          break;
        }
      }
      return res;
    },
  },
  async mounted() {
    await this.loadFiles();
    this.loaded = true;
  },
  methods: {
    ...mapActions("files", [
      "sortFilesBy",
      "loadFiles",
      "deleteFiles",
      "selectFile",
      "deleteFile",
    ]),

    async onDelete(i) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить этот файл?",
        message:
          "Удаление этого файла приведет к потере всех связанных с ним данных.",
      });
      if (ok) {
        this.pending = true;
        await this.deleteFile(i);
        this.pending = false;
      }
    },

    async onDeleteBanch() {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить эти файлы?",
        message:
          "Удаление этих файлов приведет к потере всех связанных с ними данных.",
      });
      if (ok) {
        this.pending = true;
        await this.deleteFiles();
        this.pending = false;
      }
    },

    selectAll(val) {
      for (let i = 0; i < this.files.length; i++) {
        this.selectFile({ index: i, value: val });
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
};
</script>

<style lang="scss" scoped>
.table-button__wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.files {
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