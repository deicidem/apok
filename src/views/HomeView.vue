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

<style lang="scss">
* {
  box-sizing: border-box;
}

.container {
  height: 80vh;
  display: flex;
}
body {
  margin: 0;
  padding: 0;
}
.sidebar {
  padding: 50px;
  width: 50%;
  max-width: 50%;
  background: #ccc;
}
.map {
  width: 50%;
  height: 100%;
}
</style>
