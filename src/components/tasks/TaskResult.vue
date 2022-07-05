<template>
  <div class="preview">
    <div class="preview-wrapper">
      <div class="preview-wrapper__main">
        <div class="preview-wrapper__cross" @click="$emit('close')">
          <i class="fa-solid fa-xmark"></i>
        </div>

        <div class="preview-wrapper__title">Предпросмотр</div>

        <nav class="preview-wrapper__nav">
          <ul>
            <li v-for="(view, i) in views" :key="i">
              <button
                @click="setActiveView(i)"
                :class="{ active: isViewActive(i) }"
              >
                {{ view.title }}
              </button>
            </li>
          </ul>
        </nav>

        <component
          v-for="view in views"
          v-show="activeView.id == view.id"
          :is="viewType(view.type)"
          :key="view.id"
          :path="view.previewPath"
          :title="view.title"
          :download-path="view.downloadPath"
          @show-image="
            onShowImage($event, view.id, view.previewPath, view.geography.bbox)
          "
        ></component>
      </div>

      <div class="preview-wrapper__files">
        <div class="preview-wrapper__title">Файлы</div>
        <ul class="preview-wrapper__list">
          <li v-for="(file, i) in files" :key="i">
            <a :href="file.downloadPath" target="_blank" download>{{
              file.name
            }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TaskResultViewGeo from "@/components/tasks/TaskResultViewGeo.vue";
import TaskResultViewImage from "@/components/tasks/TaskResultViewImage.vue";

export default {
  props: ["files", "views", "taskIndex"],

  components: {
    TaskResultViewGeo,
    TaskResultViewImage,
  },

  data() {
    return {
      activeViewIndex: 0,
    };
  },

  computed: {
    viewType() {
      return (type) =>
        type == 1 ? "task-result-view-image" : "task-result-view-geo";
    },

    activeView() {
      return this.views[this.activeViewIndex];
    },

    isViewActive() {
      return (i) => i == this.activeViewIndex;
    },
  },

  methods: {
    ...mapActions("map", ["addViewImage", "removeViewImage"]),
    ...mapActions("tasks", ["setTaskViewActive", "setTaskViewFitBounds"]),

    setActiveView(i) {
      this.activeViewIndex = i;
    },

    onShowImage({ show, fitBounds }, id, img, bounds) {
      if (show) {
        this.addViewImage({ id, img, bounds, fitBounds });
      } else {
        this.removeViewImage({ id });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.preview {
  width: 100%;

  &-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: $white;
    border-radius: 20px;
    box-shadow: $shadow-big;

    &__cross {
      position: absolute;
      right: 14px;
      top: 14px;
      cursor: pointer;
      color: $color-main;
      font-size: 20px;

      &:hover {
        color: $color-main-dark;
      }
    }

    &__list {
      margin: 0;
      padding: 0;
    }

    &__main {
      margin-right: 30px;
      flex: 1 1 auto;
    }

    &__nav {
      display: flex;
      margin-top: 10px;

      ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .line {
        height: 12px;
        border-left: 1px solid $color-main;
      }

      li {
        margin: 0 20px 0 0;
        list-style-type: none;
        position: relative;

        &::after {
          content: "";
          display: block;
          height: 12px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -10px;
          border-right: 1px solid $color-main;
        }

        &:last-child:after {
          display: none;
        }

        button {
          padding: 0;
          margin: 0;
          font-family: inherit;
          border: none;
          background: none;
          color: $black;
          cursor: pointer;

          &:hover {
            color: $color-main-light;
          }

          &.active {
            color: $color-main;
          }
        }
      }
    }

    &__files {
      margin-right: 20px;
      min-width: 100px;

      ul {
        margin-top: 10px;
        color: $color-main;
        text-decoration: underline;
      }

      li {
        list-style-type: none;
        margin-top: 6px;
        font-size: 14px;
        cursor: pointer;

        a {
          color: $color-main;
        }
      }
    }

    &__title {
      font-size: 16px;
      color: $black;
    }
  }
}
</style>
