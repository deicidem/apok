<template>
  <div class="fullScreen">
    <vuescroll :ops="scrollOps">
      <div class="fullScreen-wrapper">
        <router-link to="/main/tasks">
          <div class="back">
            <div class="back-arrow">
              <img svg-inline src="@/assets/img/arrow.svg" alt="Назад" />
            </div>
            <p class="back-subtitle">Назад</p>
          </div>
        </router-link>

        <h2 class="fullScreen-title">Изображение</h2>

        <button class="button button-g fullScreen-button">Скачать</button>
      </div>

      <div class="fullScreen-picture">
        <img src="@/assets/img/зона интереса.png" />
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import { mapGetters } from "vuex";
export default {
  components: {
    vuescroll,
  },
  data() {
    return {
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,
          wheelScrollDuration: 500,
        },
        scrollPanel: {
          scrollingX: false,
          speed: 300,
          easing: "easeOutQuad",
        },
        rail: {
          background: "#000",
          opacity: 0.1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#6BA2A6",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["scrollOps"]),
  },
};
</script>

<style scoped lang="scss">
.fullScreen {
  height: 900px;
  padding: 40px;

  box-shadow: $shadow-big;
  border-radius: 25px;
  overflow: hidden;
  background: $gradient-w;
  &-wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 1600px;
    margin: 30px auto;
  }
  &-title {
    margin: 0;
    color: #000;
    font-weight: 400;
  }
  &-button {
    height: auto;
    justify-self: end;

    width: 270px;
    font-size: 1.125rem;
  }
  &-picture {
    margin: 50px auto;
    img {
      margin: 20px auto;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      width: auto;
    }
  }
}
.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-arrow {
    svg path {
      fill: $color-main;
    }
  }
  &-subtitle {
    margin: 0 0 0 10px;
    color: $color-main;
  }
}
</style>
