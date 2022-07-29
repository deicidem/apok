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
    paginationSize: 10,
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
    },
    setSort(state, payload) {
      state.sort = payload;
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
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await groupsApi.all({
        page,
        userId: getters.getGroupsUser?.id,
        ownerId: getters.getGroupsOwner?.id,
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
      commit('setSort', null);

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

    async sortBy({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSort', payload);
      return await dispatch('fetchGroups');
    },

    // async updateGroup({
    //   commit,
    //   getters
    // }, payload) {
    //   let res = await groupsApi.one(payload);
    //   if (res.status == 200) {
    //     let index = getters.getGroupsMap[payload.id].index;
    //     commit('setGroup', {
    //       index,
    //       ...payload
    //     });
    //   }
    //   return res;
    // },

    async deleteGroup({
      dispatch,
      getters
    }, payload) {
      let res = await groupsApi.deleteGroup(payload);
      if (res.status == 200) {
        return await dispatch('fetchGroups',getters.getPagination.currentPage);
      }
      return res;
    },

    async createGroup({dispatch, getters}, payload) {
      await groupsApi.create({
        title: payload.title,
        description: payload.description,
        type: payload.type,
      });
      return await dispatch('fetchGroups',getters.getPagination.currentPage);
    },
    
    async updateGroup({dispatch, commit, getters}, payload) {
      commit('setPending', true);
      await groupsApi.update(getters.getActiveGroup.id, payload);
      return await dispatch('fetchGroups', getters.getPagination.currentPage);
    },

    async addUsers(store, payload) {
      await groupsApi.addUsers({
        users: payload.users.map(e => {
          console.log(e);
          return e.id;
        }),
        groupId: payload.groupId
      });
      // return await dispatch('fetchGroups',getters.getPagination.currentPage);
      // let group = res.data.data;
      // commit('addGroup', group)
    },
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