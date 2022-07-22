<template>
  <div class="c-select" :class="classes">
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
  props: ["options", "label", 'type'],

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

    classes() {
      let result = this.type;
      return result;
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
      position: absolute;
      top: calc(100% + 3px);
      left: 0;
      z-index: 10;

      width: 100%;
      margin-top: 4px;

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

      &-small {
        padding: 6px 10px;
      }
    }

    &__icon {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(-50%, -50%);

      font-size: 12px;
      display: flex;
      color: $color-main;
    }
  }

  &-selected {
    position: relative;

    display: flex;
    align-items: center;
    background: $white;
    box-shadow: $shadow-small;
    border: 1px solid transparent;
    font-size: 14px;
    color: #333;
    background: #fff;
    width: 100%;
    padding: 8px 40px 8px 15px;
    border-radius: 7px;
    line-height: 18px;
    cursor: pointer;

    &:hover {
      border: 1px solid rgba($color-main, 0.5);
    }

    &-small {
      font-size: 12px;
      padding: 4px 30px 4px 10px;
    }
  }

  &-select-small {
    position: relative;

    &__options {
      position: absolute;
      top: calc(100% + 3px);
      left: 0;
      z-index: 10;

      width: 100%;
      margin-top: 4px;

      background: $white;
      box-shadow: $shadow-big;
      border-radius: 7px;
    }

    &__option {
      position: relative;
      padding: 10px;
      font-size: 10px;
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
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(-50%, -50%);

      font-size: 12px;
      display: flex;
      color: $color-main;
    }
  }
}
</style>