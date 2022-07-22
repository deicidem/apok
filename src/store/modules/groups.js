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
    paginationSize: 8,
    searchBy: null,
    pending: false,
    sort: null,
    sortOptions: setSortOptions(),
    searchOptions: setSearchOptions()
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
    setGroups(state, payload) {
      payload.forEach(el => {
        el.selected = false;
      })
      state.groups = payload;
    },
    selectGroup(state, data) {
      state.groups[data.index].selected = data.value;
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
    },
    setSort(state, payload) {
      state.sort = payload;
    }
  },
  actions: {
    selectGroup(store, data) {
      store.commit('selectGroup', data);
    },
    async fetchGroups({
      commit,
      getters
    }, page = 1) {
      commit('setPending', true);
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await userApi.getGroups({
        page,
        [searchField]: searchValue,
        desc: getters.getSort?.desc,
        sortBy: getters.getSort?.field,
        size: getters.getPaginationSize
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
      commit('setSort', null);
      return await dispatch('fetchGroups');
    },

    async sortBy({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSort', payload);
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

    async createGroup({commit, dispatch}, payload) {
      commit('setPending', true);
      await userApi.createGroup({
        title: payload.title,
        type: payload.type,
      });
      // let group = res.data.data;
      return await dispatch('fetchGroups');
    },
    async deleteGroups({ dispatch,  getters}) {
      let ids = [];
      for (let i = 0; i < getters.getGroups.length; i++) {
        if (getters.getGroups[i].selected) {
          ids.push(getters.getGroups[i].id);
        } 
      }
      await userApi.deleteGroups(ids);
      return await dispatch('fetchGroups',getters.getPagination.currentPage);
    },
    async deleteGroup({dispatch, getters}, payload) {
      let {status} = await userApi.deleteGroup(payload);
      if (status == 200) {
        return await dispatch('fetchGroups',getters.getPagination.currentPage);
      }
    },
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
      text: "Название",
      value: "title",
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
      text: "Название",
      value: "title",
    },
    {
      text: "Дата создания",
      value: "date",
    },
  ];
}