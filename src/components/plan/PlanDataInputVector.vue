<template>
  <plan-data-input>
    <h6 class="c-title">{{ title }}</h6>
    <div class="c-content">
      <div class="c-text">
        {{ areaSelected ? "Выбрана" : "Не выбрана" }}
      </div>
      <div class="c-btns">
        <div class="button__wrapper">
          <router-link to="area" custom v-slot="{ navigate }">
            <app-button
              type="button-svg button-white-gr"
              @click="navigate"
              class="c-btn"
              tooltip="Выбрать"
            >
              <i class="icon icon-ic_fluent_cursor_20_regular"></i>
            </app-button>
          </router-link>
        </div>

        <div class="button__wrapper c-btn">
          <app-button
            type="button-svg button-white-gr"
            @click="$emit('center')"
            tooltip="Показать"
          >
            <i class="icon icon-ic_fluent_my_location_20_regular"></i>
          </app-button>
        </div>
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
    areaSelected: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>