<template>
  <div class="alert">
    <h2 class="sidebar-title">Мои уведомления</h2>

    <div class="alert-wrapper">
      <app-alert-card
        v-for="alert in alerts"
        :key="alert.id"
        :seen="alert.seen"
        :result="alert.result"
        :text="alert.text"
      ></app-alert-card>
    </div>
  </div>
</template>

<script>
import AppAlertCard from "@/components/cards/AppAlertCard.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
  },
  components: {
    AppAlertCard,
  },
};
</script>

<style lang="scss" scoped>
.alert {
  &-wrapper {
    margin: 30px;
  }
}
</style>