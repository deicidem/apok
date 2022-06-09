import * as tasksApi from "@/api/tasks";

export default {
  namespaced: true,
  state: {
    tasks: setTasks(),
    currentSort: null,
    currentSortDir: 'asc'
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getHeaders(state) {
      return state.headers;
    },
    getSortDir(state) {
      return state.currentSortDir;
    }
  },
  mutations: {
    setTasks(state, items) {
      state.tasks = items;
    },
    setTask(state, item) {
      state.tasks.forEach((el, i) => {
        if (el.id == item.id) {
          state.tasks.splice(i, 1, item);
        }
        
      })
    },
    setTaskActive(state, data) {
      state.tasks[data.index].result.active = data.val;
    },
    setTaskViewActive(state, data) {
      state.tasks[data.taskIndex].result.views[data.viewIndex].active = data.val;
    },
    sortTasksBy(state, key) {
      if (state.currentSort == key) {
        state.currentSortDir = state.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.currentSort = key;
        state.currentSortDir = 'asc';
      }
      
      state.tasks.sort((a, b) => {
        let modifier = 1;
        if(state.currentSortDir === 'desc') modifier = -1;
        if(a[state.currentSort]==null) return 1 * modifier;
        if(b[state.currentSort]==null) return -1 * modifier;
        if(a[state.currentSort] < b[state.currentSort]) return -1 * modifier;
        if(a[state.currentSort] > b[state.currentSort]) return 1 * modifier;
        return 0;
      })
    }
  },
  actions: {
    async load({commit, dispatch}) {
      let tasks = await tasksApi.all();
      tasks.forEach(el => {
        if (el.result != null) {
          el.result.active = false;
          el.result.views.forEach(el => {
            el.active = false;
          })
        }
        if (el.status != "Завершена") {
          dispatch('setTimer', el.id)
        }
      });
      commit('setTasks', tasks);
      return tasks;
    },
    async update({commit}, id) {
      let task = await tasksApi.one(id);
      if (task.result != null) {
        task.result.active = false;
      task.result.views.forEach(el => {
        el.active = false;
      })
      }
      commit('setTask', task);
      return task;
    },
    async setTimer({dispatch}, id) {
      let interval = setInterval(async () => {
        let task = await dispatch('update', id);
        if (task.status == "Завершена") {
          clearInterval(interval);
        }
      }, 60000);
    },
    setTaskActive({commit}, data) {
      commit('setTaskActive', data);
    },
    setTaskViewActive({commit}, data) {
      commit('setTaskViewActive', data);
    },
    sortTasksBy(store, key) {
      store.commit('sortTasksBy', key)
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