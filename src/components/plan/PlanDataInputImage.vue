<template>
  <plan-data-input>
    <div class="c-circle" :class="`c-circle-${circleStyle}`"></div>
    <h6 class="c-title">{{ title }}</h6>
    <div class="c-content">
      <div class="c-text">
        {{ activeItemTitle == null ? "Не выбран" : activeItemTitle}}
      </div>
      <div class="c-btns">
        <div class="button__wrapper c-btn">
          <button
            class="button button-svg"
            :class="selectActive && selectable ? 'button-g' : 'button-white-gr'"
            @click="onSelect"
          >
            <img svg-inline src="@/assets/img/button-svg-icons/choose.svg" alt="Выбрать" />
          </button>
          <span class="tooltiptext">Выбрать</span>
        </div>
        <div class="button__wrapper c-btn">
          <button class="button button-svg button-white-gr" @click="onUpload">
            <img svg-inline src="@/assets/img/button-svg-icons/upload.svg" alt="Загрузить" />
          </button>
          <span class="tooltiptext">Загрузить</span>
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
  props: {
    title: String,
    activeItemTitle: {
      type: String,
      default: "Не выбрано",
    },
    circleStyle: Number,
    selectable: Boolean,
  },
  data: () => ({
    selectActive: false,
  }),
  methods: {
    onSelect() {
      this.$emit("select");
      this.selectActive = !this.selectActive;
    },
    onUpload() {
      this.$emit("upload");
    },
  },
  watch: {
    selectable(newV, oldV) {
      console.log(oldV, newV);
      if (newV == false) {
        this.selectActive = false;
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.c {
  &-title {
    margin-left: 30px;
  }
  &-circle {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: $white;
    // box-shadow: inset 1px 1px 3px rgba($black, 0.15);
    box-shadow: $shadow-small;
    &.hidden {
      background: none;
      box-shadow: none;
    }
    &-1 {
      background: $gradient-b;
    }
    &-2 {
      background: $gradient-p;
    }
  }
}
</style>