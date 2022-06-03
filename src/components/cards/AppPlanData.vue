<template>
  <div class="data">
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
            <p class="data__subtitle">Задача:</p>
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
          <div class="data-item" v-for="(data, i) in activePlan.data" :key="i">
            <template v-if="data.type == 1">
              <div class="data-circle"></div>
              <div class="data-info">
                <p class="data__subtitle">{{ data.title }}</p>
                <p class="data__text" v-if="data.dzzIndex != null">
                  {{ getResults[data.dzzIndex].name }}
                </p>
                <p class="data__text" v-else>Не выбрано</p>
              </div>

              <div class="data-btns">
                <button
                  class="button button-svg data-btn"
                  @click="selectDzz(i)"
                >
                  <img src="@/assets/img/choose.svg" />
                </button>

                <button class="button button-svg data-btn" @click="onUploadClick(i)">
                  <img src="@/assets/img/upload.svg" />
                </button>
              </div>
            </template>
            <template v-else>
              <div class="data-circle"></div>
              <div class="data-info">
                <p class="data__subtitle">{{ data.title }}</p>
                <p class="data__text" v-if="getActivePolygonJson != null">
                  Выбрана
                </p>
                <p class="data__text" v-else>Не выбрана</p>
              </div>
              <div class="data-btns">
                <router-link to="area" custom v-slot="{ navigate }">
                  <button @click="navigate" class="button button-svg data-btn">
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
            </template>
          </div>
        </template>
      </div>
      <button @click="planNewTask(activePlanIndex)" class="button button-g data-start">
        Начать
      </button>
    </div>
    <div class="data-line">
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
        visible: false
      },
      activePlanIndex: null,
      showSelect: false,
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,
          wheelScrollDuration: 500,
        },
        scrollPanel: {
          scrollingX: false,
          speed: 300,
          easing: "easeOutQuad",
        },
        rail: {
          background: "#000",
          opacity: 0.1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#6BA2A6",
        },
      },
    };
  },
  components: {
    AppPlanPopup,
  },
  computed: {
    ...mapGetters("plans", ["getPlans"]),
    ...mapGetters("map", ["getActivePolygonJson"]),
    ...mapGetters("results", ["getSelectable", "getResults"]),
    activePlan() {
      return this.getPlans[this.activePlanIndex];
    },
  },
  methods: {
    ...mapActions("results", ["setSelectable", "resetResultSelection"]),
    ...mapActions("plans", ['setDataFile', 'planNewTask']),
    setPlanPopupData(i) {
      this.$set(this.planPopup, 'data', this.activePlan.data[i])
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
      this.setDataFile({planIndex: this.activePlanIndex, dataIndex: this.planPopup.dataIndex, file})
      this.planPopup.visible = false
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
      this.activePlanIndex = index;
      this.showSelect = false;
      this.resetResultSelection({ planIndex: index });
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  position: absolute;
  left: calc(100% + 20px);
  top: 37px;

  display: flex;
  justify-content: space-between;
  min-width: 440px;

  background: $gradient-w;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow-big;
  transition: all 0.3s ease-out;
  // transform: translateX(calc(-100% + 10px));
  translate: 0;
  &-circle {
    margin-right: 10px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: inset 1px 1px 3px rgba(#000, 0.15);
    transform: -20px;
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
  }
  &-title {
    color: #000;
    font-size: 18px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 16px;
  }
  &-item {
    position: relative;
    display: flex;
    align-items: stretch;
    margin-bottom: 10px;
    width: 100%;
    background: $gradient-w;
    padding: 10px;
    box-shadow: $shadow-small;
    border-radius: 5px;
  }
  &-arrowDown {
    position: absolute;
    right: 10px;
    top: 20%;
  }
  &__subtitle {
    font-size: 12px;
    color: $text-grey;
    margin-bottom: 10px;
  }
  &__text {
    position: relative;
    font-size: 12px;
    width: 100%;
    text-align: left;
    color: #000;
  }
  &-btns {
    padding: 10px;
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
    &:hover .data-tooltiptext {
      display: block;
    }
    &:last-child {
      margin: 0;
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
    border: 1px solid #dfdfdf;
    min-height: 30px;
    min-width: 360px;
    width: 100%;
    padding: 5px 5px 5px 10px;
    border-radius: 5px;
    &:hover {
      border: 1px solid rgba($color-main, 0.5);
    }
  }
  &__select {
    margin-top: 4px;
    z-index: 10;
    position: absolute;
    top: calc(100% - 10px);
    width: 360px;
    height: 70px;
    left: 10px;
    background: $gradient-w;
    box-shadow: $shadow-big;
    border-radius: 10px;
    &__item {
      position: relative;
      padding: 5px 10px;
      font-size: 12px;
      color: #000;
      transition: all 0.2s ease-out;
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
