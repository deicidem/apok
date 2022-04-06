<template>
  <div class="plan">
    <h2 class="title">Запланировать задачу</h2>
    
    <div class="plan-wrapper">
      <app-card class="plan-card" v-for="(plan, i) in plans" :key="i" :img="plan.image" :text="plan.shortText" :title="plan.title"></app-card>
    </div>
  
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import AppCard from "@/components/AppCard.vue"
export default {
  components: {
    AppCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters("plans", {
      plans: "getPlans",
    }),
  }
}
</script>

<style lang="scss" scoped>
.title {
  background: $gradient;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: 400;
}

.plan{
  &-wrapper{
    margin: 30px;
  }
  &-card {
    margin-bottom: 30px;
  }
}
</style>