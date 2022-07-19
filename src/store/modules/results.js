// import router from "@/router";
import * as dzzApi from "@/api/dzz";
export default {
  namespaced: true,
  state: {
    results: [],
    selectable: {
      type: null,
      value: false,
      planIndex: null,
      dataIndex: null
    },
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
    searchBy: null,
    pending: false
  },
  getters: {
    getResults(state) {
      return state.results;
    },
    getSelectable(state) {
      return state.selectable;
    },
    resultsMap(state) {
      let resultsMap = {};

      for (let i = 0; i < state.results.length; i++) {
        let result = state.results[i];
        resultsMap[result.id] = result;
      }
      return resultsMap;
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
    }
  },
  mutations: {
    setResultProperty(state, data) {
      state.results[data.index][data.property] = data.value;
    },
    setResults(state, results) {
      results.forEach(el => {
        el.polygonActive = false;
        el.imageActive = false;
        el.cardActive = false;
        el.selected = {
          type: null,
          value: false
        }
      })
      state.results = results;
    },
    selectResult(state, data) {
        let resultSelected = state.results[data.index].selected;
        
        if (resultSelected.value == data.value) {
          if (resultSelected.type != data.type) {
            console.log("Снимок уже выбран");
            return data.value;
          }
          resultSelected.value = false;
          resultSelected.type = null;
          return false;
        } else {
          state.results.forEach(el => {
            if (el.selected.value == true && el.selected.type == data.type) {
              el.selected.value = false;
              el.selected.type = null;
            }
          })
          resultSelected.value = data.value;
          resultSelected.type = data.type;
          return data.value
        }
        
    },
    sortResultsBy(state, key) {
      if (state.currentSort == key) {
        state.currentSortDir = state.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.currentSort = key;
        state.currentSortDir = 'asc';
      }
      
      state.results.sort((a, b) => {
        let modifier = 1;
        if(state.currentSortDir === 'desc') modifier = -1;
        if(a[state.currentSort]==null) return 1 * modifier;
        if(b[state.currentSort]==null) return -1 * modifier;
        if(a[state.currentSort] < b[state.currentSort]) return -1 * modifier;
        if(a[state.currentSort] > b[state.currentSort]) return 1 * modifier;
        return 0;
      })
    },
    setSelectable(state, selectable) {
      state.selectable = selectable;
    },
    clearSelectable(state) {
      state.selectable.type = null;
      state.selectable.value = false;
      state.selectable.dataIndex = null;
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
    selectResult(store, data) {
      store.commit('selectResult', data);
      let resultSelected = store.getters.getResults[data.index].selected;
      if (resultSelected.value) {
        if (resultSelected.type != data.type) {
          return;
        }
        store.dispatch('plans/setDataObject', {
          planIndex: store.getters.getSelectable.planIndex,
          dzz: {
            id: store.getters.getResults[data.index].id,
            name: store.getters.getResults[data.index].name
          },
          dataIndex: store.getters.getSelectable.dataIndex,
        }, {
          root: true
        });
      } else {
        store.dispatch('plans/setDataObject', {
          planIndex: store.getters.getSelectable.planIndex,
          dzz: null,
          dataIndex: store.getters.getSelectable.dataIndex,
        }, {
          root: true
        });
      }
      store.commit('clearSelectable');
    },
    setResultProperty(store, data) {
      store.commit('setResultProperty', data);
    },
    setSelectable(store, data) {
      store.commit('setSelectable', data);
    },
    resetResultSelection(store, data) {
      for (let i = 0; i < store.getters.getResults.length; i++) {
        store.commit('selectResult', {index: i, type: null, value: false});
      } 
      store.rootGetters['plans/getPlans'][data.planIndex].data.forEach((el, i) => {
        if (el.dzz != null) {
          for (let j = 0; j < store.getters.getResults.length; j++) {
            if (store.getters.getResults[j].id == el.dzz.id) {
              store.commit('selectResult', {index: j, type: i, value: true});
              break;
            }
          }
        }
      })
    },
    sortResultsBy(store, key) {
      store.commit('sortResultsBy', key)
    },
    async fetchResults({commit,
      getters,
      rootGetters,
      dispatch
    }, {params, page}) {
      commit('setPending', true);

      if (params != null) {
        commit('setSearchBy', params);
      }

      let res = await dzzApi.all({
        page,
        ...getters.getSearchBy
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


      commit('setResults', files);
      commit('setPending', false);

      dispatch('map/clearImages', true, {
        root: true
      });
      dispatch('map/clearGeoJsons', true, {
        root: true
      });
      let planIndex = rootGetters['plans/activePlanIndex'];
      if (planIndex != null) {
        dispatch('resetResultSelection', {planIndex});
      } 
      
      return files;
    },
  },

}