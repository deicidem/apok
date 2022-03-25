<template>
  <div class="sidebar_wrap" :class="collapsed ? '' : 'active'">
    <div class="sidebar" :class="collapsed ? '' : 'active'">
      <div class="sidebar__wrapper">
        <div class="sidebar__box">
          <div class="sidebar__item"><router-link to="/main/tasks">Мои задачи</router-link></div>
          <div class="sidebar__item">
            <router-link to="/main/plan">Запланированные задачи</router-link>
          </div>
          <div class="sidebar__item"><router-link to="/main/search">Поиск снимков</router-link></div>
          <div class="sidebar__item"><router-link to="/main/alerts">Мои уведомления</router-link></div>
          <div class="sidebar__item sidebar-close" @click="close()">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <router-view></router-view>

    </div>

    <div class="sidebar-collapsed">
      <div class="sidebar__item open sidebar-open" id="collapsed" @click="open()">
        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
      </div>

      <div class="sidebar-collapsed__item">
        <i class="fa fa-folder-open" aria-hidden="true"></i>
        <div class="sidebar-collapsed__item__hidden">Мои задачи</div>
      </div>

      <div class="sidebar-collapsed__item">
        <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
        <div class="sidebar-collapsed__item__hidden">
          Запланированные задачи
        </div>
      </div>

      <div class="sidebar-collapsed__item">
        <i class="fa fa-search" aria-hidden="true"></i>
        <div class="sidebar-collapsed__item__hidden">Поиск снимков</div>
      </div>

      <div class="sidebar-collapsed__item">
        <i class="fa fa-commenting" aria-hidden="true"></i>
        <div class="sidebar-collapsed__item__hidden">Мои уведомления</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AppSidebar",
  data() {
    return {
      collapsed: true
    }
  },
  methods: {
    open() {
      this.$emit('open');
      this.collapsed = false;
    },
    close() {
      this.$emit('close');
      this.collapsed = true;
    }
  }
};
</script>














<style lang="scss">
.sidebar {
  z-index: 5;
  overflow: hidden;
  height: 100%;
  width: 40%;
  background: #fff;
  transition: width 0.3s ease-in-out;
  &_wrap {
    height: 100%;
    &.active {
    width: 40%;
  }
  }
  &__wrapper {
    width: 100%;
    height: 40px;
    background: #618580;
    border-bottom: 1px solid #fff;
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
    background: #ffffff;
    height: 100%;
    width: 50px;
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
      i:hover + &__hidden {
        z-index: 1;
        opacity: 1;
      }
      &__hidden {
        opacity: 0;
        z-index: -1;
        position: absolute;
        color: #618580;
        left: 33px;
        background: #ffffff;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        padding: 5px;
        box-shadow: 0 2px 5px 0 rgb(97, 133, 128, 0.5);
        -webkit-box-shadow: 0 2px 5px 0 rgb(97, 133, 128, 0.5);
        -moz-box-shadow: 0 2px 5px 0 rgb(97, 133, 128, 0.5);
        border-radius: 5px;
        width: 180px;
        transition: all 0.3s ease-out;
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