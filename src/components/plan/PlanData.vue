<template>
  <div class="data" :class="{ active: getDataCardState }">
    <div class="data-content">
      <portal to="popup">
        <plan-upload-requirements-popup
          :plan="activePlan"
          :data="planPopup.data"
          v-if="planPopup.visible"
          @close="onPopupClose"
        ></plan-upload-requirements-popup>
      </portal>
      <div class="data-title">Запланировать задачу</div>
      <div class="data-wrapper">
        <plan-data-input-select
          title="Задача"
          :options="getPlans"
          @select="onSelect($event)"
        ></plan-data-input-select>
        <template v-if="activePlan != null">
          <div v-for="(data, i) in activePlan.data" :key="i">
            <template v-if="data.type == 1">
              <plan-data-input-image
                :title="data.title"
                :active-item-title="planDataValueTitle(data)"
                :circleStyle="1 + i"
                :selectable="getSelectable.value && getSelectable.planIndex == activePlanIndex"
                @select="selectDzz(i)"
                @upload="onUploadClick(i)"
              ></plan-data-input-image>
            </template>
            <template v-else-if="data.type == 2">
              <plan-data-input-vector
                :title="data.title"
                :area-selected="getActivePolygonJson != null"
              ></plan-data-input-vector>
            </template>
            <template v-else>
              <plan-data-input-text
                :title="data.title"
                :value="data.text"
                @input="onParamChange($event, i)"
              ></plan-data-input-text>
            </template>
          </div>
        </template>
      </div>
      <button
        @click="planNewTask(activePlanIndex)"
        class="button button-g data-start"
      >
        Начать
      </button>
    </div>
    <div class="data-line" @click="setDataCardState(!getDataCardState)">
      <div class="data-close">
        <img src="@/assets/img/arrow-plan.svg" alt="Закрыть" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as filesApi from "@/api/files";
import PlanUploadRequirementsPopup from "@/components/plan/PlanUploadRequirementsPopup";
import PlanDataInputSelect from "@/components/plan/PlanDataInputSelect";
import PlanDataInputImage from "@/components/plan/PlanDataInputImage";
import PlanDataInputVector from "@/components/plan/PlanDataInputVector";
import PlanDataInputText from "@/components/plan/PlanDataInputText";

export default {
  components: {
    PlanUploadRequirementsPopup,
    PlanDataInputSelect,
    PlanDataInputImage,
    PlanDataInputVector,
    PlanDataInputText,
  },
  data() {
    return {
      planPopup: {
        data: null,
        dataIndex: null,
        visible: false,
      },
      showSelect: false,
    };
  },
  computed: {
    ...mapGetters("plans", ["getPlans", "activePlanIndex"]),
    ...mapGetters("map", ["getActivePolygonJson"]),
    ...mapGetters("results", ["getSelectable", "getResults", "resultsMap"]),
    ...mapGetters(["getDataCardState", "scrollOps"]),

    activePlan() {
      return this.getPlans[this.activePlanIndex];
    },

    planDataValueTitle() {
      let map = this.resultsMap;
      return (data) => {
        if (data.file != null) {
          return data.file.name;
        } else if (data.dzzIndex != null) {
          return map[data.dzzIndex].name;
        } else {
          return null;
        }
      };
    },
  },
  methods: {
    ...mapActions("results", ["setSelectable", "resetResultSelection"]),
    ...mapActions("plans", [
      "setDataFile",
      "planNewTask",
      "changeText",
      "selectPlan",
    ]),
    ...mapActions(["setDataCardState"]),

    setPlanPopupData(i) {
      this.$set(this.planPopup, "data", this.activePlan.data[i]);
    },

    onParamChange(e, i) {
      this.changeText({
        dataIndex: i,
        planIndex: this.activePlanIndex,
        text: e,
      });
    },

    startPlan() {
      let formData = new FormData();
      this.$refs.dzzFile.forEach((el, i) => {
        formData.append(`file${i}`, el.files[0]);
      });
      let data = filesApi.loadDzzArchive(formData);
      console.log(data);
    },

    onPopupClose(file) {
      this.setDataFile({
        planIndex: this.activePlanIndex,
        dataIndex: this.planPopup.dataIndex,
        file,
      });
      this.planPopup.visible = false;
    },

    onUploadClick(i) {
      this.setPlanPopupData(i);
      this.planPopup.visible = true;
      this.planPopup.dataIndex = i;
    },

    selectDzz(i) {
      this.setSelectable({
        type: i,
        value: !this.getSelectable.value,
        planIndex: this.activePlanIndex,
        dataIndex: i,
      });
    },

    onSelect(index) {
      this.selectPlan(index);
      this.showSelect = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  position: absolute;
  left: calc(100% + 30px);
  top: 37px;

  display: flex;
  justify-content: space-between;
  min-width: 440px;

  background: $gradient-w;
  border-radius: 20px;
  box-shadow: $shadow-big;
  transform: translateX(-100%);
  transition: all 0.3s ease-out;
  &.active {
    transform: translateX(0);
    .data-close {
      transform: rotate(0deg);
    }
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
  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
  }
  &-line {
    width: 30px;
    background-color: $color-main;
    display: flex;
    align-items: center;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    cursor: pointer;
    .data-close {
      transform: rotate(180deg);
    }
    * {
      width: 30px;
    }
  }
  &-title {
    color: $black;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 16px;
  }
  &-item {
    background: $white;
    position: relative;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    box-shadow: $shadow-small;
    border-radius: 5px;
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &.dzz .data__subtitle {
      padding-left: 30px;
    }
  }
  &-arrowDown {
    display: flex;
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translate(0, -50%);
    svg path {
      fill: $color-main;
      vertical-align: middle;
    }
  }
  &__subtitle {
    margin-top: 0;
    font-size: 12px;
    color: $text-grey;
    margin-bottom: 5px;
  }
  &__text {
    position: relative;
    font-size: 12px;
    width: 100%;
    text-align: left;
    color: $black;
  }
  &__input {
    
  }
  &-btns {
    padding: 0px 10px;
    margin: 0 0 0 auto;
    display: flex;
    align-items: flex-end;
    &__text {
      font-size: 12px;
      color: #313131;
      line-height: 30px;
    }
  }
  &-btn {
    position: relative;
    background: $gradient-w;

    &__wrapper {
      position: relative;
      margin-left: 10px;
    }
    &-g {
      background: $color-main;
      svg path {
        fill: $white;
      }
    }
  }
  &-start {
    width: 200px;
    margin: 10px 16px 0 auto;
  }
  &__selected {
    background: $white;
    border: 1px solid #dfdfdf;
    min-height: 30px;
    min-width: 360px;
    width: 100%;
    padding: 5px 30px 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border: 1px solid rgba($color-main, 0.5);
    }
  }
  &__select {
    background: $white;
    margin-top: 4px;
    z-index: 10;
    position: absolute;
    top: calc(100% - 10px);
    width: 360px;
    left: 10px;
    background: $white;
    box-shadow: $shadow-big;
    border-radius: 10px;
    &__item {
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
  }
}
</style>
