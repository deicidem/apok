<template>
  <div class="c-select">
    <div class="c-selected" @click="showSelect = !showSelect">
      <div class="c-select__icon">
        <i class="icon icon-ic_fluent_triangle_down_20_filled"></i>
      </div>
      {{ label }} {{ selectedOption != null ? selectedOption.text : "" }}
    </div>

    <div class="c-select__options" v-show="showSelect" v-if="options != null">
      <div
        class="c-select__option"
        @click="onSelect(i)"
        v-for="(option, i) in options"
        :key="option.id"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options", "label"],
  data: () => ({
    showSelect: false,
    selectedOptionIndex: 0,
  }),
  computed: {
    selectedOption() {
      if (this.selectedOptionIndex != null) {
        return this.options[this.selectedOptionIndex];
      }
      return null;
    },
  },
  methods: {
    onSelect(index) {
      this.showSelect = false;
      this.selectedOptionIndex = index;
      this.$emit("change", this.selectedOption.value);
    },
    clear() {
      this.showSelect = false;
      this.selectedOptionIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.c {
  &-select {
    position: relative;

    &__options {
      width: 100%;
      margin-top: 4px;
      z-index: 10;
      position: absolute;
      top: calc(100% + 3px);
      left: 0;
      background: $white;
      box-shadow: $shadow-big;
      border-radius: 7px;
    }

    &__option {
      position: relative;
      padding: 10px;
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
      font-size: 12px;
      display: flex;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(-50%, -50%);
      color: $color-main;
    }
  }

  &-selected {

    position: relative;
    background: $white;
    box-shadow: $shadow-small;
    border: 1px solid transparent;
    font-size: 14px;
    color: #333;
    background: #fff;
    width: 100%;
    padding: 8px 40px 8px 15px;
    display: flex;
    align-items: center;
    border-radius: 7px;
    line-height: 18px;
    cursor: pointer;

    &:hover {
      border: 1px solid rgba($color-main, 0.5);
    }
  }
}
</style>