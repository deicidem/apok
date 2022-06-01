<template>
  <div class="preview">
    <div class="preview-wrapper">
      <div class="preview-wrapper__main">
        <div class="preview-wrapper__title">Предпросмотр</div>
        <nav class="preview-wrapper__nav">
          <ul>
            <li>
              <button @click="showResult">Отчет</button>
            </li>
            <li>
              <button @click="showResult">Изображение</button>
            </li>
          </ul>
        </nav>
        <div v-if="!reportType">
          <div class="preview-picture">
            <img src="@/assets/img/report.png" />
          </div>
          <div class="preview-btns">
            <button class="button button-white">Скачать</button>
            <router-link to="/report">
              <button class="button button-g">На весь экран</button>
            </router-link>
          </div>
        </div>
        <div v-if="pictureType">
          <div class="preview-picture">
            <img src="@/assets/img/зона интереса.png" />
          </div>
          <div class="preview-btns">
            <button class="button button-white">Показать на карте</button>
            <router-link to="/picture">
              <button class="button button-g">На весь экран</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="preview-wrapper__files">
        <div class="preview-wrapper__title">Файлы</div>
        <ul>
          <li>Отчет</li>
          <li>Изображение</li>
          <li>Зона интереса</li>
          <li>Векторы</li>
          <li>Все</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reportType: false,
      pictureType: false,
    };
  },
  methods: {
    showResult() {
      this.reportType = !this.reportType;
      this.pictureType = !this.pictureType;
    },
  },
};
</script>

<style scoped lang="scss">
.preview {
  padding: 20px;
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
        margin: 0 20px 0 0;
        list-style-type: none;
        position: relative;
        &:first-child :after {
          display: block;
          height: 12px;
          content: "";
          position: absolute;
          top: 30%;
          right: -10px;
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
            color: $color-main;
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
      }
    }
    &__title {
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
