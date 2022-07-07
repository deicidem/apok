import * as usersApi from "@/api/users";

export default {
  namespaced: true,
  state: {
    users: null,
    activeUserIndex: null,
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
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, {index, firstName, lastName, email}) {
      state.users[index].firstName = firstName;
      state.users[index].lastName = lastName;
      state.users[index].email = email;
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
    async loadUsers({commit}) {
      let res = await usersApi.all();
      let users = res.data.users;
      users.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setUsers', res.data.users);
      return res;
    },
    async searchUsers({commit}, payload) {
      let res =  await usersApi.allFiltered(payload);
      let users = res.data.users;
      users.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setUsers', res.data.users);
      return res;
    },
    async updateUser({commit,getters}, payload) {
      let res =  await usersApi.update(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload.id].index;
        commit('setUser', {index, ...payload});
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
    }
  
  },
}