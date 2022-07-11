<template>
  <plan-data-input>
    <div class="c-circle" :class="`c-circle-${circleStyle}`"></div>
    <h6 class="c-title">{{ title }}</h6>
    <div class="c-content">
      <div class="c-text">
        {{ activeItemTitle == null ? "Не выбран" : activeItemTitle }}
      </div>
      <div class="c-btns">
        <app-button
          class="c-btn"
          tooltip="Выбрать"
          type="button-svg"
          :active="(selectActive && selectable)"
          @click="onSelect"
        >
          <i class="icon icon-ic_fluent_cursor_20_regular"></i>
        </app-button>

        <app-button
          class="c-btn"
          type="button-svg button-white-gr"
          tooltip="Загрузить"
          @click="onUpload"
        >
          <i class="icon icon-ic_fluent_share_ios_20_regular"></i>
        </app-button>
      </div>
    </div>
  </plan-data-input>
</template>

<script>
import PlanDataInput from "@/components/plan/PlanDataInput";
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    PlanDataInput,
    AppButton,
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
    },
  },
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