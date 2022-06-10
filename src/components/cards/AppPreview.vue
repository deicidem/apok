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
          <div class="preview-btns" v-if="activeView.type == 1">
            <button class="button button-white">Скачать</button>
            <router-link to="/report" custom v-slot="{navigate}">
              <button @click="navigate" class="button button-g">На весь экран</button>
            </router-link>
          </div>
          <div class="preview-btns" v-else>
            <button class="button button-white" v-if="this.activeView.active" @click="onImageButtonClick(activeView.id, activeView.previewPath, activeView.geography.bbox)">Убрать с карты</button>
            <button class="button button-g"  v-else @click="onImageButtonClick(activeView.id, activeView.previewPath, activeView.geography.bbox)">Показать на карте</button>
            <router-link to="/report" custom v-slot="{navigate}">
              <button @click="navigate" class="button button-g">На весь экран</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="preview-wrapper__files">
        <div class="preview-wrapper__title">Файлы</div>
        <ul class="preview-wrapper__list">
          <li v-for="(file, i) in files" :key="i">
            <a :href="file.path" target="_blank" download>{{file.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import * as filesApi from "@/api/files";
export default {
  props: ['files', 'views', 'taskIndex'],
  data() {
    return {
      reportType: false,
      pictureType: false,
      activeViewIndex: 0,
      viewStates: []
    }
  },
  methods: {
    ...mapActions('map', ['addViewImage', 'removeViewImage']),
    ...mapActions('tasks', ['setTaskViewActive']),
    showResult() {
      this.reportType = !this.reportType;
      this.pictureType = !this.pictureType;
    },
    setActiveView(i) {
      this.activeViewIndex = i;
    },
    download(path) {
      filesApi.download(path);
    },
    onImageButtonClick(id, img, bounds) {
      if (this.views[this.activeViewIndex].active) {
        this.removeViewImage(id);
        this.setTaskViewActive({
          taskIndex: this.taskIndex,
          viewIndex: this.activeViewIndex,
          val: false
        });
      } else {
        this.addViewImage({ id, img, bounds });
        this.setTaskViewActive({
          taskIndex: this.taskIndex,
          viewIndex: this.activeViewIndex,
          val: true
        })
      }
    },
  },
  computed: {
    activeView() {
      return this.views[this.activeViewIndex]
    }
  },
  mounted() {
    this.setActiveView(0);
    for (let i = 0; i < this.views.length; i++) {
      this.viewStates.push({active: false})
    }
  }
};
</script>

<style scoped lang="scss">
.preview {
  width: 100%;
  &-picture {
    margin: 20px auto;
    img {
      max-width: 100;
    }
  }
  &-btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .button {
      flex: 1 1 auto;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    box-shadow: $shadow-big;
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
