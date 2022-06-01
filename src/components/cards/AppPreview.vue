<template>
  <div class="preview">
    <div class="preview-wrapper">
      <div class="preview-wrapper__main">
        <div class="preview-wrapper__title">Предпросмотр</div>
        <nav class="preview-wrapper__nav">
          <ul>
            <li v-for="(view, i) in views" :key="i">
              <button @click="setActiveView(i)" :class="{active: i == activeViewIndex}">{{view.title}}</button>
            </li>
          </ul>
        </nav>
        <div v-if="activeView != null">
          <div class="preview-picture">
            <img :src="activeView.previewPath" />
          </div>
          <div class="preview-btns">
            <button class="button button-white">Скачать</button>
            <router-link to="/report">
              <button class="button button-g">На весь экран</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="preview-wrapper__files">
        <div class="preview-wrapper__title">Файлы</div>
        <ul>
          <li v-for="(file, i) in files" :key="i">
            <a :href="file.path" target="_blank" download>{{file.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as filesApi from "@/api/files";
export default {
  props: ['files', 'views'],
  data() {
    return {
      reportType: false,
      pictureType: false,
      activeViewIndex: 0
    }
  },
  methods: {
    showResult() {
      this.reportType = !this.reportType;
      this.pictureType = !this.pictureType;
    },
    setActiveView(i) {
      this.activeViewIndex = i;
    },
    download(path) {
      filesApi.download(path);
    }
  },
  computed: {
    activeView() {
      return this.views[this.activeViewIndex]
    }
  },
  mounted() {
    this.setActiveView(0);
  }
};
</script>

<style scoped lang="scss">
.preview {
  width: 100%;
  &-picture {
    margin: 20px auto;
    img {
      height: auto;
      width: auto;
      max-width: 450px;
      max-height: 350px;
    }
  }
  &-btns {
    margin-top: 20px;
    display: flex;
    button {
      margin-right: 20px;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    box-shadow: $shadow-big;

    &__nav {
      display: flex;
      margin-top: 10px;
      ul {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;

        list-style: none;
      }
      .line {
        height: 12px;
        border-left: 1px solid $color-main;
      }
      li {
        margin: 0 8px 0 0;
        list-style-type: none;
        position: relative;
        &:first-child :after {
          display: block;
          height: 10px;
          content: "";
          position: absolute;
          border-right: 1px solid #000;
        }
        button {
          padding: 0;
          margin: 0;

          font-family: inherit;
          border: none;
          background: none;
          color: #000;
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
      ul {
        margin-top: 10px;
        color: $color-main;
        text-decoration: underline;
      }
      li {
        list-style-type: none;
        margin-top: 4px;
        font-size: 14px;
        cursor: pointer;
        a {
          color: $color-main;
        }
      }
    }
    &__title {
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
