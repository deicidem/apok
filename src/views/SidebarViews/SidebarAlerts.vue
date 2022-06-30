<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Мои уведомления</h2>
    </template>
    <template v-slot:content>
      <div class="c-wrapper">
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
    </template>
  </sidebar-base>
</template>

<script>
import SidebarBase from "@/components/SidebarBase.vue";
import AlertCard from "@/components/alert/AlertCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AlertCard,
    SidebarBase,
  },
  data: () => ({
    loaded: false,
  }),
  mounted() {
    this.loaded = true;
  },
  computed: {
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
  },
  methods: {
    ...mapActions("alerts", ["deleteAlert"]),
  },
};
</script>

<style lang="scss" scoped>
.c {
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