<template>
  <section class="hero">
    
    <div class="sidebar-block">
      <app-sidebar
        @close="sidebarCollapsed = true"
        @open="sidebarCollapsed = false"
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
      sidebarCollapsed: false,
    };
  },
  methods: {
    onSidebarOpen() {
      this.sidebarCollapsed = false;
    },
    onSidebarClose() {
      this.sidebarCollapsed = true;
    }
  },
};
</script>

<style lang="scss">
.hero {
  width: 100%;
  padding: 20px;
  position: relative;
  background: #dfdfdf;
}
.map {
  height: 100%;
  position: relative;
  margin-left: auto;
  display: none;
  &.collapsed {
    max-width: 60%;
  }
}
.sidebar-block {
  display: flex;
  height: 100%;
  max-width: 40%;
  position: relative;
  overflow: hidden;
}

</style>