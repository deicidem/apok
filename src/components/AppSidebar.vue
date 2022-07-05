<template>
  <div class="sidebar_wrap" :class="{ active }">
    <!-- <transition name="slide"> -->
    <div class="sidebar" :class="{ active }">
      <plan-data v-if="isAuth"></plan-data>
      <div class="sidebar-content">
        <router-view> </router-view>
      </div>
    </div>
    <!-- </transition> -->

    <div class="sidebar-collapsed">
      <div @click="toggleSidebar()" class="sidebar-collapsed__item">
        <div class="sidebar-collapsed__link">
          <i
            v-if="active"
            class="icon icon-ic_fluent_arrow_minimize_20_regular"
          ></i>
          <i v-else class="icon icon-ic_fluent_arrow_maximize_20_regular"></i>
        </div>
      </div>

      <div
        v-for="(route, i) in routes"
        :key="i"
        v-show="!route.needAuth || isAuth"
        class="sidebar-collapsed__item"
        @click="open"
      >
        <router-link :to="route.path" custom v-slot="{ navigate, isActive }">
          <div
            @click="navigate"
            :class="{ active: isActive }"
            class="sidebar-collapsed__link"
          >
            <i class="icon" :class="route.icon"></i>
            <div class="notification" v-if="route.name == 'Мои уведомления'">
              <div class="notification-number">{{ alerts.length }}</div>
            </div>
          </div>
        </router-link>
        <div class="sidebar-collapsed__link__name">{{ route.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PlanData from "@/components/plan/PlanData.vue";
export default {
  name: "AppSidebar",
  components: {
    PlanData,
  },
  data() {
    return {
      cardDataClass: "",
      routes: [
        {
          name: "Мои задачи",
          needAuth: true,
          path: "/main/tasks",
          icon: "icon-ic_fluent_clipboard_bullet_list_ltr_20_regular",
        },
        {
          name: "Доступные задачи",
          needAuth: false,
          path: "/main/plan",
          icon: "icon-ic_fluent_apps_list_detail_20_regular",
        },
        {
          name: "Поиск снимков",
          needAuth: false,
          path: "/main/search",
          icon: "icon-ic_fluent_search_20_regular",
        },
        {
          name: "Мои уведомления",
          needAuth: true,
          path: "/main/alerts",
          icon: "icon-ic_fluent_alert_20_regular",
        },
        {
          name: "Мои файлы",
          needAuth: true,
          path: "/main/files",
          icon: "icon-ic_fluent_folder_20_regular",
        },
        {
          name: "Личный кабинет",
          needAuth: true,
          path: "/main/user",
          icon: "icon-ic_fluent_person_20_regular",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ active: "getSidebarState" }),
    ...mapGetters("alerts", {
      alerts: "getAlerts",
    }),
    ...mapGetters("users", ["isAuth"]),
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
  top: 8px;
  right: 4px;

  &-number {
    width: 16px;
    height: 16px;

    color: $white;
    font-size: 10px;
    background: $gradient-r;
    border-radius: 50%;
    text-align: center;
    line-height: 160%;
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
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);

  &.active {
    transform: translateX(0);
  }

  &-title {
    position: relative;
    margin: 0;
    padding: 6px;

    background: $gradient;
    color: $white;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    box-shadow: $shadow-small;
  }

  &-content {
    position: relative;
    height: 100%;

    background: $white-dark;
    overflow: hidden;
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
      border-top: 1px solid $white;
      border-left: 1px solid $white;
      border-right: 1px solid $white;
    }
  }

  &-close {
    justify-content: flex-end;

    i:hover {
      color: #384342;
      transition: all 0.4s ease-out;
    }
  }

  &-collapsed {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;

    height: 100%;
    width: 50px;

    background: $white;
    box-shadow: $shadow-small;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }

    &__link {
      width: 50px;
      height: 50px;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-out;
      color: $color-main-dark;
      cursor: pointer;

      &.active,
      &:hover,
      &:focus-visible {
        color: $color-main-light;
      }

      &:hover + &__name {
        visibility: inherit;
        z-index: -1;
        opacity: 1;
      }

      &__name {
        position: absolute;
        z-index: 2;
        left: 100%;

        display: inline-block;
        white-space: nowrap;
        padding: 5px 10px;

        font-weight: 400;
        font-size: 12px;
        line-height: 20px;

        visibility: hidden;
        opacity: 0;
        border-left: 1px solid rgba(#000, 0.1);

        color: $color-main;
        background: $white;
        box-shadow: $shadow-small;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: all 0.2s ease-out;
      }
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