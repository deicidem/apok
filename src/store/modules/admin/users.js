import * as usersApi from "@/api/users";
import * as groupsApi from "@/api/groups";

export default {
  namespaced: true,
  state: {
    users: null,
    activeUserIndex: null,
    usersGroup: null,
    activeUserLogs: null
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getActiveUserIndex(state) {
      return state.activeUserIndex;
    },
    getActiveUser(state) {
      if (state.users != null && state.activeUserIndex != null) {
        return state.users[state.activeUserIndex];
      }
      return null;
    },
    getSelectedUsers(state) {
      if (state.users == null) return [];
      return state.users.filter(el => el.selected);
    },
    getUsersMap(state) {
      let map = {};
      for (let i = 0; i < state.users.length; i++) {
        let user = state.users[i];
        map[user.id] = {
          data: user,
          index: i  
        }
      }
      return map;
    },
    getUsersGroup(state) {
      return state.usersGroup;
    },
  },
  mutations: {
    setUsers(state, payload) {
      payload.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
        el.selected = false;
        el.logs = null;
      });
      state.users = payload;
    },
    updateUser(state, {index, firstName, lastName, email}) {
      state.users[index].firstName = firstName;
      state.users[index].lastName = lastName;
      state.users[index].email = email;
    },
    setUser(state, {index, user}) {
      user.date = new Date(user.date).toLocaleDateString();
      user.selected = false;
      user.logs = null;
      state.users[index] = user;
    },
    deleteUser(state, payload) {
      state.users.splice(payload, 1);
    },
    setActiveUserIndex(state, payload) {
      state.activeUserIndex = payload;
    },
    setBlocked(state, {index, value}) {
      state.users[index].blocked = value;
    },
    addUser(state, payload) {
      state.users.push(payload);
    },
    removeUser(state, payload) {
      state.users.splice(payload, 1);
    },
    selectUser(state, {index, value}) {
      state.users[index].selected = value;
    },
    setUsersGroup(state, payload) {
      state.usersGroup = payload;
    },
    setUserLogs(state, {index, logs}) {
      state.users[index].logs = logs;
    }
  },
  actions: {
    setActiveUser({commit, getters}, payload) {
      let index = null;
      if (payload != null)  {
        index = getters.getUsersMap[payload].index
      }
      commit('setActiveUserIndex', index);
    },
    selectUser({commit, getters}, payload) {
      let index = null;
      if (payload.id != null)  {
        index = getters.getUsersMap[payload.id].index
      }
      commit('selectUser', {index, value: payload.value});
    },
    async loadUsers({commit}) {
      let res = await usersApi.all();
      commit('setUsers', res.data.users);
      return res;
    },
    async reloadUsers({commit, getters}) {
      let res = await usersApi.all();
      let users = res.data.users;
      getters.getUsers.forEach((user, i) => {
        if (users.find(e => e.id == user.id) == null ) {
          commit('removeUser', i)
        }
      })
      users.forEach(user => {
        if (getters.getUsersMap[user.id] != null) {
          let oldDate = new Date(getters.getUsersMap[user.id].data.updated);
          let newDate = new Date(user.updated);
          if (newDate > oldDate) {
            user.selected = false;
            commit('setUser', {index: getters.getUsersMap[user.id].index, user});
          }
        } else {
          user.selected = false;
          commit('addUser', user);
        }
      })
      
      return users;
    },
    async loadUsersByGroup({
      commit
    }, payload) {
      let usersRes = await usersApi.allByGroup(payload);
      let groupRes = await groupsApi.one(payload);
      let users = usersRes.data.users;
      commit('setUsers', users);
      commit('setUsersGroup', {
        id: groupRes.data.group.id,
        title: groupRes.data.group.title
      });
      return usersRes;
    },
    async searchUsers({commit}, payload) {
      let res =  await usersApi.allFiltered(payload);
      commit('setUsers', res.data.users);
      return res;
    },
    async updateUser({commit,getters}, payload) {
      let res =  await usersApi.update(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload.id].index;
        commit('updateUser', {index, ...payload});
      }
      return res;
    },
    async deleteUser({commit,getters}, payload) {
      let res =  await usersApi.remove(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload].index;
        commit('deleteUser', index);
      }
      return res;
    },
    async blockUser({commit, getters}, payload) {
      let res =  await usersApi.block(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload].index;
        commit('setBlocked', {index, value: true});
      }
      return res;
    },
    async unblockUser({commit, getters}, payload) {
      let res =  await usersApi.unblock(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload].index;
        commit('setBlocked', {index, value: false});
      }
      return res;
    },
    async createUser({commit}, payload) {
      let res = await usersApi.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password.password,
        password_confirmation: payload.password.confirm
      });
      console.log(res);
      let user = res.data.user;
      user.date = new Date(user.date).toLocaleDateString();
      commit('addUser', user)
    },
    async loadLogs({getters, commit}, payload) {
      let res = await usersApi.getLogs(payload);
      let index = getters.getUsersMap[payload].index;
      commit('setUserLogs', {index, logs: res.data.logs})
    }
  
  },
}