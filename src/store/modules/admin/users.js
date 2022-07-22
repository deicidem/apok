import * as usersApi from "@/api/users";
import * as groupsApi from "@/api/groups";

export default {
  namespaced: true,
  state: {
    users: null,
    activeUserIndex: null,
    usersGroup: null,
    activeUserLogs: null,
    pagination: {
      currentPage: null,
      totalPages: null,
      first: null,
      last: null,
      prev: null,
      next: null,
    },
    paginationSize: 10,
    searchBy: null,
    pending: false,
    sort: null,
    sortOptions: setSortOptions(),
    searchOptions: setSearchOptions()
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
    getPagination(state) {
      return state.pagination
    },
    getSelectedUsers(state) {
      if (state.users == null) return [];
      return state.users.filter(el => el.selected);
    },
    getUsersMap(state) {
      let map = {};
      for (let i = 0; i < state.users?.length; i++) {
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
    setUsers(state, payload) {
      payload.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
        el.selected = false;
        el.logs = null;
      });
      state.users = payload;
    },
    updateUser(state, {
      index,
      firstName,
      lastName,
      email
    }) {
      state.users[index].firstName = firstName;
      state.users[index].lastName = lastName;
      state.users[index].email = email;
    },
    setUser(state, {
      index,
      user
    }) {
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
    setBlocked(state, {
      index,
      value
    }) {
      state.users[index].blocked = value;
    },
    addUser(state, payload) {
      state.users.push(payload);
    },
    removeUser(state, payload) {
      state.users.splice(payload, 1);
    },
    selectUser(state, {
      index,
      value
    }) {
      state.users[index].selected = value;
    },
    setUsersGroup(state, payload) {
      state.usersGroup = payload;
    },
    setUserLogs(state, {
      index,
      logs
    }) {
      state.users[index].logs = logs;
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
    setActiveUser({
      commit,
      getters
    }, payload) {
      let index = null;

      if (payload != null) {
        index = getters.getUsersMap[payload].index
      }

      commit('setActiveUserIndex', index);
    },

    selectUser({
      commit,
      getters
    }, payload) {
      let index = null;

      if (payload.id != null) {
        index = getters.getUsersMap[payload.id].index
      }

      commit('selectUser', {
        index,
        value: payload.value
      });
    },

    async fetchUsers({
      commit,
      getters
    }, page = 1) {
      commit('setPending', true);
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await usersApi.all({
        page,
        groupId: getters.getUsersGroup?.id,
        [searchField]: searchValue,
        desc: getters.getSort?.desc,
        sortBy: getters.getSort?.field,
        size: getters.getPaginationSize
      });
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

      commit('setUsers', res.data.data);
      commit('setPending', false);
      return res;
    },

    async reloadUsers({
      commit,
      getters
    }) {
      commit('setPending', true);
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await usersApi.all({
        page: getters.getPagination.currentPage,
        groupId: getters.getUsersGroup?.id,
        [searchField]: searchValue,
        desc: getters.getSort?.desc,
        sortBy: getters.getSort?.field,
        size: getters.getPaginationSize
      });
      let users = res.data.data;

      getters.getUsers.forEach((user, i) => {
        if (users.find(e => e.id == user.id) == null) {
          commit('removeUser', i)
        }
      })

      users.forEach(user => {
        if (getters.getUsersMap[user.id] != null) {
          let oldDate = new Date(getters.getUsersMap[user.id].data.updated);
          let newDate = new Date(user.updated);

          if (newDate > oldDate) {
            user.selected = false;
            commit('setUser', {
              index: getters.getUsersMap[user.id].index,
              user
            });
          }
        } else {
          user.selected = false;
          commit('addUser', user);
        }
      })
      commit('setPending', false);
      return users;
    },

    async fetchAll({
      commit,
      dispatch
    }) {
      commit('setPending', true);
      commit('setUsersGroup', null);
      commit('setSearchBy', null);
      commit('setSort', null);

      return await dispatch('fetchUsers');
    },

    async filterByGroup({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      let res = await groupsApi.one(payload);
      let group = res.data.data;

      commit('setUsersGroup', {
        id: group.id,
        title: group.title
      });

      return await dispatch('fetchUsers');
    },

    async filterBySearch({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSearchBy', payload);
      return await dispatch('fetchUsers');
    },

    async sortBy({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSort', payload);
      return await dispatch('fetchUsers');
    },

    async updateUser({
      commit,
      getters
    }, payload) {
      let res = await usersApi.update(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload.id].index;
        commit('updateUser', {
          index,
          ...payload
        });
      }
      return res;
    },

    async deleteUser({
      commit,
      getters
    }, payload) {
      let res = await usersApi.remove(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload].index;
        commit('deleteUser', index);
      }
      return res;
    },

    async blockUser({
      commit,
      getters
    }, payload) {
      let res = await usersApi.block(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload].index;
        commit('setBlocked', {
          index,
          value: true
        });
      }
      return res;
    },

    async unblockUser({
      commit,
      getters
    }, payload) {
      let res = await usersApi.unblock(payload);
      if (res.status == 200) {
        let index = getters.getUsersMap[payload].index;
        commit('setBlocked', {
          index,
          value: false
        });
      }
      return res;
    },

    async createUser({
      commit
    }, payload) {
      let res = await usersApi.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password.password,
        password_confirmation: payload.password.confirm
      });
      console.log(res);
      let user = res.data.data;
      user.date = new Date(user.date).toLocaleDateString();
      commit('addUser', user)
    },

    async loadLogs({
      getters,
      commit
    }, payload) {
      let res = await usersApi.getLogs(payload);
      let index = getters.getUsersMap[payload].index;
      commit('setUserLogs', {
        index,
        logs: res.data.data
      })
    }
  },
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
      text: "Имя",
      value: "firstName",
    },
    {
      text: "Фамилия",
      value: "lastName",
    },
    {
      text: "Почта",
      value: "email",
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
      text: "Имя",
      value: "firstName",
    },
    {
      text: "Фамилия",
      value: "lastName",
    },
    {
      text: "Почта",
      value: "email",
    },
    {
      text: "Дата регистрации",
      value: "date",
    },
  ];
}