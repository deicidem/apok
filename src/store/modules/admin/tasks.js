import * as tasksApi from "@/api/tasks";
import * as usersApi from "@/api/users";

export default {
  namespaced: true,
  state: {
    tasks: null,
    activeTaskIndex: null,
    tasksUser: null,
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
    getTasksUser(state) {
      return state.tasksUser;
    },
    getActiveTaskIndex(state) {
      return state.activeTaskIndex;
    },
    getActiveTask(state) {
      if (state.tasks != null && state.activeTaskIndex != null) {
        return state.tasks[state.activeTaskIndex];
      }
      return null;
    },
    getTasksMap(state) {
      let map = {};
      for (let i = 0; i < state.tasks.length; i++) {
        let task = state.tasks[i];
        map[task.id] = {
          data: task,
          index: i
        }
      }
      return map;
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
    setTasks(state, payload) {
      payload.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      })
      state.tasks = payload;
    },
    setTask(state, {
      index,
      firstName,
      lastName,
      email
    }) {
      state.tasks[index].firstName = firstName;
      state.tasks[index].lastName = lastName;
      state.tasks[index].email = email;
    },
    deleteTask(state, payload) {
      state.tasks.splice(payload, 1);
    },
    setActiveTaskIndex(state, payload) {
      state.activeTaskIndex = payload;
    },
    setBlocked(state, {
      index,
      value
    }) {
      state.tasks[index].blocked = value;
    },
    addTask(state, payload) {
      state.tasks.push(payload);
    },
    setTasksUser(state, payload) {
      state.tasksUser = payload;
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
    setActiveTask({
      commit,
      getters
    }, payload) {
      let index = null;
      if (payload != null) {
        index = getters.getTasksMap[payload].index
      }
      commit('setActiveTaskIndex', index);
    },

    async fetchTasks({
      commit,
      getters
    }, page = 1) {
      commit('setPending', true);

      let res = await tasksApi.all({
        page,
        search: getters.getSearchBy,
        userId: getters.getTasksUser?.id
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

      commit('setTasks', tasks);
      commit('setPending', false);
      return res;
    },

    async fetchAll({commit, dispatch}) {
      commit('setPending', true);
      commit('setTasksUser', null);
      commit('setSearchBy', null);

      return await dispatch('fetchTasks');
    },

    async filterByUser({commit, dispatch}, payload) {
      commit('setPending', true);

      let res = await usersApi.one(payload);
      let user = res.data.data;

      commit('setTasksUser', {
        id: user.id,
        name: user.firstName + ' ' + user.lastName
      });

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

    async updateTask({
      commit,
      getters
    }, payload) {
      let res = await tasksApi.one(payload);
      if (res.status == 200) {
        let index = getters.getTasksMap[payload.id].index;
        commit('setTask', {
          index,
          ...payload
        });
      }
      return res;
    },
    
    async deleteTask({
      commit,
      getters
    }, payload) {
      let res = await tasksApi.deleteTask(payload);
      if (res.status == 200) {
        let index = getters.getTasksMap[payload].index;
        commit('deleteTask', index);
      }
      return res;
    },
  },
}