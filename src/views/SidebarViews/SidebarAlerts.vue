<template>
  <div class="alert">
    <h2 class="sidebar-title">Мои уведомления</h2>
    <vuescroll :ops="ops">
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
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import AppAlertCard from "@/components/cards/AppAlertCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
  },
  methods: {
    ...mapActions("alerts", ["deleteAlert"]),
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
  components: {
    vuescroll,
    AppAlertCard,
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
.alert {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    margin: 30px;
  }
}
</style>