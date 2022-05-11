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
    deleteAlert(state, i) {
      state.alerts.splice(i, 1);
    }
  },
  actions: {
    deleteAlert(store, i) {
      store.commit('deleteAlert', i)
    }
  }
}

 function setAlerts() {
  

  return [
    {
      id: 1,
      text: 'Задача №1 “оценка качества ” выполнена',
      seen: false,
      result: 'https://gptl.ru/',
      theme: 'task',
    },
    {
      id: 2,
      text: 'Задача №2 “оценка качества ” выполнена',
      seen: true,
      result: 'https://gptl.ru/',
      theme: 'task',
    },
    {
      id: 3,
      text: 'Задача №3 “оценка качества ” выполнена',
      seen: false,
      result: 'https://gptl.ru/',
      theme: 'task',
    },
    {
      id: 4,
      text: 'Загрузка данных выполнена',
      seen: false,
      result: 'https://gptl.ru/',
      theme: 'data',
    },
    {
      id: 5,
      text: 'Доступ  ...  предоставлен',
      seen: false,
      result: 'https://gptl.ru/',
      theme: 'access',
    },
    {
      id: 6,
      text: 'Загрузка данных выполнена',
      seen: false,
      result: 'https://gptl.ru/',
      theme: 'data',
    },
    {
      id: 7,
      text: 'Доступ  ...  предоставлен',
      seen: false,
      result: 'https://gptl.ru/',
      theme: 'access',
    },
  ]
}