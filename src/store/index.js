import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tasks from './modules/tasks'
import users from './modules/users'
import plans from './modules/plans'
import notifications from './modules/notifications'
import alerts from './modules/alerts'
import map from './modules/map'
import search from './modules/search'
import results from './modules/results'
import files from './modules/files'
import admin from './modules/admin'
import groups from './modules/groups'
import groupTypes from './modules/groupTypes'
import groupUsers from './modules/groupUsers'

export default new Vuex.Store({
  state: {
    sidebarActive: false,
    dataCardActive: false,
    scrollOps: {
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
        gutterOfEnds: "5px",
        gutterOfSide: "5px",
        keepShow: false,
      },
      bar: {
        onlyShowBarOnScroll: false,
        keepShow: true,
        background: "#6BA2A6",
      },
    }
  },
  getters: {
    getSidebarState(state) {
      return state.sidebarActive;
    },
    getDataCardState(state) {
      return state.dataCardActive;
    },
    scrollOps(state) {
      return state.scrollOps;
    }
  },
  mutations: {
    setSidebarState(state, val) {
      state.sidebarActive = val;
    },
    setDataCardState(state, val) {
      state.dataCardActive = val;
    }
  },
  actions: {
    setSidebarState(store, val) {
      store.commit('setSidebarState', val)
    },
    setDataCardState(store, val) {
      store.commit('setDataCardState', val)
    },
  },
  modules: {
    tasks,
    users,
    plans,
    notifications,
    map,
    search,
    results,
    alerts,
    files,
    admin,
    groups,
    groupTypes,
    groupUsers,
  },
  strict: process.env.NODE_ENV !== 'production'
})
