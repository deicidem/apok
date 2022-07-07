import * as filesApi from "@/api/files";

export default {
  namespaced: true,
  state: {
    files: null,
    activeFileIndex: null,
  },
  getters: {
    getFiles(state) {
      return state.files;
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
    }
  },
  mutations: {
    setFiles(state, payload) {
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
    async loadFiles({
      commit
    }) {
      let res = await filesApi.all();
      console.log(res);
      let files = res.data.files;
      files.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setFiles', res.data.files);
      return res;
    },
    async searchFiles({
      commit
    }, payload) {
      let res = await filesApi.allFiltered(payload);
      let files = res.data.files;
      files.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
      });
      commit('setFiles', res.data.files);
      return res;
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