<template>
  <div class="sidebar_wrap" :class="active ? 'active' : ''">
    <transition name="slide">
      <div class="sidebar" v-show="active">
        <div class="sidebar-content">
          <router-view> </router-view>
        </div>
      </div>
    </transition>

    <div class="sidebar-collapsed">
      <div
        v-bind:class="{
          'sidebar-collapsed__collapse': isCollapse,
          'sidebar-collapsed__open': isOpen,
        }"
        @click="toggleSidebar()"
      ></div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/tasks">
          <div class="sidebar-collapsed__img">
            <img svg-inline src="@/assets/img/sidebar-task.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Мои задачи</div>
      </div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/plan">
          <div class="sidebar-collapsed__img">
            <img svg-inline src="@/assets/img/sidebar-plan.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">
          Запланированные задачи
        </div>
      </div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/search">
          <div class="sidebar-collapsed__img">
            <img svg-inline src="@/assets/img/sidebar-search.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Поиск снимков</div>
      </div>

      <div class="sidebar-collapsed__item notification-wrapper" @click="open">
        <router-link to="/main/alerts">
          <div class="sidebar-collapsed__img">
            <img svg-inline src="@/assets/img/sidebar-notification.svg" />
          </div>
          <div class="notification">
            <div class="notification-number">{{ alerts.length }}</div>
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Мои уведомления</div>
      </div>

      <div class="sidebar-collapsed__item" @click="open">
        <router-link to="/main/person">
          <div class="sidebar-collapsed__img">
            <img svg-inline src="@/assets/img/sidebar-person.svg" />
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Личный кабинет</div>
      </div>
    </div>
    <app-plan-data></app-plan-data>
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
  data() {
    return {
      isCollapse: false,
      isOpen: true,
    };
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
        this.isCollapse = false;
        this.isOpen = true;
      } else {
        this.open();
        this.isCollapse = true;
        this.isOpen = false;
      }
    },
  },
};
</script>

<style lang="scss">
.notification {
  position: absolute;
  top: -2px;
  right: -5px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 6px;
      transition: all 0.2s ease-out;

      a:hover + &__hidden {
        visibility: inherit;
        z-index: 1;
        opacity: 1;
      }
      &__hidden {
        position: absolute;
        z-index: -1;
        left: 33px;

        display: inline-block;
        white-space: nowrap;
        padding: 5px 10px;

        font-weight: 400;
        font-size: 12px;
        line-height: 20px;

        color: $color-main-dark;
        visibility: hidden;
        opacity: 0;

        color: #618580;
        background: #ffffff;
        box-shadow: $shadow-small;
        border-radius: 10px;

        transition: all 0.3s ease-out;
      }
    }
    &__img {
      width: 31px;
      display: flex;
      margin-top: 2px;
      justify-content: center;
      path {
        fill: $color-main-dark;
      }
    }
    &__collapse {
      margin-top: 6px;
      width: 31px;
      height: 30px;
      background: url("@/assets/img/sidebar-collapse.svg");
      cursor: pointer;
    }
    &__open {
      margin-top: 6px;
      width: 31px;
      height: 30px;
      background: url("@/assets/img/sidebar-open.svg");
      background-repeat: no-repeat;
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