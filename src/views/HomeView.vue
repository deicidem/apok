<template>
  <div class="container">
    <div class="sidebar">

    </div>
    <div class="map">
      <app-map></app-map>
    </div>
+  </div>
</template>

<script>
import AppMap from "@/components/AppMap.vue"

export default {
  name: "HomeView",
  components: {
    AppMap
  }
};
</script>

