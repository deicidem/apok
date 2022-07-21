import * as groupTypesApi from "@/api/groupTypes"

export default {
  namespaced: true,
  state: {
    groupTypes: null,
  },
  getters: {
    getGroupTypes(state) {
      return state.groupTypes;
    },
  },
  mutations: {
    setGroupTypes(state, payload) {
      state.groupTypes = payload;
    }
  },
  actions: {
    async fetchGroupTypes({commit}) {
      let res = await groupTypesApi.all();
      commit('setGroupTypes', res.data.data)
    }
  }
}
