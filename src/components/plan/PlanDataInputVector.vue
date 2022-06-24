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
              <img svg-inline src="@/assets/img/button-svg-icons/choose.svg" alt="Выбрать" />
            </button>
          </router-link>
          <span class="tooltiptext">Выбрать</span>
        </div>
        <div class="button__wrapper c-btn">
          <button class="button button-svg button-white-gr">
            <img svg-inline src="@/assets/img/button-svg-icons/vector-o.svg" alt="Загрузить" />
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