import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tasks from './modules/tasks'
import users from './modules/users'
import plans from './modules/plans'

export default new Vuex.Store({
  state: {

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tasks,
    users,
    plans
  },
  strict: process.env.NODE_ENV !== 'production'
})
