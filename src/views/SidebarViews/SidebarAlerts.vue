<template>
  <div class="alert">
    <h2 class="sidebar-title">Мои уведомления</h2>

    <div class="alert-wrapper">
      <app-alert-card
        v-for="(alert, i) in alerts"
        :key="alert.id"
        :seen="alert.seen"
        :result="alert.result"
        :text="alert.text"
        @delete="deleteAlert(i)"
      ></app-alert-card>
    </div>
  </div>
</template>

<script>
import AppAlertCard from "@/components/cards/AppAlertCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
  },
  methods: {
    ...mapActions('alerts', ['deleteAlert'])
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