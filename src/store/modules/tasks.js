import * as tasksApi from "@/api/tasks";

export default {
  namespaced: true,
  state: {
    tasks: null,
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
    setTaskViewFitBounds(state, data) {
      state.tasks[data.taskIndex].result.views[data.viewIndex].fitBounds = data.val;
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
          el.result.views.forEach(e => {
            if (e.type != 1) {
              e.fitBounds = true;
            }
            e.active = false;
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
          if (el.type != 1) {
            el.fitBounds = true;
          }
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
    setTaskViewFitBounds({commit}, data) {
      commit('setTaskViewFitBounds', data);
    },
    sortTasksBy(store, key) {
      store.commit('sortTasksBy', key)
    }
  }
}
