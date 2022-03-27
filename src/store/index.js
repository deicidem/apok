import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tasks from './modules/tasks'
import users from './modules/users'

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
    users
  },
  strict: process.env.NODE_ENV !== 'production'
})
