<template>
  <div class="plan">
    <h2 class="sidebar-title">Запланировать задачу</h2>
    <vuescroll :ops="scrollOps">
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
          @select="selectPlan(i)"
        ></app-plan-card>
      </div>
      <!-- <vs-pagination :total-pages="5" class="plan-wrapper"></vs-pagination> -->
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import { mapGetters, mapActions } from "vuex";
import AppPlanCard from "@/components/cards/AppPlanCard.vue";
// import AppPlanPopup from "@/components/AppPlanPopup.vue";
// import VsPagination from "@vuesimple/vs-pagination";
export default {
  components: {
    vuescroll,
    AppPlanCard,
    // AppPlanPopup,
    // VsPagination,
  },
  data() {
    return {
      planPopup: false,
    };
  },
  methods: {
    ...mapActions('plans', ['selectPlan'])
  },
  computed: {
    ...mapGetters(["scrollOps"]),
    ...mapGetters('users', ["isAuth"]),
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