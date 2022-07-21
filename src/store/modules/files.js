import * as userApi from "@/api/user";
  
export default {
  namespaced: true,
  state: {
    files: null,
    currentSort: null,
    currentSortDir: 'asc',
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
    getFiles(state){
      return state.files;
    },
    getSortDir(state) {
      return state.currentSortDir;
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
    setFiles(state, files) {
      files.forEach(el => {
        el.date = new Date(el.date).toLocaleDateString();
        el.selected = false;
      });
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
    sortFilesBy(store, key) {
      store.commit('sortFilesBy', key);
    },
    selectFile(store, data) {
      store.commit('selectFile', data);
    },
    async fetchFiles({commit,
      getters
    }, page = 1) {
      commit('setPending', true);
      let searchField = getters.getSearchBy?.field;
      let searchValue = getters.getSearchBy?.value;
      let res = await userApi.getFiles({
        page,
        [searchField]: searchValue,
        desc: getters.getSort?.desc,
        sortBy: getters.getSort?.field,
        size: getters.getPaginationSize
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
      return files;
    },
    async fetchAll({
      commit,
      dispatch
    }) {
      commit('setPending', true);
      commit('setSearchBy', null);
      commit('setSort', null);

      return await dispatch('fetch');
    },
    async filterBySearch({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSearchBy', payload);

      return await dispatch('fetch');
    },
    async sortBy({
      commit,
      dispatch
    }, payload) {
      commit('setPending', true);
      commit('setSort', payload);
      return await dispatch('fetchFiles');
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
      await dispatch('fetchFiles');
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
      // await dispatch('fetchFiles');
      console.log(commit);
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
      text: "Имя",
      value: "name",
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
      value: "name",
    },
    {
      text: "Дата регистрации",
      value: "date",
    },
  ];
}