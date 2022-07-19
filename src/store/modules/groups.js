import * as userApi from "@/api/user"

export default {
  namespaced: true,
  state: {
    groups: null,
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
    deleteGroup(state, i) {
      state.groups.splice(i, 1);
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
    deleteGroup(store, i) {
      store.commit('deleteGroup', i)
    },
    async fetchGroups({
      commit,
      getters
    }, page = 1) {
      commit('setPending', true);

      let res = await userApi.getGroups({
        page,
        search: getters.getSearchBy,
      });

      let groups = res.data.data;
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

      commit('setGroups', groups);
      commit('setPending', false);
      return groups;
    },

    async fetchAll({
      commit,
      dispatch
    }) {
      commit('setPending', true);
      commit('setSearchBy', null);

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
  }
}
