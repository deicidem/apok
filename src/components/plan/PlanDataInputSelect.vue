<template>
  <plan-data-input>
    <h6 class="c-title">{{ title }}</h6>
    <div class="c-content">
      <div class="c-text c-selected" @click="showSelect = !showSelect">
        <div class="c-select__icon">
          <i class="icon icon-ic_fluent_triangle_down_20_filled"></i>
        </div>
        <template v-if="selectedOption != null">
          {{ selectedOption.title }}
        </template>
      </div>
      <div class="c-select" v-show="showSelect">
        <div
          class="c-select__option"
          @click="onSelect(i)"
          v-for="(option, i) in options"
          :key="option.id"
        >
          {{ option.title }}
        </div>
      </div>
    </div>
  </plan-data-input>
</template>

<script>
import PlanDataInput from "@/components/plan/PlanDataInput";

export default {
  components: {
    PlanDataInput,
  },
  props: ["title", "options", "selected"],
  data: () => ({
    showSelect: false,
    selectedOptionIndex: null,
  }),
  computed: {
    selectedOption() {
      return this.options[this.selectedOptionIndex];
    },
  },
  mounted() {
    this.selectedOptionIndex = this.selected;
  },
  methods: {
    onSelect(index) {
      this.showSelect = false;
      this.selectedOptionIndex = index;
      this.$emit("select", index);
    },
  },
  watch: {
    selected(newV, oldV) {
      console.log(newV, oldV);
      this.selectedOptionIndex = newV;
    },
  },
};
</script>

<style lang="scss" scoped>
.c {
  &-select {
    width: 100%;
    margin-top: 4px;
    z-index: 10;
    position: absolute;
    top: calc(100% + 3px);
    left: 10px;
    background: $white;
    box-shadow: $shadow-big;
    border-radius: 7px;

    &__option {
      position: relative;
      padding: 8px 10px;
      font-size: 12px;
      color: $black;
      transition: all 0.2s ease-out;
      border-bottom: 1px solid #dfdfdf;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        color: $color-main;
      }
    }

    &__icon {
      display: flex;
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translate(0, -50%);
      color: $color-main;
    }
  }

  &-selected {
    position: relative;
    background: $white;
    border: 1px solid #dfdfdf;
    min-height: 30px;
    min-width: 360px;
    width: 100%;
    padding: 5px 30px 5px 10px;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
      border: 1px solid rgba($color-main, 0.5);
    }
  }
}
</style>