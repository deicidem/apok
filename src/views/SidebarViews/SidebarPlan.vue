<template>
  <div class="plan">
    <h2 class="sidebar-title">Запланировать задачу</h2>
    <vuescroll :ops="ops">
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
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import { mapGetters } from "vuex";
import AppPlanCard from "@/components/cards/AppPlanCard.vue";
export default {
  components: {
    vuescroll,
    AppPlanCard,
  },
  data() {
    return {
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
          background: "#476D70",
        },
      },
    };
  },
  computed: {
    ...mapGetters("plans", {
      plans: "getPlans",
    }),
  },
};
</script>

<style lang="scss" scoped>
.__vuescroll {
  display: flex;
  flex-direction: column;
}
.__panel {
  width: 100%;
}
.plan {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    margin: 30px;
  }
  &-card {
    margin-bottom: 30px;
  }
}
</style>