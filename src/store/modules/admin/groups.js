import * as groupsApi from "@/api/groups";
import * as usersApi from "@/api/users";
export default {
  namespaced: true,
  state: {
    groups: null,
    activeGroupIndex: null,
    groupsUser: null,
    types: null
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
    async loadGroups({
      commit
    }) {
      let res = await groupsApi.all();
      console.log(res);
      let groups = res.data.groups;
      groups.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setGroups', groups);
      commit('setGroupsUser', null);
      return res;
    },
    async loadGroupsByUser({
      commit
    }, payload) {
      let groupsRes = await groupsApi.allByUser(payload);
      let userRes = await usersApi.one(payload);
      let groups = groupsRes.data.groups;
      groups.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setGroups', groups);
      commit('setGroupsUser', {
        id: userRes.data.user.id,
        name: userRes.data.user.firstName + ' ' + userRes.data.user.lastName
      });
      return groupsRes;
    },
    async loadGroupsByOwner({
      commit
    }, payload) {
      let groupsRes = await groupsApi.allByOwner(payload);
      let userRes = await usersApi.one(payload);
      let groups = groupsRes.data.groups;
      groups.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setGroups', groups);
      commit('setGroupsUser', {
        id: userRes.data.user.id,
        name: userRes.data.user.firstName + ' ' + userRes.data.user.lastName
      });
      return groupsRes;
    },
    async searchGroups({
      commit
    }, payload) {
      let res = await groupsApi.allFiltered(payload);
      let groups = res.data.groups;
      groups.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setGroups', res.data.groups);
      return res;
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
      let group = res.data.group;
      commit('addGroup', group)
    },
    async addUsers({commit}, payload) {
      let res = await groupsApi.addUsers({
        users: payload.users.map(e => e.id),
        groupId: payload.groupId
      });
      let group = res.data.group;
      commit('addGroup', group)
    },
    async loadTypes({commit}) {
      let res = await groupsApi.getTypes();
      commit('setTypes', res)
    }
  },
}