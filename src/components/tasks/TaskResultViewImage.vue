<template>
  <task-result-view>
    <div class="image-wrapper">
      <img :src="path" class="image" />
    </div>
    <div class="button-group">
      <a :href="downloadPath" target="_blank" download class="button button-white-gr">
        Скачать
      </a>
      <!-- <router-link to="/full-screen" custom v-slot="{ navigate }"> -->
        <button @click="$router.push({ name: 'full-screen', query: { path, title, downloadPath } })" class="button button-g">На весь экран</button>
      <!-- </router-link> -->
    </div>
  </task-result-view>
</template>

<script>
import TaskResultView from "@/components/tasks/TaskResultViewBase.vue";
export default {
  props: ["path", "title", "downloadPath"],
  components: {
    TaskResultView
  }
};
</script>

<style lang="scss" scoped>

  
</style>