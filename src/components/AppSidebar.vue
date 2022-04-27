<template>
  <div class="sidebar_wrap" :class="active ? 'active' : ''">
    <transition name="slide">
      <div class="sidebar" v-show="active">
        <div class="sidebar-content">
          <router-view> </router-view>
        </div>
        <app-plan-data></app-plan-data>
      </div>
    </transition>

    <div class="sidebar-collapsed">
      <div
        class="sidebar__item open sidebar-open"
        id="collapsed"
        @click="toggleSidebar()"
      >
        <div class="sidebar-collapsed__img">
          <img src="@/assets/img/sidebar-collapse.svg" />
        </div>
      </div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/tasks">
          <div class="sidebar-collapsed__img">
            <img src="@/assets/img/sidebar-task.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Мои задачи</div>
      </div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/plan">
          <div class="sidebar-collapsed__img">
            <img src="@/assets/img/sidebar-plan.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">
          Запланированные задачи
        </div>
      </div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/search">
          <div class="sidebar-collapsed__img">
            <img src="@/assets/img/sidebar-search.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Поиск снимков</div>
      </div>

      <div class="sidebar-collapsed__item notification-wrapper" @click="open">
        <router-link to="/main/alerts">
          <div class="sidebar-collapsed__img">
            <img src="@/assets/img/sidebar-notification.svg" />
          </div>
          <div class="notification">
            <div class="notification-number">{{ alerts.length }}</div>
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Мои уведомления</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppPlanData from "@/components/cards/AppPlanData";

export default {
  name: "AppSidebar",
  components: {
    AppPlanData,
  },
  computed: {
    ...mapGetters({ active: "getSidebarState" }),
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
  },
  methods: {
    ...mapActions(["setSidebarState"]),
    open() {
      this.setSidebarState(true);
      this.$emit("open");
    },
    close() {
      this.setSidebarState(false);
      this.$emit("close");
    },
    toggleSidebar() {
      if (this.active) {
        this.close();
      } else {
        this.open();
      }
    },
  },
};
</script>

<style lang="scss">
.notification {
  position: absolute;
  top: -5px;
  right: -8px;
  &-number {
    width: 18px;
    height: 18px;

    color: #fff;
    font-size: 12px;
    background: $gradient-r;
    border-radius: 50%;
    text-align: center;
  }
  &-wrapper {
    position: relative;
  }
}
.slide {
  &-enter {
    transform: translateX(-100%);
  }
  &-enter-active {
    transition: all 0.3s ease;
  }
  &-enter-to {
    transform: translateX(0);
  }
  &-leave {
    transform: translateX(0);
  }
  &-leave-active {
    transition: all 0.3s ease;
  }
  &-leave-to {
    transform: translateX(-100%);
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  &-enter,
  &-leave-active {
    opacity: 0;
  }
}
.sidebar {
  position: absolute;
  left: 50px;

  display: block;
  height: 100%;
  width: calc(100% - 50px);

  z-index: 5;
  box-shadow: $shadow-big;
  overflow: hidden;
  &-title {
    padding: 5px;

    background: $gradient;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    box-shadow: $shadow-small;
  }
  &-content {
    position: relative;
    height: 100%;

    background: #edecec;
    transition: all 0.3s ease-out;
  }
  &-open {
    margin-top: 6px;
  }

  &__box {
    display: flex;
  }
  &__item {
    display: flex;
    justify-content: center;
    flex-grow: 1;

    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;

    transition: background-color 0.2s ease-out;
    &:focus-within {
      background: #384342;
      box-sizing: border-box;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }
  &-close {
    justify-content: flex-end;
    i:hover {
      color: #384342;
      transition: all 0.4s ease-out;
    }
  }
  a {
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    box-sizing: border-box;
    line-height: 40px;

    color: #fff;
    transition: color 0.2s ease-out;
  }

  &-collapsed {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;

    height: 100%;
    width: 50px;

    background: #ffffff;
    box-shadow: $shadow-small;
    &__item {
      position: relative;

      display: flex;
      align-items: center;
      margin: 12px;

      // a:hover + &__hidden {
      //   visibility: inherit;
      //   z-index: 1;
      //   opacity: 1;
      // }
      &__hidden {
        position: absolute;
        z-index: -1;
        left: 33px;

        display: inline-block;
        white-space: nowrap;
        padding: 5px 10px;

        font-weight: 400;
        font-size: 14px;
        line-height: 24px;

        color: $color-main-dark;
        visibility: hidden;
        opacity: 0;

        color: #618580;
        background: #ffffff;
        box-shadow: $shadow-big;
        border-radius: 5px;

        transition: all 0.3s ease-out;
      }
    }
    &__img {
      width: 32px;
      cursor: pointer;
    }
  }
  &-open {
    i {
      color: rgb(97, 133, 128);
      &:hover {
        transition: all 0.4s ease-out;
        cursor: pointer;
        color: #384342;
      }
    }
  }
}
</style>