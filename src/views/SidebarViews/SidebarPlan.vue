<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Доступные задачи</h2>
    </template>
    <template v-slot:content>
      <div class="plan-wrapper">
        <app-plan-card
          class="plan-card"
          v-for="(plan, i) in plans"
          :key="i"
          :planid="plan.id"
          :img="plan.previewPath"
          :text="plan.excerpt"
          :title="plan.title"
          :isAuth="isAuth"
          @select="onPlan(i)"
        ></app-plan-card>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppPlanCard from "@/components/plan/PlanCard.vue";
import SidebarBase from "@/components/SidebarBase.vue";
// import AppPlanPopup from "@/components/AppPlanPopup.vue";
// import VsPagination from "@vuesimple/vs-pagination";
export default {
  components: {
    AppPlanCard,
    // AppPlanPopup,
    // VsPagination,
    SidebarBase,
  },
  data() {
    return {
      planPopup: false,
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
  },
  methods: {
    ...mapActions("plans", ["selectPlan"]),
    ...mapActions(["setDataCardState"]),
    onPlan(i) {
      this.selectPlan(i);
      this.setDataCardState(true);
    },
  },
  computed: {
    ...mapGetters("users", ["isAuth"]),
    ...mapGetters("plans", {
      plans: "getPlans",
    }),
  },
};
</script>

<style lang="scss" scoped>
.plan {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    margin: 30px;
  }
  &-card {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
@media screen and (max-width: 1440px) {
  .plan {
    &-wrapper {
      margin: 20px;
    }
    &-card {
      margin-bottom: 20px;
    }
  }
}
</style>