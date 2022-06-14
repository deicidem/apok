<template>
  <div class="data" :class="{ active: getDataCardState }">
    <div class="data-content">
      <div class="data-title">Запланировать задачу</div>
      <div class="data-wrapper">
        <div class="data-item">
          <portal to="popup">
            <app-plan-popup
              :plan="activePlan"
              :data="planPopup.data"
              v-if="planPopup.visible"
              @close="onPopupClose"
            ></app-plan-popup>
          </portal>
          <div class="data-info">
            <h6 class="data__subtitle">Задача:</h6>
            <div
              class="data__text data__selected"
              @click="showSelect = !showSelect"
            >
              <div class="data-arrowDown">
                <img svg-inline src="@/assets/img/arrow-down.svg" />
              </div>
              <template v-if="activePlan != null">
                {{ activePlan.title }}
              </template>
            </div>
            <div class="data__select" v-show="showSelect">
              <div
                class="data__select__item"
                @click="onSelect(i)"
                v-for="(plan, i) in getPlans"
                :key="i"
              >
                {{ plan.title }}
              </div>
            </div>
          </div>
        </div>
        <template v-if="activePlan != null">
          <div
            class="data-item"
            :class="{ dzz: data.type == 1 }"
            v-for="(data, i) in activePlan.data"
            :key="i"
          >
            <template v-if="data.type == 1">
              <div class="data-circle" :class="`data-circle-${i + 1}`"></div>
              <div class="data-info">
                <h6 class="data__subtitle">{{ data.title }}</h6>
                <div class="data-item__content">
                  <div class="data__text" v-if="data.file != null">
                    {{ data.file.name }}
                  </div>
                  <div class="data__text" v-else-if="data.dzzIndex != null">
                    {{ resultsMap[data.dzzIndex].name }}
                  </div>
                  <div class="data__text" v-else>Не выбрано</div>
                  <div class="data-btns">
                    <button
                      class="button button-svg data-btn"
                      :class="
                        getSelectable.dataIndex == i &&
                        getSelectable.planIndex == activePlanIndex &&
                        getSelectable.value
                          ? 'data-btn-g'
                          : 'button-svg'
                      "
                      @click="selectDzz(i)"
                    >
                      <img
                        svg-inline
                        src="@/assets/img/choose.svg"
                        alt="Выбрать"
                      />
                    </button>

                    <button
                      class="button button-svg data-btn"
                      @click="onUploadClick(i)"
                    >
                      <img
                        svg-inline
                        src="@/assets/img/upload.svg"
                        alt="Загрузить"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="data.type == 2">
              <div class="data-circle hidden"></div>
              <div class="data-info">
                <h6 class="data__subtitle">{{ data.title }}</h6>
                <div class="data-item__content">
                  <div class="data__text" v-if="getActivePolygonJson != null">
                    Выбрана
                  </div>
                  <div class="data__text" v-else>Не выбрана</div>
                  <div class="data-btns">
                    <router-link to="area" custom v-slot="{ navigate }">
                      <button
                        @click="navigate"
                        class="button button-svg data-btn"
                      >
                        <img src="@/assets/img/choose.svg" />
                      </button>
                    </router-link>
                    <button class="button button-svg data-btn">
                      <img
                        svg-inline
                        class="icon icon-vector-o"
                        src="@/assets/img/vector-o.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="data-circle hidden"></div>
              <div class="data-info">
                <h6 class="data__subtitle">{{ data.title }}</h6>
                <input
                  required
                  class="data__input"
                  :value="data.text"
                  @change="onParamChange($event, i)"
                />
              </div>
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
        <img src="@/assets/img/arrow-plan.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as filesApi from "@/api/files";
import AppPlanPopup from "@/components/AppPlanPopup.vue";

export default {
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
  components: {
    AppPlanPopup,
  },
  computed: {
    ...mapGetters("plans", ["getPlans", "activePlanIndex"]),
    ...mapGetters("map", ["getActivePolygonJson"]),
    ...mapGetters("results", ["getSelectable", "getResults", "resultsMap"]),
    ...mapGetters(["getDataCardState", "scrollOps"]),
    activePlan() {
      return this.getPlans[this.activePlanIndex];
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
        text: e.target.value,
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
      // if (this.getSelectable) {
      //   this.activePlan.data.forEach((el, i) => {

      //   });
      // }
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
    background: #fff;
    // box-shadow: inset 1px 1px 3px rgba(#000, 0.15);
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
    color: #000;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 16px;
  }
  &-item {
    background: #fff;
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
    position: absolute;
    right: 10px;
    top: 20%;
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
    color: #000;
  }
  &__input {
    border: 1px solid #dfdfdf;
    background: #fff;
    min-height: 30px;
    min-width: 360px;
    width: 100%;
    padding: 5px 30px 5px 10px;
    border-radius: 5px;
    &:focus,
    &:focus-visible {
      border: 1px solid rgba($color-main, 0.5);
      outline: none;
    }
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
    margin-right: 10px;

    background: $gradient-w;
    &:hover .data-tooltiptext {
      display: block;
    }
    &:last-child {
      margin: 0;
    }
    &-g {
      background: $color-main;
      svg path {
        fill: #fff;
      }
    }
  }
  &-tooltiptext {
    position: absolute;
    bottom: 110%;
    right: calc(0px - 6px);

    display: none;
    padding: 2px 5px;

    color: $color-main;
    font-size: 10px;
    background: $gradient-w;
    border-radius: 6px;
    box-shadow: $shadow-small;
  }
  &-start {
    width: 200px;
    margin: 10px 16px 0 auto;
  }
  &__selected {
    background: #fff;
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
    background: #fff;
    margin-top: 4px;
    z-index: 10;
    position: absolute;
    top: calc(100% - 10px);
    width: 360px;
    left: 10px;
    background: #fff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    &__item {
      position: relative;
      padding: 8px 10px;
      font-size: 12px;
      color: #000;
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
