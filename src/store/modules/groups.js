import * as userApi from "@/api/user"

export default {
  namespaced: true,
  state: {
    groups: null,
  },
  getters: {
    getGroups(state) {
      return state.groups;
    },
  },
  mutations: {
    setGroups(state, payload) {
      state.groups = payload;
    },
    deleteGroup(state, i) {
      state.groups.splice(i, 1);
    }
  },
  actions: {
    deleteGroup(store, i) {
      store.commit('deleteGroup', i)
    },
    async loadGroups({commit}) {
      let res = await userApi.getGroups();
      console.log(res);
      commit('setGroups', res.data.data);
    }
  }
}
