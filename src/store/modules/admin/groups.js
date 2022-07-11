import * as groupsApi from "@/api/groups";

export default {
  namespaced: true,
  state: {
    groups: null,
    activeGroupIndex: null,
    groupsUser: null
  },
  getters: {
    getGroups(state) {
      return state.groups;
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
    async loadGroupsByUser({commit}, payload) {
      let res = await groupsApi.allByUser(payload);
      let groups = res.data.groups;
      groups.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setGroups', groups);
      commit('setGroupsUser', {
        id: res.data.groups[0].userId,
        name: res.data.groups[0].userName
      });
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
  },
}