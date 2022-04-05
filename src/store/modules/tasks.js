export default {
  namespaced: true,
  state: {
    tasks: setTasks()
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    }
  },
  mutations: {

  },
  actions: {

  }
}

function setTasks() {
  return [
    {
      id: 1,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: true
    },
    {
      id: 2,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: false
    },
    {
      id: 3,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: true
    },
    {
      id: 4,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: false
    },
    {
      id: 5,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: true
    },
    {
      id: 6,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: true
    },
    {
      id: 7,
      title: 'Формирование температурных карт',
      date: '2017-03-06 16:17:35',
      status: 'Завершено',
      result: 'https://gptl.ru/',
      delete: true
    },
  ]
}