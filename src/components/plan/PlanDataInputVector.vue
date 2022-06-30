<template>
  <plan-data-input>
    <h6 class="c-title">{{ title }}</h6>
    <div class="c-content">
      <div class="c-text">
        {{ areaSelected ? 'Выбрана' : 'Не выбрана'}}
      </div>
      <div class="c-btns">
        <div class="button__wrapper">
          <router-link to="area" custom v-slot="{ navigate }">
            <button @click="navigate" class="button button-svg button-white-gr c-btn">
              <i class="icon icon-ic_fluent_cursor_20_regular"></i>
            </button>
          </router-link>
          <span class="tooltiptext">Выбрать</span>
        </div>
        <div class="button__wrapper c-btn" >
          <button class="button button-svg button-white-gr" @click="$emit('center')">
            <i class="icon icon-ic_fluent_center_horizontal_20_regular"></i>
          </button>
          <span class="tooltiptext">Показать</span>
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
    areaSelected: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>