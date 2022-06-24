<template>
  <div class="alert">
    <h2 class="sidebar-title">Мои уведомления</h2>
    <vuescroll :ops="scrollOps">
      <div class="alert-wrapper">
        <alert-card
          v-for="(alert, i) in alerts"
          :key="alert.id"
          :seen="alert.seen"
          :result="alert.result"
          :text="alert.text"
          :theme="alert.theme"
          @delete="deleteAlert(i)"
        ></alert-card>
      </div>
      <!-- <vs-pagination :total-pages="5" class="plan-wrapper"></vs-pagination> -->
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import AlertCard from "@/components/alert/AlertCard.vue";
import { mapGetters, mapActions } from "vuex";
// import VsPagination from "@vuesimple/vs-pagination";

export default {
  computed: {
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
    ...mapGetters(["scrollOps"]),
  },
  methods: {
    ...mapActions("alerts", ["deleteAlert"]),
  },
  components: {
    vuescroll,
    AlertCard,
    // VsPagination,
  },
};
</script>

<style lang="scss" scoped>
.alert {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    margin: 30px;
  }
}
@media screen and (max-width: 1440px) {
  .alert {
    &-wrapper {
      margin: 20px;
    }
  }
}
</style>