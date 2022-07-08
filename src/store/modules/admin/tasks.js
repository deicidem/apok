import * as tasksApi from "@/api/tasks";

export default {
  namespaced: true,
  state: {
    tasks: null,
    activeTaskIndex: null,
    tasksUser: null
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
    }
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
    setTask(state, {index, firstName, lastName, email}) {
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
    setBlocked(state, {index, value}) {
      state.tasks[index].blocked = value;
    },
    addTask(state, payload) {
      state.tasks.push(payload);
    },
    setTasksUser(state, payload) {
      state.tasksUser = payload;
    }
  },
  actions: {
    setActiveTask({commit, getters}, payload) {
      let index = null;
      if (payload != null)  {
        index = getters.getTasksMap[payload].index
      }
      commit('setActiveTaskIndex', index);
    },
    async loadTasks({commit}) {
      let res = await tasksApi.all();
      console.log(res);
      let tasks = res.data.tasks;
      tasks.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setTasks', res.data.tasks);
      commit('setTasksUser', null);
      return res;
    },
    async loadTasksByUser({commit}, payload) {
      let res = await tasksApi.allByUser(payload);
      console.log(res);
      let tasks = res.data.tasks;
      tasks.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setTasks', res.data.tasks);
      commit('setTasksUser', {
        id: res.data.tasks[0].userId,
        name: res.data.tasks[0].userName
      });
      return res;
    },
    async searchTasks({commit}, payload) {
      let res =  await tasksApi.allFiltered(payload);
      let tasks = res.data.tasks;
      tasks.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setTasks', res.data.tasks);
      return res;
    },
    async updateTask({commit,getters}, payload) {
      let res =  await tasksApi.one(payload);
      if (res.status == 200) {
        let index = getters.getTasksMap[payload.id].index;
        commit('setTask', {index, ...payload});
      }
      return res;
    },
    async deleteTask({commit,getters}, payload) {
      let res =  await tasksApi.deleteTask(payload);
      if (res.status == 200) {
        let index = getters.getTasksMap[payload].index;
        commit('deleteTask', index);
      }
      return res;
    },
  },
}