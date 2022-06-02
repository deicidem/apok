<template>
  <div class="person">
    <h2 class="sidebar-title">Личный кабинет</h2>
    <vuescroll :ops="ops">
      <div class="person-wrapper">
        
        <div class="person-content">
          <app-person></app-person>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import AppPerson from "@/components/cards/AppPerson.vue";
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

export default {
  components: {
    vuescroll,
    AppPerson,
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
};
</script>


<style scoped lang="scss">
.person {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
}
</style>