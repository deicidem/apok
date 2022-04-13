<template>
  <div class="plan">
    <h2 class="sidebar-title">Запланировать задачу</h2>

    <div class="plan-wrapper">
      <app-plan-card
        class="plan-card"
        v-for="(plan, i) in plans"
        :key="i"
        :planid="plan.id"
        :img="plan.image"
        :text="plan.shortText"
        :title="plan.title"
      ></app-plan-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppPlanCard from "@/components/cards/AppPlanCard.vue";
export default {
  components: {
    AppPlanCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("plans", {
      plans: "getPlans",
    }),
  },
};
</script>

<style lang="scss" scoped>
.plan {
  &-wrapper {
    margin: 30px;
  }
  &-card {
    margin-bottom: 30px;
  }
}
</style>