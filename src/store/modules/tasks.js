import * as tasksApi from "@/api/tasks";

export default {
  namespaced: true,
  state: {
    tasks: [],
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

