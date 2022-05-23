import * as tasksApi from "@/api/tasks";

export default {
  namespaced: true,
  state: {
    tasks: setTasks(),
    headers: ["Номер", "Задача", "Дата добавления", "Статус", "Результат"]
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getHeaders(state) {
      return state.headers;
    }
  },
  mutations: {
    setTasks(state, items) {
      state.tasks = items;
    }
  },
  actions: {
    async load({commit}) {
      let tasks = await tasksApi.all();
      commit('setTasks', tasks);
      return tasks;
    }
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