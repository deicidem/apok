import * as filesApi from "@/api/files";
import * as usersApi from "@/api/users";

export default {
  namespaced: true,
  state: {
    files: null,
    activeFileIndex: null,
    filesUser: null,
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
    getFiles(state) {
      return state.files;
    },
    getFilesUser(state) {
      return state.filesUser;
    },
    getActiveFileIndex(state) {
      return state.activeFileIndex;
    },
    getActiveFile(state) {
      if (state.files != null && state.activeFileIndex != null) {
        return state.files[state.activeFileIndex];
      }
      return null;
    },
    getFilesMap(state) {
      let map = {};
      for (let i = 0; i < state.files.length; i++) {
        let file = state.files[i];
        map[file.id] = {
          data: file,
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
    setFiles(state, payload) {
      payload.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      })
      state.files = payload;
    },
    setFile(state, {
      index,
      firstName,
      lastName,
      email
    }) {
      state.files[index].firstName = firstName;
      state.files[index].lastName = lastName;
      state.files[index].email = email;
    },
    deleteFile(state, payload) {
      state.files.splice(payload, 1);
    },
    setActiveFileIndex(state, payload) {
      state.activeFileIndex = payload;
    },
    setBlocked(state, {
      index,
      value
    }) {
      state.files[index].blocked = value;
    },
    addFile(state, payload) {
      state.files.push(payload);
    },
    setFilesUser(state, payload) {
      state.filesUser = payload;
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
    setActiveFile({
      commit,
      getters
    }, payload) {
      let index = null;
      if (payload != null) {
        index = getters.getFilesMap[payload].index
      }
      commit('setActiveFileIndex', index);
    },

    async fetchFiles({
      commit,
      getters
    }, page = 1) {
      commit('setPending', true);

      let res = await filesApi.all({
        page,
        search: getters.getSearchBy,
        userId: getters.getFilesUser?.id
      });

      let files = res.data.data;
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

      commit('setFiles', files);
      commit('setPending', false);
      return res;
    },

    async fetchAll({commit, dispatch}) {
      commit('setPending', true);
      commit('setFilesUser', null);
      commit('setSearchBy', null);

      return await dispatch('fetchFiles');
    },

    async filterByUser({commit, dispatch}, payload) {
      commit('setPending', true);

      let res = await usersApi.one(payload);
      let user = res.data.data;

      commit('setFilesUser', {
        id: user.id,
        name: user.firstName + ' ' + user.lastName
      });

      return await dispatch('fetchFiles');
    },

    async filterBySearch({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSearchBy', payload);
      return await dispatch('fetchFiles');
    },

    async updateFile({
      commit,
      getters
    }, payload) {
      let res = await filesApi.one(payload);
      if (res.status == 200) {
        let index = getters.getFilesMap[payload.id].index;
        commit('setFile', {
          index,
          ...payload
        });
      }
      return res;
    },

    async deleteFile({
      commit,
      getters
    }, payload) {
      let res = await filesApi.deleteFile(payload);
      if (res.status == 200) {
        let index = getters.getFilesMap[payload].index;
        commit('deleteFile', index);
      }
      return res;
    },
  },
}