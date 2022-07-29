import * as userGroupsApi from "@/api/userGroups"

export default {
  namespaced: true,
  state: {
    users: null,
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
    showRequests: false,
    sort: null,
    sortOptions: setSortOptions(),
    searchOptions: setSearchOptions(),
  },
  getters: {
    getUsers(state) {
      return state.users;
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
    getPagination(state) {
      return state.pagination
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
    },
    getShowRequests(state) {
      return state.showRequests;
    }
  },
  mutations: {
    setUsers(state, payload) {
      payload.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
        el.selected = false;
      })
      state.users = payload;
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
    },
    setShowRequests(state, payload) {
      state.showRequests = payload;
    },
  },
  actions: {
    async fetchUsers({
      commit,
      getters,
      rootGetters
    }, page = 1) {
      commit('setPending', true);
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await userGroupsApi.getUsersByGroup(rootGetters['groups/getActiveGroup'].id, {
        page,
        [searchField]: searchValue,
        requests: getters.getShowRequests,
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
    async fetchAll({
      commit,
      dispatch
    }) {
      commit('setPending', true);
      commit('setSearchBy', null);
      commit('setSort', null);

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
      dispatch,
    }, payload) {
      commit('setPending', true);
      commit('setSort', payload);
      return await dispatch('fetchUsers');
    },
    async exclude({dispatch, commit, getters, rootGetters}, payload) {
      commit('setPending', true);
      await userGroupsApi.exclude(rootGetters['groups/getActiveGroup'].id, payload);
      return await dispatch('fetchUsers', getters.getPagination.currentPage);
    },
    async verify({dispatch, commit, getters, rootGetters}, payload) {
      commit('setPending', true);
      await userGroupsApi.verify(rootGetters['groups/getActiveGroup'].id, payload);
      return await dispatch('fetchUsers', getters.getPagination.currentPage);
    },
    async changeShowRequests({dispatch, commit}, payload) {
      commit('setPending', true);
      commit('setShowRequests', payload);
      return await dispatch('fetchUsers');
    }
  }
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