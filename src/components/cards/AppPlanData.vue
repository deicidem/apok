<template>
  <div class="data">
    <div class="data-content">
      <div class="data-title">Запланировать задачу</div>
      <div class="data-wrapper">
        <div class="data-item">
          <div class="data-info">
            <p class="data__subtitle">Задача:</p>
            <p
              class="data__text data__selected"
              @click="showSelect = !showSelect"
            >
            <template v-if="activePlan != null">
              {{ activePlan.title }}
            </template>
            </p>
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
            <div class="data-info">
              <p class="data__subtitle">{{ data.title }}</p>
              <p class="data__text" v-if="data.dzzIndex != null">
                {{ getResults[data.dzzIndex].name }}
              </p>
            </div>
            <div class="data-btns" v-if="data.title == 'Зона интереса'">
              <button class="button button-svg data-btn" @click="selectDzz(i)">
                <img src="@/assets/img/choose.svg" />
              </button>
              <button class="button button-svg data-btn">
                <img
                  svg-inline
                  class="icon icon-vector-o"
                  src="@/assets/img/vector-o.svg"
                  alt=""
                />
              </button>
            </div>
            <div class="data-btns" v-else>
              <button class="button button-svg data-btn" @click="selectDzz(i)">
                <img src="@/assets/img/choose.svg" />
              </button>
              <button class="button button-svg data-btn">
                <img src="@/assets/img/upload.svg" />
              </button>
            </div>
          </div>
        </template>
      </div>
      <button class="button button-g data-start">Начать</button>
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
export default {
  data() {
    return {
      activePlanIndex: null,
      showSelect: false,
    };
  },
  computed: {
    ...mapGetters("plans", ["getPlans"]),
    ...mapGetters("results", ["getSelectable", "getResults"]),
    activePlan() {
      return this.getPlans[this.activePlanIndex];
    }
  },
  methods: {
    ...mapActions("results", ["setSelectable"]),
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
  min-width: 400px;

  background: $gradient-w;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow-big;
  transition: all 0.3s ease-out;
  // transform: translateX(calc(-100% + 10px));
  translate: 0;
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
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    background: $gradient-w;
    padding: 6px;
    box-shadow: $shadow-small;
    border-radius: 5px;
  }
  &__subtitle {
    font-size: 12px;
    color: $text-grey-light;
  }
  &__text {
    font-size: 12px;
    width: 100%;
    text-align: left;
    color: #313131;
  }
  &-btns {
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
  }
  &-btn {
    position: relative;
    margin: 0 4px;
    &:hover .data-tooltiptext {
      display: block;
    }
  }
  &-tooltiptext {
    position: absolute;
    bottom: 110%;
    right: calc(0px - 6px);

    display: none;
    padding: 2px 5px;

    color: $color-main-dark;
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
    border: 1px solid rgba($color-main-dark, 0.5);
    min-height: 30px;
    min-width: 300px;
    padding: 5px;
    border-radius: 5px;
  }
  &__select {
    z-index: 10;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    background: $gradient-w;
    box-shadow: $shadow-big;
    border-radius: 10px;
    &__item {
      position: relative;
      padding: 5px 10px;
      font-size: 12px;
      color: #000;
      border-bottom: 1px solid rgba($color-main-dark, 0.5);
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
