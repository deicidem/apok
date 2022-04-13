<template>
  <section class="hero">
    
    <div class="sidebar-block" :class="sidebarBlock">
      <app-sidebar
        @close="sidebarCollapsed = true; sidebarBlockClass()"
        @open="sidebarCollapsed = false; sidebarBlockClass()"
      ></app-sidebar>
    </div>

    <div class="map" :class="sidebarCollapsed ? '' : 'collapsed'">
      <app-map></app-map>
    </div>
  </section>
</template>

<script>
import AppMap from "@/components/AppMap.vue";
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  name: "MainView",
  components: {
    AppMap,
    AppSidebar,
  },
  data() {
    return {
      sidebarCollapsed: true,
      sidebarBlock: 'collapsed'
    };
  },
  methods: {
    sidebarBlockClass() {
      if (this.sidebarCollapsed) {
        setTimeout(() => {
          this.sidebarBlock = 'collapsed'
        }, 300)
      } else {
        this.sidebarBlock = ''
      }
    },
    onSidebarOpen() {
      this.sidebarCollapsed = false;
    },
    onSidebarClose() {
      this.sidebarCollapsed = true;
    }
  }
};
</script>

<style lang="scss">
.hero {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.map {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  max-width: calc(100% - 50px);
  margin-left: auto;
  z-index: 1;
  &.collapsed {
    max-width: calc(100% - 760px);
  }
}
.sidebar-block {
  position: relative;
  height: 100%;
  z-index: 5;
  max-width: 760px;
  &.collapsed {
    max-width: 50px;
  }
}

</style>