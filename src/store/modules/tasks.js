import * as userApi from "@/api/user";

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
    },
    getTasksMap(state) {
      let tasksMap = {};

      for (let i = 0; i < state.tasks.length; i++) {
        let task = state.tasks[i];
        tasksMap[task.id] = task;
        tasksMap[task.id].index = i;
      }

      return tasksMap;
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
    addTask(state, item) {
      state.tasks.push(item);

    },
    removeTask(state, index) {
      state.tasks.splice(index, 1);
    },
    selectTask(state, data) {
      state.tasks[data.index].selected = data.value;
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
      let tasks = await userApi.getTasks();
      tasks.forEach(el => {
        el.selected = false;
        if (el.result != null) {
          el.result.active = false;
        }
        if (el.status != "Завершена") {
          dispatch('setTimer', el.id)
        }
      });
      commit('setTasks', tasks);
      return tasks;
    },
    async reload({commit, dispatch, getters}) {
      let tasks = await userApi.getTasks();
      getters.getTasks.forEach((task, i) => {
        if (tasks.find(e => e.id == task.id) == null) {
          commit('removeTask', i)
        }
      })

      tasks.forEach(task => {
        if (getters.getTasksMap[task.id] != null) {
          let oldDate = new Date(getters.getTasksMap[task.id].updatedAt);
          let newDate = new Date(task.updatedAt);
          if (newDate > oldDate) {
            task.selected = false;
            if (task.result != null) {
              task.result.active = false;
            }
            if (task.status != "Завершена") {
              dispatch('setTimer', task.id)
            }
            commit('setTask', task);
          }
        } else {
          commit('addTask', task);
        }
      })
      
      return tasks;
    },
    async update({commit}, id) {
      let task = await userApi.getTask(id);
      task.selected = false;
      if (task.result != null) {
        task.result.active = false;
      }
      commit('setTask', task);
      return task;
    },
    async setTimer({dispatch}, id) {
      let interval = setInterval(async () => {
        dispatch('update', id).then(task => {
          if (task.status == "Завершена") {
            clearInterval(interval);
          }
        }).catch(() => {
          clearInterval(interval);
        })
      }, 60000);
    },
    async deleteTasks({dispatch, commit, getters}) {
      let ids = [];
      for (let i = 0; i < getters.getTasks.length; i++) {
        if (getters.getTasks[i].selected) {
          ids.push(getters.getTasks[i].id);
        } 
      }
      let res = await userApi.deleteTasks(ids);
      await dispatch('load');
      console.log(res, commit);
    },
    
    async deleteTask({commit, getters}, i) {
      let id = getters.getTasks[i].id;
      let {status} = await userApi.deleteTask(id);
      if (status == 200) {
        commit('removeTask', i);
      }
    },
    selectTask({commit}, data) {
      commit('selectTask', data);
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
