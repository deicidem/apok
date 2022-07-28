export default {
  namespaced: true,
  state: {
    alerts: [],
    counter: 0,
  },
  getters: {
    getAlerts(state) {
      return state.alerts;
    },
    getCounter(state) {
      return state.counter;
    }
  }, 
  mutations: {
    addAlert(state, payload) {
      return state.alerts.push(payload);
    },
    removeAlert(state, id) {
      state.alerts = state.alerts.filter(e => e.id !== id)
    },
    increaseCounter(state) {
      state.counter += 1;
    }
  },
  actions: {
    addAlert({commit, dispatch, getters}, payload) {
      payload.id = getters.counter;
      commit('increaseCounter')
      commit('addAlert', payload);
      setTimeout(() => {
        dispatch('deleteAlert', payload.id)
      }, 10000)
    },
    deleteAlert({commit}, payload) {
      commit('removeAlert', payload);
    }
  }
}