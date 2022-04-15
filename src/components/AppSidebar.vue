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
            <div class="notification-number">3</div>
          </div>
        </router-link>

        <div class="sidebar-collapsed__item__hidden">Мои уведомления</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
  name: "AppSidebar",
  computed: {
    ...mapGetters({active: 'getSidebarState'})
  },
  methods: {
    ...mapActions(['setSidebarState']),
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
.notification{
  position: absolute;
  top: -5px;
  right: -8px;
  &-number{
    color: #FFF;
    font-size: 12px;
    background: $color-red;
    border-radius: 50%;
    width: 16px;
    height: 18px;
    text-align: center;
  }
  &-wrapper{
    position: relative;
  }
}

.slide-enter {
  transform: translateX(-100%);
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave {
  transform: translateX(0);
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-leave-to {
  transform: translateX(-100%);
}
.sidebar-title {
  background: $gradient;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: 400;
  box-shadow: $shadow-small;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.sidebar-title {
  background: $gradient;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: 400;
  box-shadow: $shadow-small;
}

.sidebar {
  display: block;
  position: absolute;
  left: 50px;
  z-index: 5;
  height: 100%;
  width: calc(100% - 50px);
  box-shadow: $shadow-big;
  overflow: hidden;
  &-content {
    background: #edecec;
    transition: all 0.3s ease-out;
    height: 100%;
  }
  &-open {
    margin-top: 6px;
  }

  &__box {
    display: flex;
  }
  &__item {
    transition: background-color 0.2s ease-out;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    i {
      font-size: 24px;
      color: #fff;
      line-height: 40px;
      padding: 0 12px;
      transition: color 0.2s ease-out;
    }
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
    color: #fff;
    font-weight: 400;
    font-size: 14px;
    box-sizing: border-box;
    line-height: 40px;
    transition: color 0.2s ease-out;
  }

  &-collapsed {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    background: #ffffff;
    height: 100%;
    width: 50px;
    box-shadow: $shadow-small;
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      margin: 12px;
      i {
        font-size: 24px;
        color: rgb(97, 133, 128);
        transition: all 0.2s ease-out;
        &:hover {
          transition: all 0.4s ease-out;
          cursor: pointer;
          color: #384342;
        }
      }
      a:hover + &__hidden {
        visibility: inherit;
        z-index: 1;
        opacity: 1;
      }
      &__hidden {
        color: $color-main-dark;
        white-space: nowrap;
        display: inline-block;
        visibility: hidden;
        opacity: 0;
        z-index: -1;
        position: absolute;
        color: #618580;
        left: 33px;
        background: #ffffff;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        padding: 5px 10px;
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