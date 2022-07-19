import * as groupsApi from "@/api/groups";
import * as usersApi from "@/api/users";
export default {
  namespaced: true,
  state: {
    groups: null,
    activeGroupIndex: null,
    groupsUser: null,
    groupsOwner: null,
    types: null,
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
    getGroups(state) {
      return state.groups;
    },
    getTypes(state) {
      return state.types;
    },
    getGroupsUser(state) {
      return state.groupsUser;
    },
    getGroupsOwner(state) {
      return state.groupsOwner;
    },
    getActiveGroupIndex(state) {
      return state.activeGroupIndex;
    },
    getActiveGroup(state) {
      if (state.groups != null && state.activeGroupIndex != null) {
        return state.groups[state.activeGroupIndex];
      }
      return null;
    },
    getGroupsMap(state) {
      let map = {};
      for (let i = 0; i < state.groups.length; i++) {
        let group = state.groups[i];
        map[group.id] = {
          data: group,
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
    setGroups(state, payload) {
      state.groups = payload;
    },
    setTypes(state, payload) {
      state.types = payload;
    },
    setGroup(state, {
      index,
      firstName,
      lastName,
      email
    }) {
      state.groups[index].firstName = firstName;
      state.groups[index].lastName = lastName;
      state.groups[index].email = email;
    },
    deleteGroup(state, payload) {
      state.groups.splice(payload, 1);
    },
    setActiveGroupIndex(state, payload) {
      state.activeGroupIndex = payload;
    },
    setBlocked(state, {
      index,
      value
    }) {
      state.groups[index].blocked = value;
    },
    addGroup(state, payload) {
      state.groups.push(payload);
    },
    setGroupsUser(state, payload) {
      state.groupsUser = payload;
    },
    setGroupsOwner(state, payload) {
      state.groupsOwner = payload;
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
    setActiveGroup({
      commit,
      getters
    }, payload) {
      let index = null;
      if (payload != null) {
        index = getters.getGroupsMap[payload].index
      }
      commit('setActiveGroupIndex', index);
    },

    async fetchGroups({
      commit,
      getters
    }, page = 1) {
      commit('setPending', true);
      let res = await groupsApi.all({
        page,
        search: getters.getSearchBy,
        userId: getters.getGroupsUser?.id,
        ownerId: getters.getGroupsOwner?.id,
      });
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

      commit('setGroups', res.data.data);
      commit('setPending', false);
      return res;
    },

    async fetchAll({
      commit,
      dispatch
    }) {
      commit('setPending', true);
      commit('setGroupsUser', null);
      commit('setGroupsOwner', null);
      commit('setSearchBy', null);

      return await dispatch('fetchGroups');
    },

    async filterByUser({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      let res = await usersApi.one(payload);
      let user = res.data.data;

      commit('setGroupsUser', {
        id: user.id,
        name: user.firstName + ' ' + user.lastName
      });

      return await dispatch('fetchGroups');
    },

    async filterByOwner({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      let res = await usersApi.one(payload);
      let user = res.data.data;

      commit('setGroupsOwner', {
        id: user.id,
        name: user.firstName + ' ' + user.lastName
      });

      return await dispatch('fetchGroups');
    },

    async filterBySearch({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSearchBy', payload);
      return await dispatch('fetchGroups');
    },

    async updateGroup({
      commit,
      getters
    }, payload) {
      let res = await groupsApi.one(payload);
      if (res.status == 200) {
        let index = getters.getGroupsMap[payload.id].index;
        commit('setGroup', {
          index,
          ...payload
        });
      }
      return res;
    },

    async deleteGroup({
      commit,
      getters
    }, payload) {
      let res = await groupsApi.deleteGroup(payload);
      if (res.status == 200) {
        let index = getters.getGroupsMap[payload].index;
        commit('deleteGroup', index);
      }
      return res;
    },

    async createGroup({commit}, payload) {
      let res = await groupsApi.create({
        title: payload.title,
        type: payload.type,
        ownerId: payload.ownerId
      });
      let group = res.data.data;
      commit('addGroup', group)
    },

    async addUsers({commit}, payload) {
      let res = await groupsApi.addUsers({
        users: payload.users.map(e => e.id),
        groupId: payload.groupId
      });
      let group = res.data.data;
      commit('addGroup', group)
    },

    async loadTypes({commit}) {
      let res = await groupsApi.getTypes();
      commit('setTypes', res)
    }
  },
}