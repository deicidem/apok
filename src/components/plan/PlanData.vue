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
          :selected="activePlanIndex"
          @select="onSelect($event)"
        ></plan-data-input-select>

        <template v-if="activePlan != null">
          <div v-for="(data, i) in activePlan.data" :key="i">
            <template v-if="data.type == 2">
              <plan-data-input-image
                :title="data.title"
                :active-item-title="planDataValueTitle(data)"
                :circleStyle="1 + i"
                :selectable="
                  getSelectable.value &&
                  getSelectable.planIndex == activePlanIndex
                "
                @select="selectDzz(i)"
                @upload="onUploadClick(i)"
              ></plan-data-input-image>
            </template>

            <template v-else-if="data.type == 3">
              <plan-data-input-vector
                :title="data.title"
                :area-selected="getActivePolygonJson != null"
                @center="activePolygonFitBounds"
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

      <app-button
        type="button-g"
        @click="planNewTask(activePlanIndex)"
        class="data-start"
      >
        Начать
      </app-button>
    </div>

    <div class="data-line" @click="setDataCardState(!getDataCardState)">
      <div class="data-close">
        <i class="icon icon-ic_fluent_chevron_left_20_filled"></i>
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
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    PlanUploadRequirementsPopup,
    PlanDataInputSelect,
    PlanDataInputImage,
    PlanDataInputVector,
    PlanDataInputText,
    AppButton,
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
    ...mapActions("map", ["activePolygonFitBounds"]),
    ...mapActions("results", ["setSelectable", "resetResultSelection"]),
    ...mapActions("plans", [
      "setDataFile",
      "planNewTask",
      "changeText",
      "selectPlan",
      "setDataObject",
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
      if (file != null) {
        this.setDataObject({
          planIndex: this.activePlanIndex,
          dataIndex: this.planPopup.dataIndex,
          dzzIndex: null,
        });
        this.resetResultSelection({ planIndex: this.activePlanIndex });
        this.setDataFile({
          planIndex: this.activePlanIndex,
          dataIndex: this.planPopup.dataIndex,
          file,
        });
      }
      this.planPopup.visible = false;
    },

    onUploadClick(i) {
      this.setPlanPopupData(i);
      this.planPopup.visible = true;
      this.planPopup.dataIndex = i;
    },

    selectDzz(i) {
      this.setDataFile({
        planIndex: this.activePlanIndex,
        dataIndex: i,
        file: null,
      });
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
      display: flex;
      font-size: 30px;
      color: $white;
      transform: rotate(180deg);
    }
  }

  &-title {
    color: $black;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 16px;
  }

  &-start {
    width: 200px;
    margin: 10px 16px 0 auto;
  }
}
</style>
