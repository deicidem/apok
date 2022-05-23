import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tasks from './modules/tasks'
import users from './modules/users'
import plans from './modules/plans'
import alerts from './modules/alerts'
import map from './modules/map'
import search from './modules/search'
import results from './modules/results'

export default new Vuex.Store({
  state: {
    sidebarActive: false
  },
  getters: {
    getSidebarState(state) {
      return state.sidebarActive;
    }
  },
  mutations: {
    setSidebarState(state, val) {
      state.sidebarActive = val;
    }
  },
  actions: {
    setSidebarState(store, val) {
      store.commit('setSidebarState', val)
    },
  },
  modules: {
    tasks,
    users,
    plans,
    alerts,
    map,
    search,
    results
  },
  strict: process.env.NODE_ENV !== 'production'
})
