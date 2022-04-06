export default {
  namespaced: true,
  state: {
    alerts: setAlerts(),
  },
  getters: {
    getAlerts(state) {
      return state.alerts;
    },
  },
  mutations: {

  },
  actions: {

  }
}

function setAlerts() {
  return [
    {
      id: 1,
      text: 'Формирование температурных карт',
      seen: false,
      result: 'https://gptl.ru/',
    },
    {
      id: 2,
      text: 'Формирование температурных карт',
      seen: true,
      result: 'https://gptl.ru/',
    },
    {
      id: 3,
      text: 'Формирование температурных карт',
      seen: false,
      result: 'https://gptl.ru/',
    }
  ]
}