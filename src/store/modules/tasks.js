import * as userApi from "@/api/user";

export default {
  namespaced: true,
  state: {
    tasks: null,
    currentSort: null,
    currentSortDir: 'asc',
    pagination: {
      currentPage: null,
      totalPages: null,
      first: null,
      last: null,
      prev: null,
      next: null,
    },
    searchBy: null,
    pending: false
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
    },
    getPagination(state) {
      return state.pagination
    },
    getSearchBy(state) {
      return state.searchBy;
    },
    isPending(state) {
      return state.pending;
    }
  },
  mutations: {
    setTasks(state, items) {
      items.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
        el.selected = false;
        if (el.result != null) {
          el.result.active = false;
        }
      })
      state.tasks = items;
    },
    setTask(state, item) {
      item.date = new Date(item.date).toLocaleDateString();
      item.selected = false;
      if (item.result != null) {
        item.result.active = false;
      }
      state.tasks.forEach((el, i) => {
        if (el.id == item.id) {
          state.tasks.splice(i, 1, item);
        }
      })
    },
    addTask(state, item) {
      item.date = new Date(item.date).toLocaleDateString();
      item.selected = false;
      if (item.result != null) {
        item.result.active = false;
      }
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
        if (state.currentSortDir === 'desc') modifier = -1;
        if (a[state.currentSort] == null) return 1 * modifier;
        if (b[state.currentSort] == null) return -1 * modifier;
        if (a[state.currentSort] < b[state.currentSort]) return -1 * modifier;
        if (a[state.currentSort] > b[state.currentSort]) return 1 * modifier;
        return 0;
      })
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
    setSearchBy(state, payload) {
      state.searchBy = payload;
    },
    setPending(state, payload) {
      state.pending = payload;
    }
  },
  actions: {
    async fetchTasks({
      commit,
      dispatch,
      getters
    }, page = 1) {
      commit('setPending', true);

      let res = await userApi.getTasks({
        page,
        search: getters.getSearchBy,
      });

      let tasks = res.data.data;
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

      tasks.forEach(el => {
        if (el.status != "Завершена") {
          dispatch('setTimer', el.id)
        }
      });

      commit('setTasks', tasks);
      commit('setPending', false);
      return tasks;
    },

    async fetchAll({
      commit,
      dispatch
    }) {
      commit('setPending', true);
      commit('setSearchBy', null);

      return await dispatch('fetchTasks');
    },

    async filterBySearch({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSearchBy', payload);

      return await dispatch('fetchTasks');
    },

    async reload({
      commit,
      dispatch,
      getters
    }) {
      let res = await userApi.getTasks({
        page: getters.getPagination.getCurrentPage,
        search: getters.getSearchBy,
      });

      let tasks = res.data.data;
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

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

    async update({
      commit
    }, id) {
      let res = await userApi.getTask(id);
      commit('setTask', res.data.data);
      return res;
    },

    async setTimer({
      dispatch
    }, id) {
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

    async deleteTasks({
      dispatch,
      commit,
      getters
    }) {
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

    async deleteTask({
      commit,
      getters
    }, i) {
      let id = getters.getTasks[i].id;
      let {
        status
      } = await userApi.deleteTask(id);
      if (status == 200) {
        commit('removeTask', i);
      }
    },
    selectTask({
      commit
    }, data) {
      commit('selectTask', data);
    },
    setTaskActive({
      commit
    }, data) {
      commit('setTaskActive', data);
    },
    setTaskViewActive({
      commit
    }, data) {
      commit('setTaskViewActive', data);
    },
    setTaskViewFitBounds({
      commit
    }, data) {
      commit('setTaskViewFitBounds', data);
    },
    sortTasksBy(store, key) {
      store.commit('sortTasksBy', key)
    }
  }
}