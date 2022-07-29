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
        <app-search
          @search="filterBySearch($event)"
          @sort="sortBy($event)"
          @clear="fetchAll()"
          :sortOptions="getSortOptions"
          :searchOptions="getSearchOptions"
        ></app-search>
        <files-table
          :files="files"
          :pending="isPending"
          @select="selectFile"
          @delete="onDelete"
        >
        </files-table>
        <app-pagination
          :page-count="getPagination.last"
          @changePage="fetchFiles"
          :current-page="getPagination.currentPage"
        ></app-pagination>
        <div class="files-buttons">
          <app-button
            class="files-button"
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
// import VsPagination from "@vuesimple/vs-pagination";
import AppDeleteConfirmation from "@/components/AppDeleteConfirmation";
import { mapGetters, mapActions } from "vuex";
import AppButton from "@/components/controls/AppButton";
import SidebarBase from "@/components/SidebarBase.vue";
import AppPagination from "@/components/controls/AppPagination";
import AppSearch from "@/components/AppSearch.vue";
import FilesTable from "@/components/files/FilesTable.vue";
export default {
  name: "SidebarFiles",
  components: {
    AppButton,
    AppDeleteConfirmation,
    // VsPagination,
    SidebarBase,
    AppPagination,
    AppSearch,
    FilesTable,
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
      getPagination: "getPagination",
      isPending: "isPending",
      getSearchOptions: "getSearchOptions",
      getSortOptions: "getSortOptions",
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
    await this.fetchFiles();
    this.loaded = true;
  },
  methods: {
    ...mapActions("files", [
      "sortFilesBy",
      "fetchFiles",
      "deleteFiles",
      "selectFile",
      "deleteFile",
      "fetchAll",
      "sortBy",
      "filterBySearch",
    ]),

    async onDelete(i) {
      const ok = await this.$refs.deleteConfirm.show({
        title: "Вы уверены, что хотите удалить этот файл?",
        message:
          "Удаление этого файла приведет к потере всех связанных с ним данных.",
        actionMessage: "Удалить",
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
        actionMessage: "Удалить",
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

    // sortBy(key, ind) {
    //   this.headers.forEach((el, i) => {
    //     el.active = i == ind;
    //   });
    //   this.sortFilesBy(key);
    // },
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