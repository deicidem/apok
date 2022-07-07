import * as userApi from "@/api/user";
  
export default {
  namespaced: true,
  state: {
    files: null,
    currentSort: null,
    currentSortDir: 'asc'
  },
  getters: {
    getFiles(state){
      return state.files;
    },
    getSortDir(state) {
      return state.currentSortDir;
    }
  },
  mutations: {
    setFiles(state, files) {
      state.files = files;
    },
    selectFile(state, data) {
      state.files[data.index].selected = data.value;
    },
    sortFilesBy(state, key) {
      if (state.currentSort == key) {
        state.currentSortDir = state.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.currentSort = key;
        state.currentSortDir = 'asc';
      }
      
      state.files.sort((a, b) => {
        let modifier = 1;
        if(state.currentSortDir === 'desc') modifier = -1;
        if(a[state.currentSort]==null) return 1 * modifier;
        if(b[state.currentSort]==null) return -1 * modifier;
        if(a[state.currentSort] < b[state.currentSort]) return -1 * modifier;
        if(a[state.currentSort] > b[state.currentSort]) return 1 * modifier;
        return 0;
      })
    },
    removeFile(state, index) {
      state.files.splice(index, 1);
    },
    removeFileById(state, id) {
      for (let i = 0; i < state.files.length; i++) {
        if (state.files[i].id == id) {
          state.files.splice(i, 1);
        }
        break;
      }
    }
  },
  actions: {
    sortFilesBy(store, key) {
      store.commit('sortFilesBy', key)
    },
    selectFile(store, data) {
      store.commit('selectFile', data);
    },
    async loadFiles(store) {
      let {data} = await userApi.getFiles();
      data.files.forEach(el => {
        el.selected = false;
      })
      store.commit('setFiles', data.files)
      return data;
    },
    async deleteFiles({ commit, dispatch,  getters}) {
      let ids = [];
      for (let i = 0; i < getters.getFiles.length; i++) {
        if (getters.getFiles[i].selected) {
          ids.push(getters.getFiles[i].id);
        } 
      }
      let {data} = await userApi.deleteFiles(ids);
      data.deleted.forEach(el => {
        if (!el.delete) {
          console.log(el);
        }
      });
      await dispatch('loadFiles');
      console.log(commit);
    },
    async deleteFile({commit, getters}, i) {
      let id = getters.getFiles[i].id;
      let {status} = await userApi.deleteFile(id);
      if (status == 200) {
        commit('removeFile', i);
      }
      // data.deleted.forEach(el => {
      //   if (!el.delete) {
      //     console.log(el);
      //   }
      // });
      // await dispatch('loadFiles');
      console.log(commit);
    },
  }
}