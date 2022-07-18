<template>
  <ul class="pagination">
    <li class="pagination-page">
      <app-button
        type="button-svg button-svg-white"
        class="pagination-page__link"
        @click="changePage(1)"
        :disabled="currentPage == 1"
      >
        <i class="icon icon-ic_fluent_chevron_double_left_20_regular"></i>
      </app-button>
    </li>
    <li class="pagination-page">
      <app-button
        type="button-svg button-svg-white"
        class="pagination-page__link"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage == 1"
      >
        <i class="icon icon-ic_fluent_chevron_left_20_regular"></i>
      </app-button>
    </li>
    <li
      class="pagination-page"
      v-for="i in pages"
      :key="i"
    >
      <app-button
      :active="currentPage == i"
        :static="currentPage == i"
        type="button-svg button-svg-white" class="pagination-page__link" @click="changePage(i)">
        {{ i }}
      </app-button>
    </li>
    <li class="pagination-page">
      <app-button
        type="button-svg button-svg-white"
        class="pagination-page__link"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage == pageCount"
      >
        <i class="icon icon-ic_fluent_chevron_right_20_regular"></i>
      </app-button>
    </li>
    <li class="pagination-page">
      <app-button
        type="button-svg button-svg-white"
        class="pagination-page__link"
        @click="changePage(pageCount)"
        :disabled="currentPage == pageCount"
      >
        <i class="icon icon-ic_fluent_chevron_double_right_20_regular"></i>
      </app-button>
    </li>
  </ul>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    AppButton
  },
  props: ["pageCount", "currentPage"],
  computed: {
    pages() {
      let pages = [];
      let maxToShow = this.pageCount > 9 ? 9 : this.pageCount;
      let pageMargin = Math.floor(maxToShow / 2);
      let firstPage =
        this.currentPage - pageMargin > 1 ? this.currentPage - pageMargin : 1;
      let lastPage =
        this.currentPage + pageMargin > this.pageCount
          ? this.pageCount
          : this.currentPage + pageMargin;
      if (maxToShow - this.currentPage > pageMargin) {
        lastPage = maxToShow;
      }
      if (lastPage - this.currentPage < pageMargin) {
        firstPage = lastPage - maxToShow + 1;
      }
      for (let i = firstPage; i <= lastPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(i) {
      if (i != this.currentPage) {
        this.$emit("changePage", i);
      }
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  padding: 0;
  list-style: none;
  &-page {
    margin: 0 5px;
  }
}
</style>