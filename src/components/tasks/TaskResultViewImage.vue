<template>
  <task-result-view>
    <div class="image-wrapper">
      <img :src="path" class="image" />
    </div>
    <div class="button-group">
      <app-button class="image-wrapper-button" type="button-white-gr"
        ><a :href="downloadPath" target="_blank" download>
          Скачать
        </a></app-button
      >
      <!-- <router-link to="/full-screen" custom v-slot="{ navigate }"> -->
      <app-button
        class="image-wrapper-button"
        type="button-g"
        @click="
          $router.push({
            name: 'full-screen',
            query: { path, title, downloadPath },
          })
        "
      >
        На весь экран
      </app-button>
      <!-- </router-link> -->
    </div>
  </task-result-view>
</template>

<script>
import TaskResultView from "@/components/tasks/TaskResultViewBase.vue";
import AppButton from "@/components/controls/AppButton";
export default {
  props: ["path", "title", "downloadPath"],

  components: {
    TaskResultView,
    AppButton,
  },
};
</script>

<style lang="scss" scoped>
</style>