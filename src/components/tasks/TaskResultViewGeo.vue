<template>
  <task-result-view>
    <div class="image-wrapper">
      <img :src="path" class="image" />
    </div>
    <label class="checkbox-wrapper">
      <app-checkbox v-model="needFitBounds"></app-checkbox>
      <span class="checkbox-label">Центрировать</span>
    </label>
    <div class="button-group">
      <app-button
      class="image-wrapper-button"
        type="button-g"
        :class="showImage ? 'button-g' : 'button-white-gr'"
        @click="onClick"
      >
        {{ showImage ? "Показать на карте" : "Убрать с карты" }}
      </app-button>
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
import AppButton from "@/components/controls/AppButton";
import AppCheckbox from "@/components/controls/AppCheckbox.vue";
import TaskResultView from "@/components/tasks/TaskResultViewBase.vue";
export default {
  props: ["path", "title", "downloadPath"],
  components: {
    AppCheckbox,
    TaskResultView,
    AppButton,
  },
  data: () => ({
    showImage: true,
    needFitBounds: true,
  }),
  methods: {
    onClick() {
      this.$emit("show-image", {
        show: this.showImage,
        fitBounds: this.needFitBounds,
      });
      this.showImage = !this.showImage;
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  &-wrapper {
    display: flex;
    align-items: center;
  }

  &-label {
    margin-left: 10px;
  }
}
</style>