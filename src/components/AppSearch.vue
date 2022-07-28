<template>
  <div class="component">
    <form class="component-form" @submit.prevent>
      <div class="component-form__item" v-if="sortOptions != null">
        <app-select
          ref="sort-select"
          label="Сортировать:"
          size="small"
          class="component-form__input"
          @change="onSortSelect"
          :options="sortOptions"
        ></app-select>

        <app-button
          class="component-form__input"
          size="small"
          type="button-svg button-svg-white"
          @click="onDescChange"
        >
          <i
            v-if="desc"
            class="icon icon-ic_fluent_arrow_sort_down_20_regular"
          ></i>
          <i v-else class="icon icon-ic_fluent_arrow_sort_up_20_regular"></i>
        </app-button>
      </div>

      <div class="component-form__item" v-if="searchOptions != null">
        <app-select
          ref="search-select"
          label="Поиск:"
          class="component-form__input"
          @change="searchField = $event"
          size="small"
          :options="searchOptions"
        ></app-select>

        <app-input
          class="component-form__input"
          :value="searchValue"
          size="small"
          @input="searchValue = $event"
        ></app-input>

        <app-button
          class="component-form__input"
          type="buttonl-svg button-svg-white"
          size="small"
          @click="$emit('search', { field: searchField, value: searchValue })"
        >
          <i class="icon icon-ic_fluent_search_20_regular"></i>
        </app-button>
      </div>
    </form>

    <app-button
      v-if="searchOptions != null"
      class="component-button component-button__clear"
      type="button-white"
      size="small"
      @click="onClear()"
      >Сбросить
    </app-button>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
import AppSelect from "@/components/controls/AppSelect.vue";
import AppInput from "@/components/controls/AppInput.vue";

export default {
  props: ["searchOptions", "sortOptions"],

  components: {
    AppButton,
    AppSelect,
    AppInput,
  },

  data: () => ({
    searchField: null,
    sortField: null,
    searchValue: null,
    desc: false,
  }),

  methods: {
    onSortSelect(field) {
      this.sortField = field;
      this.$emit("sort", { field: this.sortField, desc: this.desc });
    },

    onDescChange() {
      this.desc = !this.desc;
      this.$emit("sort", { field: this.sortField, desc: this.desc });
    },

    onClear() {
      this.$refs["search-select"].clear();
      this.$refs["sort-select"].clear();
      this.searchField =
        this.searchOptions == null ? null : this.searchOptions[0].value;
      this.sortField =
        this.sortOptions == null ? null : this.sortOptions[0].value;

      this.desc = false;
      this.searchValue = null;
      this.$emit("clear");
    },
  },

  mounted() {
    this.searchField =
      this.searchOptions == null ? null : this.searchOptions[0].value;
    this.sortField =
      this.sortOptions == null ? null : this.sortOptions[0].value;
  },
};
</script>

<style lang="scss" scoped>
.component {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  &-form {
    width: 100%;
    height: auto;

    &__title {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
    }

    &__item {
      margin-bottom: 10px;
      margin-right: 30px;
      display: flex;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__input {
      margin-right: 7px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-button__clear {
    height: 28px;
    margin-left: auto;
  }
}
</style>