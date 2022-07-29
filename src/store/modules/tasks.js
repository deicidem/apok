import * as userTasksApi from "@/api/userTasks";

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
    paginationSize: 8,
    searchBy: null,
    pending: false,
    sort: null,
    sortOptions: setSortOptions(),
    searchOptions: setSearchOptions()
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
    },
    getSort(state) {
      return state.sort;
    },
    getSortOptions(state) {
      return state.sortOptions;
    },
    getSearchOptions(state) {
      return state.searchOptions;
    },
    getPaginationSize(state) {
      return state.paginationSize;
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
        el.noteActive = false;
      })
      state.tasks = items;
    },
    setTask(state, item) {
      item.date = new Date(item.date).toLocaleDateString();
      item.selected = false;
      if (item.result != null) {
        item.result.active = false;
      }
      item.noteActive = false;
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
    setTaskNoteActive(state, payload) {
      state.tasks[payload.index].noteActive = payload.value;
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
    },
    setSort(state, payload) {
      state.sort = payload;
    }
  },
  actions: {
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
    },
    setTaskNoteActive({commit}, payload) {
      commit('setTaskNoteActive', payload);
    },
    async fetchTasks({
      commit,
      dispatch,
      getters
    }, page = 1) {
      commit('setPending', true);
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await userTasksApi.getTasks({
        page,
        [searchField]: searchValue,
        desc: getters.getSort?.desc,
        sortBy: getters.getSort?.field,
        size: getters.getPaginationSize
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
      commit('setSort', null);

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

    async sortBy({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSort', payload);
      return await dispatch('fetchTasks');
    },

    async reload({
      commit,
      dispatch,
      getters
    }) {
      let res = await userTasksApi.getTasks({
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
      let res = await userTasksApi.getTask(id);
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
      getters
    }) {
      let ids = [];
      for (let i = 0; i < getters.getTasks.length; i++) {
        if (getters.getTasks[i].selected) {
          ids.push(getters.getTasks[i].id);
        }
      }
      await userTasksApi.deleteTasks(ids);
      return await dispatch('fetchTasks', getters.getPagination.currentPage);
    },

    async deleteTask({
      dispatch,
      getters
    }, i) {
      let id = getters.getTasks[i].id;
      let {
        status
      } = await userTasksApi.deleteTask(id);
      if (status == 200) {
        return await dispatch('fetchTasks', getters.getPagination.currentPage);
      }
    },
    async updateTask(store, payload) {
       await userTasksApi.update(payload.id, {note: payload.note});
      // if (status == 200) {
      //   return await dispatch('fetchTasks', getters.getPagination.currentPage);
      // }
    },
  }
}

function setSearchOptions() {
  return [
    {
      text: "Все",
      value: "any",
    },
    {
      text: "ID",
      value: "id",
    },
    {
      text: "Название",
      value: "title",
    },
  ];
}
function setSortOptions() {
  return [
    {
      text: "ID",
      value: "id",
    },
    {
      text: "Название",
      value: "title",
    },
    {
      text: "Дата создания",
      value: "date",
    },
  ];
}