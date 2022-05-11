<template>
  <div class="hero-wrapper">
    <section class="hero">
      <portal-target name="popup"> </portal-target>
      <portal-target name="popup-card"> </portal-target>
      <div class="sidebar-block" :class="sidebarBlock">
        <app-sidebar
          @close="sidebarBlockClass()"
          @open="sidebarBlockClass()"
        ></app-sidebar>
      </div>

      <div ref="wrap" class="map" :class="mapBlock">
        <app-map @ready="getRef($event)"></app-map>
      </div>
    </section>
  </div>
</template>

<script>
import AppMap from "@/components/AppMap.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainView",
  components: {
    AppMap,
    AppSidebar,
  },
  data() {
    return {
      sidebarBlock: "collapsed",
      mapBlock: "",
      mapRef: null,
    };
  },
  methods: {
    ...mapActions(["setSidebarState"]),
    sidebarBlockClass() {
      if (this.getSidebarState) {
        this.sidebarBlock = "";
        setTimeout(() => {
          this.mapBlock = "collapsed";
          this.$nextTick(() => {
            this.mapRef.mapObject.invalidateSize();
          });
        }, 300);
      } else {
        this.mapBlock = "";
        this.$nextTick(() => {
          this.mapRef.mapObject.invalidateSize();
        });
        setTimeout(() => {
          this.sidebarBlock = "collapsed";
        }, 300);
      }
    },
    getRef($event) {
      this.mapRef = $event;
    },
  },
  computed: {
    ...mapGetters(["getSidebarState"]),
  },
  mounted() {
    if (this.getSidebarState) {
      this.mapBlock = "collapsed";
      this.sidebarBlock = "";
    } else {
      this.mapBlock = "";
      this.sidebarBlock = "collapsed";
    }
  },
};
</script>

<style lang="scss">
.hero {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  &-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: $shadow-big;
  }
}
.map {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  height: 100%;
  width: 100%;
  max-width: calc(100% - 50px);
  margin-left: auto;
  &.collapsed {
    max-width: calc(100% - 800px);
  }
}
.sidebar-block {
  position: relative;
  z-index: 5;
  height: 100%;

  max-width: 800px;
  &.collapsed {
    box-shadow: $shadow-big;
    max-width: 50px;
  }
}

@media screen and (max-width: 1440px) {
  .sidebar-block {
    max-width: 650px;
  }
  .map {
    &.collapsed {
      max-width: calc(100% - 650px);
    }
  }
}
</style>